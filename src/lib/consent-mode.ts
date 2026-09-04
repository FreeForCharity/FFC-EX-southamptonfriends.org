// Google Consent Mode v2 defaults.
//
// Policy: analytics and advertising storage is DENIED by default for every
// visitor, worldwide, until they opt in. There is no regional carve-out and
// no permissive default.
//
// This file used to say "the most permissive configuration Google's own
// rules allow", and implemented it: a region-scoped denial for the EEA, the
// UK and Switzerland, followed by an unscoped GRANT for everyone else.
// Google's EU User Consent Policy does only *require* opt-in for those 32
// codes. Applying the weaker default everywhere else was still a decision
// made on the charity's behalf -- that most of its visitors get less
// protection than its European ones -- and it is the charity, not the
// template, that is the controller for this site.
//
// "Analytics and advertising" is the scope, not a hedge. functionality_storage
// and security_storage stay GRANTED below: neither carries measurement, and a
// site that cannot remember a consent choice cannot honour one.
//
// WHAT THIS MEANS ON THIS SITE SPECIFICALLY. There is no cookie banner
// mounted here, so nothing can ever push a `consent update`. Analytics does
// not become "cookieless until the visitor chooses" the way it does on a
// fork with a banner -- it becomes cookieless and STAYS cookieless. GA4
// still counts visits in aggregate; it stores nothing on the device and
// reads no identifier from it. That is strictly more protective than the
// previous behaviour and it is deliberately not the full template
// behaviour. The route to that is mounting the fleet-standard banner.
//
// `wait_for_update` is kept even though no update can arrive today. It
// costs a short hold on the first hit and it means adding the banner later
// requires no change here.

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
 * ONE `consent default` call, unscoped, denying analytics and advertising
 * storage for every visitor. There is no second call: the region-scoped
 * denial plus unscoped grant this used to emit is Google's documented shape
 * for "permissive outside the EEA", and both halves of it are gone.
 *
 * `url_passthrough` keeps click ids (gclid/wbraid) flowing through
 * navigation while cookies are denied, and `ads_data_redaction` strips ad
 * identifiers from tag requests while `ad_storage` is denied. Both are
 * no-ops once consent is granted. Note what url_passthrough does and does
 * not carry: a click id that is ALREADY in the visitor's URL travels
 * between pages of this site, which is why the policy wording is "no
 * identifiers from your device" rather than the flatter, false "no
 * identifiers".
 *
 * `wait_for_update` is kept on the single call. This site mounts no banner,
 * so no update can arrive and the wait currently buys nothing; it is
 * retained so that adding the fleet-standard banner later needs no change
 * here.
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
 * touching this file. That is not a detail: the default below is now DENIED
 * for everyone, and this function is the only thing that could ever lift
 * it. Until a banner mounts and calls it, analytics on this site is
 * cookieless permanently rather than "until the visitor chooses".
 *
 * It used to read that this lifts the regional default for an EEA/UK/CH
 * visitor and merely re-affirms a granted default for everyone else. There
 * is no granted default left to re-affirm.
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
