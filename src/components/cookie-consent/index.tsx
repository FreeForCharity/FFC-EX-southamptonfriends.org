'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// Opt-out analytics model. GA4 loads through this site's Google Tag Manager container
// (src/lib/analytics.config.ts + src/components/google-tag-manager) and runs by default.
// This banner does NOT inject its own analytics scripts (that would double-count). Its job
// is to let a visitor DECLINE: on decline it sends a Google Consent Mode update
// (analytics_storage: 'denied') — which GA4 honours natively, stopping cookie use going
// forward — and deletes existing analytics cookies. Accepting re-grants analytics_storage.

// The GTM dataLayer holds heterogeneous entries (event objects and gtag command arrays).
declare global {
  interface Window {
    dataLayer?: unknown[]
    openCookiePreferences?: () => void
  }
}

interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
}

// Send a Google Consent Mode update. Pushing the gtag command array is read by GA4/GTM
// the same as gtag('consent', 'update', ...). GA4 respects analytics_storage natively, so
// this genuinely turns GA cookie use on/off for this browser.
function updateConsentMode(analyticsGranted: boolean) {
  if (typeof window === 'undefined') return
  const dataLayer = (window.dataLayer = window.dataLayer || [])
  const gtag = (...args: unknown[]) => dataLayer.push(args)
  gtag('consent', 'update', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

// Read the saved consent from localStorage, falling back to the `cookie-consent`
// cookie. The cookie is the durable source of truth when localStorage is cleared
// independently (or unavailable in private mode), so the banner does not reappear
// for a visitor who has already chosen.
function readStoredConsent(): string | null {
  try {
    const ls = localStorage.getItem('cookie-consent')
    if (ls) return ls
  } catch {
    // localStorage unavailable — fall through to the cookie
  }
  if (typeof document === 'undefined') return null
  // Cookies are separated by ';' with optional whitespace — split on ';' then trim,
  // so parsing works even when there is no space after the separator.
  const entry = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('cookie-consent='))
  if (!entry) return null
  try {
    return decodeURIComponent(entry.slice('cookie-consent='.length))
  } catch {
    return null
  }
}

// Remove a corrupted/invalid stored consent so it stops re-triggering the banner path.
function clearStoredConsent() {
  try {
    localStorage.removeItem('cookie-consent')
  } catch {
    // ignore — localStorage may be unavailable
  }
  if (typeof document !== 'undefined') {
    document.cookie = 'cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be changed
    functional: true, // Always true, cannot be changed (remembers site preferences, e.g. your cookie choices)
    // Opt-out model: analytics is ON by default. It only becomes false when the visitor
    // explicitly declines, so the Customize modal reflects the real running state and a
    // no-op "Save" does not silently opt the visitor out.
    analytics: true,
  })
  const [savedPreferencesBackup, setSavedPreferencesBackup] =
    useState<CookiePreferences>(preferences)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const deleteAnalyticsCookies = useCallback(() => {
    const host = window.location.hostname
    // Expire a cookie across the domain variants GA may have used: no domain,
    // the exact host, and the leading-dot host (GA sets _ga with domain=.example.org).
    const expire = (name: string) => {
      const stem = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
      document.cookie = `${stem};`
      document.cookie = `${stem}; domain=${host};`
      document.cookie = `${stem}; domain=.${host};`
    }

    // Static analytics/marketing cookie names
    ;['_ga', '_gid', '_fbp', 'fr', '_clck', '_clsk'].forEach(expire)

    // Dynamically expire all cookies matching _ga_* (e.g., _ga_G-XXXXXXXXXX)
    if (typeof document !== 'undefined') {
      document.cookie.split(';').forEach((cookie) => {
        const cookieName = cookie.split('=')[0].trim()
        if (cookieName.startsWith('_ga_')) expire(cookieName)
      })
    }
  }, [])

  const applyConsent = useCallback(
    (prefs: CookiePreferences) => {
      // Persist the choice (Secure only on HTTPS)
      const cookieValue = JSON.stringify(prefs)
      const secureFlag =
        typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `cookie-consent=${encodeURIComponent(cookieValue)}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`

      // Whenever analytics is not consented — a fresh decline, a withdrawal, or a
      // pre-existing _ga from before consent existed — clear the analytics cookies.
      if (!prefs.analytics) {
        deleteAnalyticsCookies()
      }

      // Tell GA4 (via GTM) whether analytics is allowed. No script injection here — GA4
      // fires inside the GTM container; injecting gtag would double-count.
      updateConsentMode(prefs.analytics)
    },
    [deleteAnalyticsCookies]
  )

  // Helper to load preferences from localStorage and update state
  const loadPreferencesFromLocalStorage = useCallback(
    (showBannerIfMissing = true) => {
      try {
        const consent = readStoredConsent()
        if (!consent) {
          // No stored choice yet: show the banner (analytics runs by default until declined).
          if (showBannerIfMissing) setShowBanner(true)
          return
        }
        let savedPreferences: CookiePreferences
        try {
          savedPreferences = JSON.parse(consent)
        } catch {
          // Corrupted value — clear it so we don't hit this path every load.
          clearStoredConsent()
          if (showBannerIfMissing) setShowBanner(true)
          return
        }

        // Validate the structure (functional is optional for backward compatibility)
        if (
          typeof savedPreferences === 'object' &&
          savedPreferences !== null &&
          typeof savedPreferences.necessary === 'boolean' &&
          typeof savedPreferences.analytics === 'boolean'
        ) {
          // Force necessary + functional true (they are always-on); guards against
          // corrupted/old saved data that stored them as false.
          const updatedPreferences: CookiePreferences = {
            ...savedPreferences,
            necessary: true,
            functional: true,
          }
          setPreferences(updatedPreferences)
          setSavedPreferencesBackup(updatedPreferences)
          applyConsent(updatedPreferences)
        } else {
          // Valid JSON but wrong shape — clear it and show the banner again.
          clearStoredConsent()
          if (showBannerIfMissing) setShowBanner(true)
        }
      } catch {
        // If localStorage is unavailable (e.g. private mode), just show the banner.
        if (showBannerIfMissing) setShowBanner(true)
      }
    },
    [applyConsent]
  )

  const handleCancelPreferences = useCallback(() => {
    // Restore the backed-up preferences
    setPreferences(savedPreferencesBackup)
    setShowPreferences(false)
  }, [savedPreferencesBackup])

  // Initialize state from localStorage on mount - this is the correct pattern for hydration
  useEffect(() => {
    // Expose method to window for reopening preferences from other components
    window.openCookiePreferences = () => {
      setShowBanner(true)
      setShowPreferences(true)
      loadPreferencesFromLocalStorage(false)
    }

    // Check if user has already made a choice with error handling
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPreferencesFromLocalStorage(true)

    // Cleanup function to remove the window method
    return () => {
      delete window.openCookiePreferences
    }
  }, [loadPreferencesFromLocalStorage])

  // Focus management for modal
  useEffect(() => {
    if (showPreferences && modalRef.current) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      const modal = modalRef.current
      const getFocusable = () =>
        Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled'))

      // Focus the first focusable element in the modal
      const focusable = getFocusable()
      if (focusable.length > 0) {
        focusable[0].focus()
      }

      // Handle Escape (close) and Tab (trap focus within the dialog)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleCancelPreferences()
          return
        }
        if (e.key !== 'Tab') return
        const items = getFocusable()
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        const active = document.activeElement
        if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        } else if (!modal.contains(active)) {
          // Focus escaped the dialog (e.g. from the page behind) — pull it back.
          e.preventDefault()
          first.focus()
        }
      }
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        // Restore focus when modal closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus()
        }
      }
    }
  }, [showPreferences, handleCancelPreferences])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
    }
    setPreferences(allAccepted)
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    } catch (e) {
      // If localStorage is unavailable, continue anyway
      console.warn('Unable to save preferences to localStorage:', e)
    }
    applyConsent(allAccepted)
    setSavedPreferencesBackup(allAccepted)
    setShowBanner(false)
  }

  const handleDeclineAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: true, // Always on: core functional cookies (remembers site preferences)
      analytics: false,
    }
    setPreferences(onlyNecessary)
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    } catch (e) {
      // If localStorage is unavailable, continue anyway
      console.warn('Unable to save preferences to localStorage:', e)
    }

    // applyConsent() deletes analytics cookies whenever analytics is not consented.
    applyConsent(onlyNecessary)
    setSavedPreferencesBackup(onlyNecessary)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    } catch (e) {
      // If localStorage is unavailable, continue anyway
      console.warn('Unable to save preferences to localStorage:', e)
    }
    applyConsent(preferences)
    setSavedPreferencesBackup(preferences)
    setShowBanner(false)
    setShowPreferences(false)
  }

  const handleShowPreferences = () => {
    // Backup current preferences in case user cancels
    setSavedPreferencesBackup(preferences)
    setShowPreferences(true)
  }

  if (!showBanner) {
    return null
  }

  if (showPreferences) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        onClick={(e) => {
          // Only close if clicking the overlay itself, not the modal content
          if (e.target === e.currentTarget) {
            handleCancelPreferences()
          }
        }}
      >
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <h2 id="cookie-preferences-title" className="text-2xl font-bold text-gray-900 mb-4">
              Cookie Preferences
            </h2>
            <p className="text-gray-600 mb-6">
              We use cookies to enhance your browsing experience and analyze our traffic. You can
              choose which types of cookies you allow.
            </p>

            {/* Necessary Cookies */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Necessary Cookies</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 text-blue-600 bg-gray-300 rounded cursor-not-allowed"
                  />
                  <span className="ml-2 text-sm text-gray-500">Always Active</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                These cookies are essential for the website to function properly. They enable basic
                features like page navigation and access to secure areas. The website cannot
                function properly without these cookies.
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    disabled
                    className="w-5 h-5 text-blue-600 bg-gray-300 rounded cursor-not-allowed"
                  />
                  <span className="ml-2 text-sm text-gray-500">Always Active</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies remember your preferences — such as your cookie choices — and enable
                core site functionality. They do not track you across other sites.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                    }
                    className="sr-only peer"
                    aria-label="Enable analytics cookies"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies help us understand how visitors interact with our website by
                collecting and reporting information anonymously. We use Google Analytics.
              </p>
              <p className="text-xs text-gray-500">Services: Google Analytics</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleCancelPreferences}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl"
      role="region"
      aria-label="Cookie consent notice"
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">We Value Your Privacy</h3>
            <p className="text-sm text-gray-600 mb-3">
              We use cookies to improve your experience on our site and to understand how it is
              used. By clicking &quot;Accept All&quot;, you consent to our use of cookies for
              analytics. You can manage your preferences or decline non-essential cookies.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="text-blue-600 hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={handleDeclineAll}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm whitespace-nowrap"
            >
              Decline All
            </button>
            <button
              onClick={handleShowPreferences}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm whitespace-nowrap"
            >
              Customize
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
