import React from 'react'

const MeetingInfo: React.FC = () => {
  return (
    <section
      id="meeting"
      aria-labelledby="meeting-heading"
      className="bg-paper-deep border-b border-rule"
    >
      <div className="sf-container py-16 md:py-20 grid md:grid-cols-12 gap-12">
        <header className="md:col-span-4">
          <p className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.22em] text-stone">
            Sunday Worship
          </p>
          <h2
            id="meeting-heading"
            className="mt-3 font-(family-name:--font-cantata-one) text-ink text-[1.85rem] md:text-[2.15rem] leading-tight"
          >
            What to expect on a First Day morning.
          </h2>
        </header>

        <div className="md:col-span-8 space-y-6 sf-prose">
          <p>
            Quaker worship in the unprogrammed tradition is rooted in silence. There is no minister
            or sermon. Instead, we sit together in stillness, waiting on the Spirit — what early
            Friends called the Inner Light, the Living God, the Guide. From that silence, anyone
            present may feel moved to share a brief spoken message. Most worship hours are quiet
            throughout.
          </p>
          <p>
            Worship lasts about one hour and ends when one of the Friends shakes the hand of a
            neighbor. Afterwards we share announcements, greetings, and time together.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-6 pt-6 border-t border-rule font-(family-name:--font-faustina)">
            <div>
              <h3 className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-2">
                When
              </h3>
              <p className="text-ink/90 leading-relaxed">
                Every Sunday (First Day) at <strong className="font-semibold">10:00 AM</strong>,
                year-round. Worship is offered in person at the meetinghouse and concurrently online
                for Friends who cannot travel.
              </p>
            </div>
            <div>
              <h3 className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-2">
                Where
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
                className="mt-2 inline-block text-[0.92rem] text-ink/80 hover:text-sky-deep underline underline-offset-4 decoration-rule hover:decoration-sky-deep font-(family-name:--font-lato)"
              >
                Directions &amp; map
              </a>
            </div>
            <div>
              <h3 className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-2">
                First-time visitors
              </h3>
              <p className="text-ink/90 leading-relaxed">
                There is no dress code and nothing is required of you. Arrive a few minutes early,
                find a seat, and settle into the silence. We are glad to welcome you.
              </p>
            </div>
            <div>
              <h3 className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.2em] text-stone mb-2">
                Joining online
              </h3>
              <p className="text-ink/90 leading-relaxed">
                For the current online worship link, please{' '}
                <a
                  href="#contact"
                  className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
                >
                  contact the meeting
                </a>{' '}
                and we will send it to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MeetingInfo
