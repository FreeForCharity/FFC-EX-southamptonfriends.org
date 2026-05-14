import React from 'react'

const Hero: React.FC = () => {
  return (
    <section
      id="welcome"
      aria-labelledby="welcome-heading"
      className="relative bg-paper border-b border-rule"
    >
      <div className="sf-container py-20 md:py-28 lg:py-32 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-8">
          <p className="font-(family-name:--font-lato) text-[0.78rem] tracking-[0.22em] uppercase text-stone mb-6">
            Religious Society of Friends · Southampton, Pennsylvania
          </p>
          <h1
            id="welcome-heading"
            className="font-(family-name:--font-cantata-one) text-ink text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.4rem] leading-[1.12] tracking-[-0.005em]"
          >
            Southampton Monthly Meeting of the Religious Society of Friends.
          </h1>
          <p className="mt-7 max-w-[60ch] text-[1.1rem] md:text-[1.18rem] leading-[1.75] text-ink/85 font-(family-name:--font-faustina)">
            We are a small but passionate group of Quakers meeting in Southampton, Pennsylvania.
            Together we gather in silent, expectant worship — in person and online — for about an
            hour at <strong className="font-semibold">10:00 AM each and every Sunday</strong>.
          </p>
          <p className="mt-5 max-w-[60ch] text-[1rem] leading-[1.75] text-ink/70 font-(family-name:--font-faustina) italic">
            All are welcome. Come as you are.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 font-(family-name:--font-lato) text-[0.92rem]">
            <a
              href="#meeting"
              className="inline-flex items-center gap-2 text-ink border-b border-ink/40 hover:border-sky-deep hover:text-sky-deep pb-1 transition-colors"
            >
              Sunday worship details
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-ink/70 hover:text-sky-deep transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        <aside
          aria-label="Quick facts"
          className="md:col-span-4 md:pl-8 md:border-l md:border-rule md:pt-3"
        >
          <dl className="space-y-6 font-(family-name:--font-faustina) text-[0.98rem]">
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-stone font-(family-name:--font-lato)">
                Sunday Worship
              </dt>
              <dd className="mt-1 text-ink">
                10:00 AM
                <br />
                In person &amp; online
              </dd>
            </div>
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-stone font-(family-name:--font-lato)">
                Meetinghouse
              </dt>
              <dd className="mt-1 text-ink">
                710 Gravel Hill Road
                <br />
                Southampton, PA 18966
              </dd>
            </div>
            <div>
              <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-stone font-(family-name:--font-lato)">
                Telephone
              </dt>
              <dd className="mt-1 text-ink">
                <a href="tel:+12153640581" className="underline-offset-4 hover:text-sky-deep">
                  (215) 364-0581
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

export default Hero
