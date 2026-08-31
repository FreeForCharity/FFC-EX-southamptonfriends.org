import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the Southampton Friends Meeting website.',
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-paper">
      <article className="mx-auto px-4 max-w-[760px] py-16 md:py-20 sf-prose">
        <p className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.22em] text-stone">
          Site Information
        </p>
        <h1 className="mt-3 font-(family-name:--font-cantata-one) text-ink text-[2rem] md:text-[2.4rem] leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-stone font-(family-name:--font-lato) text-[0.9rem]">
          Effective date: August 30, 2026
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-10 mb-3">
          What we collect
        </h2>
        <p>
          The Southampton Friends Meeting website (southamptonfriends.org) is a static information
          site. We do not run accounts, comments, e-commerce, or newsletters on this site. We do not
          knowingly collect personal information from visitors. The site does use aggregate web
          analytics, described in the Cookies and analytics section below.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Hosting and server logs
        </h2>
        <p>
          This site is hosted by GitHub Pages on behalf of Free For Charity, a 501(c)(3) nonprofit
          that provides free hosting for nonprofit organizations. The hosting provider may keep
          standard server logs (IP address, browser, time of request) for the purpose of security
          and abuse prevention. The meeting does not access or retain those logs.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Cookies and analytics
        </h2>
        <p>
          This site uses Google Tag Manager and Google Analytics 4 to understand, in aggregate, how
          the site is used. These tools run under Google Consent Mode v2 with regional defaults. If
          you visit from the European Economic Area, the United Kingdom, or Switzerland,
          Google&apos;s tags set no analytics or advertising cookies and read no such identifiers
          (storage strictly necessary for security or basic site function may still be used): your
          visit is counted only in an aggregate way, without analytics cookies or identifiers that
          could tie it back to you, and because this site offers no way to opt in to analytics
          cookies, visitors from those regions always remain in that state. (Switzerland is included
          because Google&apos;s consent defaults cover it; Swiss visitors&apos; data is protected by
          the Swiss FADP rather than the GDPR.) As with any web request, network-level data such as
          your IP address still reaches the servers involved, and this consent behavior depends on
          JavaScript being enabled in your browser. Everywhere else, including the United States,
          Google Analytics cookies are set from your first pageview; this site does not yet provide
          an on-page control to change that, but you can block or delete these cookies through your
          browser settings or with Google&apos;s own analytics opt-out browser add-on. Which rule
          applies to your visit is determined by Google from your IP address at the time of your
          visit; IP geolocation is approximate. We do not use session recording tools or advertising
          pixels. Your browser may also store a small amount of information used by the site itself
          (for example, remembering whether you have closed a menu), which never leaves your
          browser.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Your rights in the EU, UK, and EEA (GDPR)
        </h2>
        <p>
          If the EU General Data Protection Regulation (GDPR) or the UK GDPR applies to your visit,
          you have the right to: access the personal data we hold about you; have inaccurate data
          rectified; have your data erased; restrict or object to processing; receive your data in a
          portable format; and withdraw any consent you have given at any time. Because
          Google&apos;s tags run without analytics cookies or identifiers for visitors in these
          regions, we hold no analytics identifiers about you. You may also lodge a complaint with
          your national data protection supervisory authority (in the UK, the Information
          Commissioner&apos;s Office). To exercise any of these rights, contact the meeting using
          the details below.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Your California privacy rights (CCPA/CPRA)
        </h2>
        <p>
          We do not sell personal information, and we do not share it for cross-context behavioral
          advertising, as those terms are defined by California law &mdash; and have not done so in
          the preceding 12 months. We do not knowingly collect or sell the personal information of
          anyone under 16. California residents have the right to know, access, correct, and delete
          personal information we hold, and not to be discriminated against for exercising these
          rights; submit a request using the contact details below. This site does not read or
          respond to the Global Privacy Control or Do Not Track browser signals; because we do not
          sell or share personal information, there is nothing for those signals to opt out of.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Links to other sites
        </h2>
        <p>
          We link to other Quaker and community sites (Philadelphia Yearly Meeting, Bucks Quarterly
          Meeting, Friends General Conference, Facebook, and others). Those sites have their own
          privacy practices, and we are not responsible for their content.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Contact
        </h2>
        <p>
          Questions about this policy can be directed to the meeting at (215) 364-0581 or 710 Gravel
          Hill Road, Southampton, PA 18966.
        </p>
      </article>
    </div>
  )
}
