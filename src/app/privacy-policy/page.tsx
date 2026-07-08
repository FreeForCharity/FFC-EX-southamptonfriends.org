import type { Metadata } from 'next'
import Link from 'next/link'

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
          Effective date: January 2026
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-10 mb-3">
          What we collect
        </h2>
        <p>
          The Southampton Friends Meeting website (southamptonfriends.org) is a static information
          site. We do not run accounts, comments, e-commerce, or newsletters, and we do not
          knowingly collect personal information from visitors. The one exception is the aggregate,
          consent-based analytics described below.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Analytics
        </h2>
        <p>
          To understand how this site is used in aggregate — for example, which pages are visited
          most often — we use Google Tag Manager and Google Analytics 4. This helps us maintain and
          improve the site. We do not use this information to identify individual visitors, and we
          do not sell it.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Cookies
        </h2>
        <p>
          Analytics cookies (such as <code>_ga</code>) are set only if you consent through the
          cookie banner shown on your first visit. If you decline, these analytics cookies are not
          set, and any that already exist are deleted. You can decline or change your preferences at
          any time by reopening the cookie banner. Aside from analytics, your browser may store a
          small amount of information used by the site itself (for example, remembering your cookie
          choice), but that information stays in your browser. For details, see our{' '}
          <Link href="/cookie-policy" className="text-sky-deep underline">
            Cookie Policy
          </Link>
          .
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
