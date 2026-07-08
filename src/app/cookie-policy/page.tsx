import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How the Southampton Friends Meeting website uses cookies and similar technologies, and your choices.',
}

export default function CookiePolicy() {
  return (
    <div className="bg-paper">
      <article className="mx-auto px-4 max-w-[760px] py-16 md:py-20 sf-prose">
        <p className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.22em] text-stone">
          Site Information
        </p>
        <h1 className="mt-3 font-(family-name:--font-cantata-one) text-ink text-[2rem] md:text-[2.4rem] leading-tight">
          Cookie Policy
        </h1>
        <p className="mt-3 text-stone font-(family-name:--font-lato) text-[0.9rem]">
          Effective date: January 2026
        </p>

        <p className="mt-6">
          This policy explains how the Southampton Friends Meeting website (southamptonfriends.org)
          uses cookies and similar technologies, and how you can control them.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-10 mb-3">
          What are cookies?
        </h2>
        <p>
          Cookies are small text files stored on your device. They help websites function, remember
          preferences, and measure how a site is used.
        </p>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          How we use cookies
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Necessary and functional.</strong> A small amount of information may be stored
            to make the site work and to remember your cookie choices. These are set regardless of
            consent because the site cannot function without them.
          </li>
          <li>
            <strong>Analytics (consent-based).</strong> We use Google Tag Manager and Google
            Analytics 4 to understand aggregate site usage. Analytics cookies (for example,{' '}
            <code>_ga</code>) are set only after you consent through our cookie banner.
          </li>
          <li>
            <strong>Third-party.</strong> Some pages link to or embed outside services (for example,
            Facebook or other Quaker organizations), and those services may set their own cookies
            when used.
          </li>
        </ul>

        <h2 className="font-(family-name:--font-cantata-one) text-ink text-[1.4rem] mt-8 mb-3">
          Managing your choices
        </h2>
        <p>
          When you first visit, our cookie-consent banner lets you accept, decline, or customize
          non-essential cookies. Declining removes analytics cookies such as <code>_ga</code>. To
          change your choice later, clear this site&apos;s cookies and stored data in your browser
          settings — the consent banner will appear again on your next visit so you can choose
          differently.
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
