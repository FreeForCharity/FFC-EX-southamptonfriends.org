import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  CONSENT_WAIT_FOR_UPDATE_MS,
  CONSENT_MODE_BOOTSTRAP,
  updateGoogleConsent,
  type ConsentPreferences,
} from '../../src/lib/consent-mode'

describe('CONSENT_MODE_BOOTSTRAP', () => {
  it('emits exactly ONE consent default call, and it denies', () => {
    const calls = CONSENT_MODE_BOOTSTRAP.match(/gtag\('consent', 'default'/g) ?? []
    expect(calls).toHaveLength(1)
    expect(CONSENT_MODE_BOOTSTRAP).toContain("'analytics_storage': 'denied'")
  })

  it('grants no storage category that carries measurement', () => {
    // Asserted by ABSENCE. Reinstating a permissive default is a one-line
    // edit, and every presence-only assertion above would still pass with
    // an unscoped grant sitting underneath the denial -- which is exactly
    // the shape this file used to ship.
    for (const signal of [
      'ad_storage',
      'ad_user_data',
      'ad_personalization',
      'analytics_storage',
      'personalization_storage',
    ]) {
      expect(CONSENT_MODE_BOOTSTRAP).toContain(`'${signal}': 'denied'`)
      expect(CONSENT_MODE_BOOTSTRAP).not.toContain(`'${signal}': 'granted'`)
    }
  })

  it('carries no region scoping at all', () => {
    expect(CONSENT_MODE_BOOTSTRAP).not.toContain("'region'")
  })

  it('keeps functionality_storage and security_storage granted', () => {
    // Neither carries measurement, and a site that cannot remember a
    // consent choice cannot honour one.
    expect(CONSENT_MODE_BOOTSTRAP).toContain("'functionality_storage': 'granted'")
    expect(CONSENT_MODE_BOOTSTRAP).toContain("'security_storage': 'granted'")
  })

  it('still sets wait_for_update on the single call', () => {
    expect(CONSENT_MODE_BOOTSTRAP).toContain(`'wait_for_update': ${CONSENT_WAIT_FOR_UPDATE_MS}`)
    expect(CONSENT_WAIT_FOR_UPDATE_MS).toBe(500)
  })

  it('enables url_passthrough and ads_data_redaction', () => {
    expect(CONSENT_MODE_BOOTSTRAP).toContain("gtag('set', 'url_passthrough', true)")
    expect(CONSENT_MODE_BOOTSTRAP).toContain("gtag('set', 'ads_data_redaction', true)")
  })

  it('defines gtag as a function declaration sharing one dataLayer queue', () => {
    expect(CONSENT_MODE_BOOTSTRAP).toContain('window.dataLayer = window.dataLayer || []')
    expect(CONSENT_MODE_BOOTSTRAP).toContain('function gtag(){dataLayer.push(arguments);}')
  })
})

describe('root layout consent bootstrap ordering', () => {
  // The layout is a server component excluded from jest rendering (font
  // imports), so assert on its source: the consent-mode bootstrap <script>
  // must be emitted in <head> BEFORE <GoogleTagManager />, or the
  // defaults would arrive after the Google tags initialise.
  const layoutSource = readFileSync(join(process.cwd(), 'src/app/layout.tsx'), 'utf8')

  // Whitespace/quote-tolerant patterns: quote style, spacing, or import
  // reordering must not fail these tests while the behavior stays correct.
  const bootstrapImportRe =
    /import\s*\{[^}]*\bCONSENT_MODE_BOOTSTRAP\b[^}]*\}\s*from\s*['"](?:@\/lib\/consent-mode|\.{1,2}\/(?:\.\.\/)*lib\/consent-mode)['"]/
  const bootstrapEmitRe =
    /dangerouslySetInnerHTML\s*=\s*\{\{\s*__html:\s*CONSENT_MODE_BOOTSTRAP\s*\}\}/
  const gtmElementRe = /<GoogleTagManager\s*\/>/

  it('imports the bootstrap from the consent-mode lib', () => {
    expect(layoutSource).toMatch(bootstrapImportRe)
  })

  it('emits the bootstrap script before <GoogleTagManager />', () => {
    const bootstrapMatch = bootstrapEmitRe.exec(layoutSource)
    const gtmMatch = gtmElementRe.exec(layoutSource)
    expect(bootstrapMatch).not.toBeNull()
    expect(gtmMatch).not.toBeNull()
    expect(bootstrapMatch!.index).toBeLessThan(gtmMatch!.index)
  })
})

describe('updateGoogleConsent', () => {
  afterEach(() => {
    delete window.gtag
  })

  const allGranted: ConsentPreferences = {
    necessary: true,
    functional: true,
    analytics: true,
    marketing: true,
  }

  it('does nothing (and does not throw) when gtag is absent', () => {
    expect(() => updateGoogleConsent(allGranted)).not.toThrow()
  })

  it('maps analytics to analytics_storage and marketing to the ad signals', () => {
    const gtag = jest.fn()
    window.gtag = gtag
    updateGoogleConsent({ necessary: true, functional: true, analytics: true, marketing: false })
    expect(gtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      personalization_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    })
  })

  it('always grants security_storage, even on full decline', () => {
    const gtag = jest.fn()
    window.gtag = gtag
    updateGoogleConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    })
    expect(gtag).toHaveBeenCalledWith(
      'consent',
      'update',
      expect.objectContaining({
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        security_storage: 'granted',
      })
    )
  })
})
