import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mission Possible | Hooves and Paws</title>
        <meta
          name="description"
          content="A partnership between Guardian 4 Heroes and Heroes K9 Odyssey Academy — serving veterans and first responders alongside the animals who help them heal."
        />
      </Head>

      <main>
        <section className="hero-mp">
          <div className="hero-mp-inner">
            <h1 className="brand-title">MISSION POSSIBLE</h1>
            <p className="brand-tagline">
              Where Hooves, Paws, and Combat Boots Meet.
            </p>
            <p className="brand-subtagline">
              Serving Those Who Serve.<br />
              Together, We Heal. Together, We Thrive.
            </p>
            <Link href="/events" className="btn-primary cta">
              See Upcoming Events
            </Link>
          </div>
        </section>

        <section className="joint-mission">
          <div className="container">
            <h2>Two Missions. One Purpose.</h2>
            <p>
              Mission Possible is a partnership between Guardian 4 Heroes and
              Heroes K9 Odyssey Academy — two nonprofits dedicated to helping
              veterans and first responders heal, grow, and thrive alongside
              the animals who walk beside them.
            </p>
            <p>
              Through equine therapy, K9 training, and community events, we
              honor those who served and the rescue animals who serve right back.
            </p>
            <p className="emphasis">
              Together, We Heal. Together, We Thrive.
            </p>
          </div>
        </section>

        <section className="nonprofits">
          <div className="container">
            <div className="nonprofit-grid">
              <article className="nonprofit-card">
                <div className="nonprofit-logo-placeholder">G4H Logo</div>
                <div className="nonprofit-photo-placeholder">
                  [Horse Photo]
                </div>
                <h3>Guardian 4 Heroes</h3>
                <p className="nonprofit-tagline">
                  The Power of the Connection with a Horse
                </p>
                <p>
                  Guardian 4 Heroes provides equine-facilitated therapy and
                  assisted training for veterans and first responders. Through
                  the quiet strength of horses, those who served find a path
                  toward healing — physically, mentally, and emotionally.
                </p>
                <p className="quote">
                  "When the noise of war fades, the silence can be loud. But
                  here, with every hoofbeat and shared breath, healing begins."
                </p>
                <a
                  href="https://www.guardian4heroes.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learn-more"
                >
                  Learn More →
                </a>
              </article>

              <article className="nonprofit-card">
                <div className="nonprofit-logo-placeholder">HK9OA Logo</div>
                <div className="nonprofit-photo-placeholder">
                  [Dog Photo]
                </div>
                <h3>Heroes K9 Odyssey Academy</h3>
                <p className="nonprofit-tagline">
                  Training Heroes. Saving Dogs. Changing Lives.
                </p>
                <p>
                  Heroes K9 Odyssey Academy equips veterans and first responders
                  with skills in canine training and care, while rehabilitating
                  rescue dogs to serve as service animals or companions.
                </p>
                <p>
                  The result is a ripple effect — humans healing alongside the
                  animals they help, creating stronger communities and second
                  chances for both.
                </p>
                <a
                  href="https://heroesk9odysseyacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learn-more"
                >
                  Learn More →
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Join Us at Our Next Event</h2>
            <Link href="/events" className="btn-primary cta">
              See Upcoming Events
            </Link>
          </div>
        </section>

        <footer className="site-footer">
          <div className="container">
            <p className="footer-brand">Mission Possible | Hooves and Paws</p>
            <p className="footer-orgs">
              Guardian 4 Heroes &nbsp;|&nbsp; Heroes K9 Odyssey Academy
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
