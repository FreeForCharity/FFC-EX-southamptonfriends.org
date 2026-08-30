// Google Consent Mode v2 defaults.
//
// Policy: the most permissive configuration Google's own rules allow.
//
// Google's EU User Consent Policy binds us as a Google Analytics / Ads
// customer, and it requires opt-IN consent before setting cookies or
// reading identifiers for visitors in the EEA, the UK, and Switzerland.
// Everywhere else, no such Google-imposed requirement exists, so storage
// defaults to GRANTED and measurement is complete from the first pageview.
//
// Before this file existed, GTM loaded on this site with no consent
// signals at all, so Google's tags behaved the same in every region.
// Under Consent Mode the Google tags still always load; what changes
// by region is whether they may use cookies:
//
//   - Outside EEA/UK/CH  → granted immediately; full cookie-based
//                          measurement, no visitor interaction needed.
//   - Inside EEA/UK/CH   → denied, so GA4 sends COOKIELESS pings and
//                          pageviews are modeled rather than lost. This
//                          site has no consent banner yet, so EEA/UK/CH
//                          visitors simply stay in that cookieless state
//                          (nothing ever flips them to granted).
//
// Which default applies is determined by Google from the visitor's IP
// address at request time — that is documented Consent Mode behavior for
// the `region` parameter, and the policy pages state it in plain language.
//
// NON-Google tags do not speak Consent Mode and would never get the
// permissive default; this site currently loads no non-Google trackers
// (no Microsoft Clarity, no Meta Pixel).
//
// `wait_for_update` holds tags briefly so a `consent update` (e.g. a
// stored choice restored by a consent banner) can land before the first
// hit fires. No banner exists here yet, so nothing pushes an update
// today; the wait is kept because it is cheap and it means adding the
// fleet-standard banner later requires no bootstrap change.

/**
 * ISO 3166 region codes where Google's EU User Consent Policy applies:
 * the 27 EU member states + the 3 non-EU EEA states (IS, LI, NO), plus
 * the UK (GB) and Switzerland (CH).
 */
export const EU_CONSENT_REGIONS = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  // Non-EU EEA
  'IS',
  'LI',
  'NO',
  // UK + Switzerland
  'GB',
  'CH',
] as const

/**
 * Milliseconds tags wait for a `consent update` before firing with the
 * default state. 500ms is Google's documented starting point: long enough
 * for a synchronous localStorage read, short enough not to meaningfully
 * delay the first hit.
 */
export const CONSENT_WAIT_FOR_UPDATE_MS = 500

/**
 * The inline bootstrap that must execute BEFORE any Google tag loads.
 *
 * Emitted into <head> in the root layout, ahead of <GoogleTagManager />.
 * Two `consent default` calls, in Google's documented order: the
 * region-scoped denial first, then the global grant. Region-specific
 * settings always take precedence over the unscoped one, so EEA/UK/CH
 * visitors get denied-by-default and everyone else gets
 * granted-by-default.
 *
 * `url_passthrough` keeps click ids (gclid/wbraid) flowing through
 * navigation when cookies are denied, and `ads_data_redaction` strips ad
 * identifiers from tag requests while `ad_storage` is denied — both are
 * no-ops once consent is granted, so they cost nothing outside the EEA.
 *
 * `wait_for_update` is set on BOTH default calls, matching the canary
 * reference (FFC-EX-canary): there GTM loads from the layout, so a
 * returning visitor's stored choice needs a window to be restored before
 * tags evaluate consent. This site has no banner and therefore no stored
 * choices yet; keeping the waits preserves byte-level parity with the
 * fleet standard and makes a later banner drop-in.
 *
 * Declared as a function declaration so `gtag` lands on `window` and every
 * later caller shares one queue.
 */
export const CONSENT_MODE_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': ${CONSENT_WAIT_FOR_UPDATE_MS},
  'region': ${JSON.stringify([...EU_CONSENT_REGIONS])}
});
gtag('consent', 'default', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted',
  'functionality_storage': 'granted',
  'personalization_storage': 'granted',
  'security_storage': 'granted',
  'wait_for_update': ${CONSENT_WAIT_FOR_UPDATE_MS}
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
`.trim()

/** The consent categories a cookie banner would expose. */
export interface ConsentPreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

declare global {
  interface Window {
    // gtag's real signature is variadic and untyped by design (it proxies
    // straight into dataLayer as an arguments object).
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Push a Consent Mode `update` reflecting the visitor's actual choice.
 *
 * This site has no consent banner yet, so nothing calls this today; it is
 * exported so the fleet-standard banner can be added later without
 * touching this file. When called, it is what lifts the regional default
 * from denied to granted for an EEA/UK/CH visitor; for everyone else it
 * mostly re-affirms the granted default, and only matters when they
 * actively DECLINE — at which point storage flips to denied and GA4 falls
 * back to cookieless pings rather than disappearing entirely.
 */
export function updateGoogleConsent(prefs: ConsentPreferences): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  const analytics = prefs.analytics ? 'granted' : 'denied'
  const marketing = prefs.marketing ? 'granted' : 'denied'

  window.gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    personalization_storage: marketing,
    functionality_storage: prefs.functional ? 'granted' : 'denied',
    security_storage: 'granted',
  })
}
