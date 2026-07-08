import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import CookieConsent from '../../src/components/cookie-consent'

expect.extend(toHaveNoViolations)

// Returns the analytics_storage value from the most recent Consent Mode update
// (gtag command arrays of the form ['consent', 'update', { analytics_storage }]).
function lastAnalyticsStorage(): string | undefined {
  const dl = (window.dataLayer as unknown[]) || []
  for (let i = dl.length - 1; i >= 0; i--) {
    const e = dl[i]
    if (Array.isArray(e) && e[0] === 'consent' && e[1] === 'update') {
      return (e[2] as { analytics_storage?: string })?.analytics_storage
    }
  }
  return undefined
}

beforeEach(() => {
  window.localStorage.clear()
  window.dataLayer = []
  // Clear any cookies set by a previous test
  document.cookie.split(';').forEach((c) => {
    document.cookie = `${c.split('=')[0].trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
})

describe('CookieConsent', () => {
  it('shows the banner on first visit (no stored consent)', () => {
    render(<CookieConsent />)
    expect(screen.getByRole('region', { name: /cookie consent notice/i })).toBeInTheDocument()
    expect(screen.getByText(/We Value Your Privacy/i)).toBeInTheDocument()
  })

  it('does not signal a consent update before the visitor chooses (opt-out: analytics runs)', () => {
    render(<CookieConsent />)
    expect(lastAnalyticsStorage()).toBeUndefined()
  })

  it('does not show the banner when a prior choice is stored', () => {
    window.localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ necessary: true, functional: true, analytics: true })
    )
    render(<CookieConsent />)
    expect(screen.queryByText(/We Value Your Privacy/i)).not.toBeInTheDocument()
  })

  it('grants analytics_storage and persists the choice on Accept All', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByRole('button', { name: /accept all/i }))
    expect(lastAnalyticsStorage()).toBe('granted')
    expect(JSON.parse(window.localStorage.getItem('cookie-consent') as string)).toMatchObject({
      analytics: true,
    })
    expect(screen.queryByText(/We Value Your Privacy/i)).not.toBeInTheDocument()
  })

  it('denies analytics_storage on Decline All', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByRole('button', { name: /decline all/i }))
    expect(lastAnalyticsStorage()).toBe('denied')
    expect(JSON.parse(window.localStorage.getItem('cookie-consent') as string)).toMatchObject({
      analytics: false,
    })
  })

  it('opens preferences with a GA-only analytics option (no marketing/Clarity)', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByRole('button', { name: /customize/i }))
    const dialog = screen.getByRole('dialog', { name: /cookie preferences/i })
    expect(within(dialog).getByText(/Analytics Cookies/i)).toBeInTheDocument()
    expect(within(dialog).getByText(/Services: Google Analytics/i)).toBeInTheDocument()
    expect(within(dialog).queryByText(/Marketing Cookies/i)).not.toBeInTheDocument()
    expect(within(dialog).queryByText(/Microsoft Clarity/i)).not.toBeInTheDocument()
  })

  it('the banner has no accessibility violations', async () => {
    const { container } = render(<CookieConsent />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
