import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of use for the Southampton Friends Meeting website.',
}

export default function TermsOfService() {
  return (
    <div className="bg-paper">
      <article className="mx-auto px-4 max-w-[760px] py-16 md:py-20 sf-prose">
        <p className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.22em] text-stone">
          Site Information
        </p>
        <h1 className="mt-3 font-(family-name:--font-cantata-one) text-ink text-[2rem] md:text-[2.4rem] leading-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-stone font-(family-name:--font-lato) text-[0.9rem]">
          Effective date: January 2026
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-10 mb-3">
          About this site
        </h2>
        <p>
          This is the website of Southampton Monthly Meeting of the Religious Society of Friends. We
          publish information about Sunday worship, our meetinghouse, and resources for visitors and
          inquirers. The information is provided in good faith and as-is, with no warranty of any
          kind.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Acceptable use
        </h2>
        <p>
          You are welcome to read, link to, and share material on this site. Please do not attempt
          to disrupt the site, misrepresent the meeting, or use our name or content in a way that
          implies endorsement we have not given.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          External links
        </h2>
        <p>
          This site contains links to outside organizations, including Philadelphia Yearly Meeting,
          Bucks Quarterly Meeting, Friends General Conference, and Facebook. We are not responsible
          for the content of those sites.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Changes
        </h2>
        <p>
          We may revise these terms from time to time. The current version is always posted at this
          page.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Contact
        </h2>
        <p>
          Southampton Friends Meeting · 710 Gravel Hill Road, Southampton, PA 18966 · (215) 364-0581
        </p>
      </article>
    </div>
  )
}
