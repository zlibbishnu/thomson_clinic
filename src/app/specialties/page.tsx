import Link from "next/link";

import { specialties } from "@/config/specialties";

export default function SpecialtiesPage() {
  return (
    <div className="specialties-page">

      {/* HERO */}
      <section className="specialties-hero">
        <div className="container">
          <div className="specialties-hero-content">

            <span className="eyebrow">
              AREAS OF CARE
            </span>

            <h1>
              Specialist care across
              <span> mental health & neuroscience.</span>
            </h1>

            <p>
              Explore our areas of care and connect with specialists
              for assessment, treatment and ongoing support.
            </p>

            <div className="specialties-hero-actions">

              <Link
                href="/doctors"
                className="button button-primary"
              >
                Find a Doctor
              </Link>

              <Link
                href="/services"
                className="button button-secondary"
              >
                Explore Services
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="specialties-intro-section">
        <div className="container specialties-intro">

          <div>

            <span className="eyebrow">
              SPECIALIST NETWORK
            </span>

            <h2>
              Care organised around
              <br />
              your needs.
            </h2>

          </div>

          <p>
            Thomson Clinic brings together specialists across
            mental health, neuroscience and related disciplines.
            Browse an area of care to understand the conditions
            we address and the services available.
          </p>

        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="specialties-grid-section">

        <div className="container">

          <div className="section-heading">

            <span className="eyebrow">
              SPECIALTIES
            </span>

            <h2>
              Explore our areas of care
            </h2>

            <p>
              Select a specialty to learn more about the conditions,
              services and specialist care available.
            </p>

          </div>

          <div className="specialties-grid">

            {specialties.map((specialty, index) => (

              <article
                className="specialty-card"
                key={specialty.slug}
              >

                <div className="specialty-card-top">

                  <span className="specialty-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="specialty-arrow">
                    →
                  </span>

                </div>

                <h3>
                  {specialty.title}
                </h3>

                <p>
                  {specialty.shortDescription}
                </p>

                <div className="specialty-areas">

                  {specialty.conditions
                    .slice(0, 4)
                    .map((condition) => (

                      <span key={condition}>
                        {condition}
                      </span>

                    ))}

                </div>

                <Link
                  href={`/specialties/${specialty.slug}`}
                  className="specialty-link"
                >
                  Explore specialty
                  <span>→</span>
                </Link>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* HELP */}
      <section className="specialties-help-section">

        <div className="container">

          <div className="specialties-help">

            <div className="specialties-help-content">

              <span className="eyebrow">
                NOT SURE WHERE TO START?
              </span>

              <h2>
                Start with a doctor.
              </h2>

              <p>
                If you are unsure which specialty is appropriate,
                browse our doctor directory and explore each
                specialist&apos;s profile, expertise and consultation
                options.
              </p>

              <Link
                href="/doctors"
                className="button button-primary"
              >
                Browse Doctors
              </Link>

            </div>

            <div className="specialties-help-panel">

              <div className="help-icon">
                T
              </div>

              <h3>
                THOMSON CLINIC
              </h3>

              <p>
                Mental Health & Neuroscience
              </p>

              <div className="help-line" />

              <span>
                Online & in-person consultations
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="specialties-final-cta">

        <div className="container">

          <div className="final-cta-content">

            <span className="eyebrow">
              FIND THE RIGHT CARE
            </span>

            <h2>
              Connect with a specialist.
            </h2>

            <p>
              Explore doctors and consultation options across
              Thomson Clinic.
            </p>

            <div className="final-cta-actions">

              <Link
                href="/doctors"
                className="button button-primary"
              >
                Find a Doctor
              </Link>

              <Link
                href="/contact"
                className="button button-secondary"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}