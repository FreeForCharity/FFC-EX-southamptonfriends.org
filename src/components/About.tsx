import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-paper border-b border-rule">
      <div className="sf-container py-16 md:py-20 grid md:grid-cols-12 gap-12">
        <header className="md:col-span-4">
          <p className="font-(family-name:--font-lato) text-[0.72rem] uppercase tracking-[0.22em] text-stone">
            About the Meeting
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-(family-name:--font-cantata-one) text-ink text-[1.85rem] md:text-[2.15rem] leading-tight"
          >
            A small meeting with deep roots.
          </h2>
        </header>

        <div className="md:col-span-8 space-y-6 sf-prose">
          <p>
            Southampton Friends Meeting began in 1941, when Friends gathered informally in one
            another&rsquo;s homes. A monthly meeting was officially established in 1947, first using
            an old school building — later used as a tap room — before settling into our current
            home.
          </p>
          <p>
            The present meetinghouse, built in 1969, is the most modern of Quaker meetinghouses in
            the area. A large picture window opens onto the woods, drawing the quiet of the trees
            into the worship room.
          </p>

          <figure className="mt-10 border-l-2 border-sky/60 pl-6 italic text-ink/75">
            <blockquote className="text-[1.05rem] md:text-[1.12rem] leading-[1.75]">
              &ldquo;A community of faith based on experience of a transforming power named many
              ways: the Inner Light, the Spirit of Christ, the Guide, the Living God.&rdquo;
            </blockquote>
            <figcaption className="mt-3 not-italic font-(family-name:--font-lato) text-[0.78rem] uppercase tracking-[0.18em] text-stone">
              Philadelphia Yearly Meeting
            </figcaption>
          </figure>

          <p>
            Southampton is part of{' '}
            <a
              href="http://www.quakersbucks.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
            >
              Bucks Quarterly Meeting
            </a>{' '}
            and{' '}
            <a
              href="https://www.pym.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-rule hover:text-sky-deep hover:decoration-sky-deep"
            >
              Philadelphia Yearly Meeting
            </a>
            , the oldest yearly meeting of Friends in the Americas.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
