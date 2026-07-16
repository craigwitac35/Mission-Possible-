import Link from 'next/link';
import Head from 'next/head';
import PublicSiteHeader from '@/components/PublicSiteHeader';

const CAMPUS_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=310+US+Hwy+71+N+Sauk+Centre+MN+56378';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Mission Possible</title>
        <meta
          name="description"
          content="Contact Guardian 4 Heroes and Heroes K9 Odyssey Academy. Both organizations are located at The Eagles Healing Nest, 310 US Hwy 71 N, Sauk Centre, MN."
        />
      </Head>

      <main className="mp-site">
        <PublicSiteHeader />

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2">
            <div className="mp-events-intro-v2 mp-contact-intro-v3">
              <Link href="/" className="mp-back-link-v2 mp-back-link-dark-v2">
                &larr; Mission Possible Home
              </Link>

              <p className="mp-label-v2">Reach Out</p>

              <h1 className="mp-title-v2">
                Contact <em>Us</em>
              </h1>

              <p className="mp-prose-center-v2">
                Questions about the event, sponsorship, volunteering, or the
                programs behind it? Both organizations are one message away.
              </p>
            </div>

            <div className="mp-events-intro-v2">
              <p className="mp-label-v2">Find Us</p>

              <h2 className="mp-title-v2">
                Two Missions, <em>One Address</em>
              </h2>

              <address className="mp-campus-address-v3">
                <span className="mp-campus-street-v3">
                  310 US Hwy 71 N, Sauk Centre, MN 56378
                </span>
                <span className="mp-campus-venue-v3">
                  The Eagles Healing Nest
                </span>
              </address>

              <a
                href={CAMPUS_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mp-campus-map-link-v3"
              >
                Open in Maps &rarr;
              </a>
            </div>

            <div className="mp-campus-grid-v3">
              <article className="mp-campus-card-v3">
                <p className="mp-campus-card-kicker-v3">Hooves</p>
                <h3 className="mp-campus-card-name-v3">Guardian 4 Heroes</h3>
                <p className="mp-campus-card-where-v3">
                  At the <strong>Barnyard</strong>
                </p>
              </article>

              <article className="mp-campus-card-v3">
                <p className="mp-campus-card-kicker-v3">Paws</p>
                <h3 className="mp-campus-card-name-v3">
                  Heroes K9 Odyssey Academy
                </h3>
                <p className="mp-campus-card-where-v3">
                  Behind the <strong>Auditorium</strong>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-dark-v2">
          <div className="mp-container-v2">
            <p className="mp-label-v2 mp-label-light-v2">The Organizations</p>
            <h2 className="mp-title-v2 mp-title-light-v2">
              Talk to the <em>Hooves</em> &amp; the <em>Paws</em>
            </h2>
          </div>

          <div className="mp-contact-grid-v3">
            <article className="mp-contact-card-v3">
              <div className="mp-partner-logo-v2">
                <img src="/images/g4h-logo.png" alt="Guardian 4 Heroes" />
              </div>

              <p className="mp-partner-kicker">Hooves</p>

              <h3 className="mp-partner-name-v2">Guardian 4 Heroes</h3>

              <p className="mp-partner-tagline-v2">
                The Power of the Connection with a Horse
              </p>

              <ul className="mp-contact-list-v3">
                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Email</span>
                  <a
                    href="mailto:contact@guardian4heroes.org"
                    className="mp-contact-item-value-v3"
                  >
                    contact@guardian4heroes.org
                  </a>
                </li>

                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Phone</span>
                  <a href="tel:+13208282477" className="mp-contact-item-value-v3">
                    (320) 828-2477
                  </a>
                </li>

                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Mailing Address</span>
                  <address className="mp-contact-address-v3">
                    310 US Hwy 71 N
                    <br />
                    Sauk Centre, MN 56378
                  </address>
                </li>

                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Follow</span>
                  <span className="mp-contact-social-row-v3">
                    <a
                      href="https://www.facebook.com/share/166AZz6rxd/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mp-contact-item-value-v3"
                    >
                      Facebook
                    </a>
                    <span className="mp-contact-dot-v3">&middot;</span>
                    <a
                      href="https://www.instagram.com/guardian4heroes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mp-contact-item-value-v3"
                    >
                      Instagram
                    </a>
                  </span>
                </li>
              </ul>

              <a
                href="https://www.guardian4heroes.org/contact.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mp-partner-link-v2"
              >
                Guardian 4 Heroes Contact Form &rarr;
              </a>
            </article>

            <article className="mp-contact-card-v3">
              <div className="mp-partner-logo-v2">
                <img src="/images/hk9oa-logo.png" alt="Heroes K9 Odyssey Academy" />
              </div>

              <p className="mp-partner-kicker">Paws</p>

              <h3 className="mp-partner-name-v2">Heroes K9 Odyssey Academy</h3>

              <p className="mp-partner-tagline-v2">Where Purpose Meets Paws</p>

              <ul className="mp-contact-list-v3">
                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Email</span>
                  <a
                    href="mailto:amie@heroesk9odysseyacademy.org"
                    className="mp-contact-item-value-v3"
                  >
                    amie@heroesk9odysseyacademy.org
                  </a>
                </li>

                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Phone</span>
                  <a href="tel:+13204269889" className="mp-contact-item-value-v3">
                    (320) 426-9889
                  </a>
                </li>

                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Mailing Address</span>
                  <address className="mp-contact-address-v3">
                    214 &ndash; 11th Ave N
                    <br />
                    Waite Park, MN 56387
                  </address>
                </li>

                <li className="mp-contact-item-v3">
                  <span className="mp-contact-item-label-v3">Follow</span>
                  <span className="mp-contact-social-row-v3">
                    <a
                      href="https://www.facebook.com/p/Heroes-K9-Odyssey-Academy-61576134734840/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mp-contact-item-value-v3"
                    >
                      Facebook
                    </a>
                  </span>
                </li>
              </ul>

              <a
                href="https://www.heroesk9odysseyacademy.org/contactus"
                target="_blank"
                rel="noopener noreferrer"
                className="mp-partner-link-v2"
              >
                Heroes K9 Contact Page &rarr;
              </a>
            </article>
          </div>
        </section>

        <section className="mp-section-v2 mp-section-cream-v2">
          <div className="mp-container-v2 mp-container-narrow-v2">
            <h2 className="mp-title-v2">
              Already Know You&apos;re <em>In?</em>
            </h2>

            <p className="mp-prose-center-v2 mp-contact-cta-prose-v3">
              Skip the message. Grab your spot at the starting line.
            </p>

            <Link href="/register" className="mp-cinematic-cta">
              <span className="mp-cinematic-cta-star">&#9733;</span>
              Register Now
              <span className="mp-cinematic-cta-star">&#9733;</span>
            </Link>
          </div>
        </section>

        <footer className="mp-footer-v2">
          <div className="mp-container-v2">
            <div className="mp-footer-grid-v2">
              <div className="mp-footer-col-v2">
                <p className="mp-footer-brand-v2">Mission Possible</p>
                <p className="mp-footer-tagline-v2">Hooves &amp; Paws</p>
                <p className="mp-footer-text-v2">
                  Where Hooves, Paws, and Heroes Heal.
                </p>
              </div>

              <div className="mp-footer-col-v2">
                <p className="mp-footer-heading-v2">Guardian 4 Heroes</p>
                <a
                  href="https://www.guardian4heroes.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-footer-link-v2"
                >
                  guardian4heroes.org &rarr;
                </a>
              </div>

              <div className="mp-footer-col-v2">
                <p className="mp-footer-heading-v2">Heroes K9 Odyssey Academy</p>
                <a
                  href="https://heroesk9odysseyacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-footer-link-v2"
                >
                  heroesk9odysseyacademy.org &rarr;
                </a>
              </div>
            </div>

            <div className="mp-footer-bottom-v2">
              <p>&copy; 2025 Mission Possible. All rights reserved.</p>
              <p className="mp-footer-credit-v2">
                Built by{' '}
                <a href="https://web-ops-studio.com" target="_blank" rel="noopener noreferrer">
                  WebOps Studio
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
