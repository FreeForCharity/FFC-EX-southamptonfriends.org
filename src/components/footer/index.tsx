import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-paper-deep border-t border-rule mt-16">
      <div className="sf-container py-12 grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-(family-name:--font-cantata-one) text-lg text-ink">
            Southampton Monthly Meeting
          </h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80 font-(family-name:--font-faustina)">
            710 Gravel Hill Road
            <br />
            Southampton, PA 18966
          </p>
          <p className="mt-2 text-[0.95rem] text-ink/80">
            <a href="tel:+12153640581" className="hover:text-sky-deep underline-offset-4">
              (215) 364-0581
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-(family-name:--font-cantata-one) text-lg text-ink">
            Wider Quaker community
          </h2>
          <ul className="mt-3 space-y-2 text-[0.95rem] font-(family-name:--font-faustina)">
            <li>
              <a
                href="https://www.pym.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-sky-deep underline underline-offset-4 decoration-rule hover:decoration-sky-deep"
              >
                Philadelphia Yearly Meeting
              </a>
            </li>
            <li>
              <a
                href="http://www.quakersbucks.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-sky-deep underline underline-offset-4 decoration-rule hover:decoration-sky-deep"
              >
                Bucks Quarterly Meeting
              </a>
            </li>
            <li>
              <a
                href="https://www.fgcquaker.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-sky-deep underline underline-offset-4 decoration-rule hover:decoration-sky-deep"
              >
                Friends General Conference
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/SouthamptonQuakers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-sky-deep underline underline-offset-4 decoration-rule hover:decoration-sky-deep"
                aria-label="Southampton Quakers on Facebook"
              >
                Find us on Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-(family-name:--font-cantata-one) text-lg text-ink">
            Site information
          </h2>
          <ul className="mt-3 space-y-2 text-[0.95rem] font-(family-name:--font-faustina)">
            <li>
              <Link
                href="/privacy-policy"
                className="text-ink/85 hover:text-sky-deep underline underline-offset-4 decoration-rule hover:decoration-sky-deep"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="text-ink/85 hover:text-sky-deep underline underline-offset-4 decoration-rule hover:decoration-sky-deep"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-[0.8rem] text-stone font-(family-name:--font-lato)">
            Website hosted by{' '}
            <a
              href="https://freeforcharity.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
            >
              Free For Charity
            </a>
            .
          </p>
        </div>
      </div>

      <div className="sf-rule" />
      <div className="sf-container py-5 text-center text-[0.85rem] text-stone font-(family-name:--font-lato)">
        © {year} Southampton Monthly Meeting of Friends
      </div>
    </footer>
  )
}

export default Footer
