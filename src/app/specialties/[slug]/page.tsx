import Link from "next/link";
import { notFound } from "next/navigation";

import {
  specialties,
  getSpecialtyBySlug,
} from "@/config/specialties";

export function generateStaticParams() {
  return specialties.map((specialty) => ({
    slug: specialty.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const specialty = getSpecialtyBySlug(slug);

  if (!specialty) {
    return {
      title: "Specialty Not Found",
    };
  }

  return {
    title: specialty.title,
    description: specialty.heroDescription,
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const specialty = getSpecialtyBySlug(slug);

  if (!specialty) {
    notFound();
  }

  const related = specialty.relatedSpecialties
    .map((relatedSlug) => getSpecialtyBySlug(relatedSlug))
    .filter(Boolean);

  return (
    <div className="specialty-detail-page">

      {/* BREADCRUMB */}

      <div className="container specialty-breadcrumb">

        <Link href="/">
          Home
        </Link>

        <span>/</span>

        <Link href="/specialties">
          Specialties
        </Link>

        <span>/</span>

        <span>
          {specialty.title}
        </span>

      </div>

      {/* HERO */}

      <section className="specialty-detail-hero">

        <div className="container">

          <div className="specialty-detail-hero-content">

            <span className="eyebrow">
              SPECIALTY
            </span>

            <h1>
              {specialty.title}
            </h1>

            <p className="specialty-lead">
              {specialty.heroDescription}
            </p>

            <div className="specialty-hero-actions">

              <Link
                href={`/doctors?specialty=${encodeURIComponent(
                  specialty.title
                )}`}
                className="button button-primary"
              >
                Find a Specialist
              </Link>

              <Link
                href="/contact"
                className="button button-secondary"
              >
                Contact Thomson Clinic
              </Link>

            </div>

          </div>

          <div className="specialty-hero-note">

            <div className="specialty-note-mark">
              T
            </div>

            <div>

              <strong>
                Thomson Clinic
              </strong>

              <span>
                Assessment • Treatment • Follow-up
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* OVERVIEW */}

      <section className="specialty-overview-section">

        <div className="container">

          <div className="specialty-overview-grid">

            <div>

              <span className="eyebrow">
                OVERVIEW
              </span>

              <h2>
                Specialist care
                <br />
                built around your needs.
              </h2>

            </div>

            <div className="specialty-overview-copy">

              {specialty.overview.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CONDITIONS */}

      <section className="specialty-conditions-section">

        <div className="container">

          <div className="specialty-section-heading">

            <div>

              <span className="eyebrow">
                CONDITIONS
              </span>

              <h2>
                Concerns we commonly address
              </h2>

            </div>

            <p>
              Explore common conditions and clinical concerns
              associated with this specialty.
            </p>

          </div>

          <div className="condition-list">

            {specialty.conditions.map(
              (condition, index) => (
                <div
                  className="condition-item"
                  key={condition}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {condition}
                  </strong>

                  <i>
                    →
                  </i>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="specialty-services-section">

        <div className="container">

          <div className="specialty-section-heading">

            <div>

              <span className="eyebrow">
                SERVICES
              </span>

              <h2>
                Care across the treatment journey
              </h2>

            </div>

            <p>
              Services are selected according to the
              individual's clinical needs and goals.
            </p>

          </div>

          <div className="specialty-services-grid">

            {specialty.services.map(
              (service, index) => (
                <article
                  className="specialty-service-card"
                  key={service.title}
                >

                  <span className="service-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                </article>
              )
            )}

          </div>

        </div>

      </section>

      {/* APPROACH */}

      <section className="specialty-approach-section">

        <div className="container">

          <div className="specialty-approach-header">

            <span className="eyebrow">
              OUR APPROACH
            </span>

            <h2>
              A structured approach to care.
            </h2>

            <p>
              Clinical care is approached as an ongoing process
              of assessment, treatment and review.
            </p>

          </div>

          <div className="approach-grid">

            {specialty.approach.map(
              (item, index) => (
                <div
                  className="approach-item"
                  key={item.title}
                >

                  <span className="approach-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* WHEN TO CONSULT */}

      <section className="specialty-consult-section">

        <div className="container">

          <div className="consult-grid">

            <div className="consult-content">

              <span className="eyebrow">
                WHEN TO CONSULT
              </span>

              <h2>
                When specialist assessment
                may be useful.
              </h2>

              <p>
                Consider seeking specialist assessment when
                symptoms persist, interfere with everyday
                functioning or cause significant distress.
              </p>

            </div>

            <div className="consult-points">

              {specialty.whenToConsult.map(
                (point, index) => (
                  <div key={point}>

                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>
                      {point}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* DOCTOR CTA */}

      <section className="specialty-doctor-cta-section">

        <div className="container">

          <div className="specialty-doctor-cta">

            <div>

              <span className="eyebrow">
                FIND SPECIALIST CARE
              </span>

              <h2>
                Speak with a specialist.
              </h2>

              <p>
                Explore doctors, areas of expertise and
                available consultation options.
              </p>

            </div>

            <div className="specialty-cta-actions">

              <Link
                href={`/doctors?specialty=${encodeURIComponent(
                  specialty.title
                )}`}
                className="button button-primary"
              >
                View Specialists
              </Link>

              <Link
                href="/services/online-consultation"
                className="button button-secondary"
              >
                Online Consultation
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* RELATED SPECIALTIES */}

      <section className="related-specialties-section">

        <div className="container">

          <div className="related-specialties-header">

            <div>

              <span className="eyebrow">
                EXPLORE MORE
              </span>

              <h2>
                Related areas of care
              </h2>

            </div>

            <Link
              href="/specialties"
              className="view-all-link"
            >
              View all specialties →
            </Link>

          </div>

          <div className="related-specialties-grid">

            {related.map((item, index) => {

              if (!item) return null;

              return (
                <Link
                  key={item.slug}
                  href={`/specialties/${item.slug}`}
                  className="related-specialty-card"
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <i>
                    →
                  </i>

                </Link>
              );
            })}

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="specialty-final-cta">

        <div className="container">

          <div className="specialty-final-content">

            <span className="eyebrow">
              THOMSON CLINIC
            </span>

            <h2>
              Healthcare,
              connected to you.
            </h2>

            <p>
              Find a specialist or explore our services to
              understand what kind of care may be appropriate.
            </p>

            <div className="specialty-final-actions">

              <Link
                href="/doctors"
                className="button button-primary"
              >
                Find a Doctor
              </Link>

              <Link
                href="/specialties"
                className="button button-secondary"
              >
                All Specialties
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}