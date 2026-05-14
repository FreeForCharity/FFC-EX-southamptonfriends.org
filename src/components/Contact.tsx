import React from 'react'

const Contact: React.FC = () => {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-paper-deep">
      <div className="sf-container py-16 md:py-20 grid md:grid-cols-12 gap-12">
        <header className="md:col-span-4">
          <p className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.22em] text-stone">
            Contact &amp; Visit
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-(family-name:--font-cantata-one) text-ink text-[1.85rem] md:text-[2.15rem] leading-tight"
          >
            We would be glad to hear from you.
          </h2>
          <p className="mt-5 sf-prose">
            Whether you are a Friend traveling through, a seeker exploring Quakerism, or a neighbor
            with a question — please reach out by phone, mail, or post.
          </p>
        </header>

        <div className="md:col-span-8 grid sm:grid-cols-2 gap-8 font-(family-name:--font-faustina)">
          <article aria-labelledby="contact-visit" className="border-l-2 border-rule pl-5">
            <h3
              id="contact-visit"
              className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-3"
            >
              Visit the meetinghouse
            </h3>
            <p className="text-ink/90 leading-relaxed">
              710 Gravel Hill Road
              <br />
              Southampton, PA 18966
            </p>
            <a
              href="https://maps.google.com/?q=710+Gravel+Hill+Road+Southampton+PA+18966"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[0.92rem] underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
            >
              Open in Google Maps
            </a>
          </article>

          <article aria-labelledby="contact-call" className="border-l-2 border-rule pl-5">
            <h3
              id="contact-call"
              className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-3"
            >
              Call the meeting
            </h3>
            <p className="text-ink/90 leading-relaxed">
              <a
                href="tel:+12153640581"
                className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
              >
                (215) 364-0581
              </a>
            </p>
            <p className="mt-2 text-[0.92rem] text-stone">
              Messages are returned by a member of the meeting.
            </p>
          </article>

          <article aria-labelledby="contact-write" className="border-l-2 border-rule pl-5">
            <h3
              id="contact-write"
              className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-3"
            >
              Write to us
            </h3>
            <p className="text-ink/90 leading-relaxed">
              You can write to the meeting at the address above, or reach us through{' '}
              <a
                href="https://www.facebook.com/SouthamptonQuakers"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
              >
                Facebook
              </a>
              .
            </p>
          </article>

          <article aria-labelledby="contact-larger" className="border-l-2 border-rule pl-5">
            <h3
              id="contact-larger"
              className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-3"
            >
              The wider community
            </h3>
            <ul className="text-ink/90 leading-relaxed space-y-1">
              <li>
                <a
                  href="https://www.pym.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
                >
                  Philadelphia Yearly Meeting
                </a>
              </li>
              <li>
                <a
                  href="http://www.quakersbucks.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
                >
                  Bucks Quarterly Meeting
                </a>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Contact
