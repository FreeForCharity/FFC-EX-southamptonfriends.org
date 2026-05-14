import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the Southampton Friends Meeting website.',
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-paper">
      <article className="sf-container max-w-[760px] py-16 md:py-20 sf-prose">
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
          site. We do not run accounts, comments, e-commerce, newsletters, or tracking analytics on
          this site. We do not knowingly collect personal information from visitors.
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
          Cookies
        </h2>
        <p>
          This site does not set tracking cookies. Your browser may store a small amount of
          information used by the site itself (for example, remembering whether you have closed a
          menu), but none of it leaves your browser.
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
