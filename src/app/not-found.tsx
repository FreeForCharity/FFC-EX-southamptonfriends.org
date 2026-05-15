import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--sf-sky)]">
          404
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--sf-ink)]">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-base text-[var(--sf-stone)]">
          The link may be old, or the page may have moved. Try heading back to our home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold bg-[var(--sf-sky-deep)] text-white hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
