import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";

function getInitials(name: string) {
  const cleanName = name.replace(/^Dr\.?\s*/i, "").trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function splitList(value: string | null) {
  return value?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
}

function formatFee(fee: number | null) {
  if (fee === null) {
    return "Consultation fee displayed at booking";
  }

  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(fee);
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const doctor = await db.orm.public.Doctor
    .where({ slug, isActive: true })
    .first();

  if (!doctor) {
    notFound();
  }

  const languages = splitList(doctor.languages);
  const expertise = splitList(doctor.areasOfExpertise);
  const services = expertise;
  const fee = formatFee(doctor.consultationFee);
  const registration = doctor.registrationNumber ??
    "Medical registration details available on request";
  const photoUrl = doctor.photoUrl?.trim();
  const initials = getInitials(doctor.name);

  return (
    <div className="doctor-profile-page">

      {/* =====================================================
          PROFILE HEADER
          ===================================================== */}

      <section className="doctor-profile-hero">
        <div className="container">

          <div className="doctor-breadcrumb">
            <Link href="/">
              Home
            </Link>

            <span>/</span>

            <Link href="/doctors">
              Doctors
            </Link>

            <span>/</span>

            <span>
              {doctor.name}
            </span>
          </div>


          <div className="doctor-profile-header">

            {/* Photo */}
            <div className="doctor-profile-photo">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={doctor.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span>
                  {initials}
                </span>
              )}
            </div>


            {/* Main information */}
            <div className="doctor-profile-main">

              <span className="doctor-profile-specialty">
                {doctor.specialty}
              </span>

              <h1>
                {doctor.name}
              </h1>

              <p className="doctor-profile-qualification">
                {doctor.qualification}
              </p>

              <p className="doctor-profile-designation">
                {doctor.designation}
              </p>

              <div className="doctor-profile-tags">

                <span>
                  {doctor.subSpecialty}
                </span>

                <span>
                  {doctor.location}
                </span>

                <span>
                  {doctor.consultationMode}
                </span>

              </div>

            </div>


            {/* Booking card */}
            <aside
              className="doctor-booking-card"
              id="booking"
            >

              <span className="booking-label">
                CONSULTATION
              </span>

              <h2>
                Book a consultation
              </h2>

              <p>
                Choose an available consultation option
                with this specialist.
              </p>

              <div className="booking-detail">
                <span>Mode</span>
                <strong>
                  {doctor.consultationMode}
                </strong>
              </div>

              <div className="booking-detail">
                <span>Location</span>
                <strong>
                  {doctor.location}
                </strong>
              </div>

              <div className="booking-detail">
                <span>Fee</span>
                <strong>
                  {fee}
                </strong>
              </div>

              <button
                type="button"
                className="primary-button booking-button"
              >
                Book Consultation
                <span>→</span>
              </button>

            </aside>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROFILE CONTENT
          ===================================================== */}

      <section className="doctor-profile-content">
        <div className="container">

          <div className="doctor-profile-layout">

            <main>

              {/* About */}
              <section className="profile-content-section">

                <span className="eyebrow">
                  ABOUT THE DOCTOR
                </span>

                <h2>
                  Clinical profile
                </h2>

                <p className="profile-bio">
                  {doctor.bio}
                </p>

              </section>


              {/* Expertise */}
              <section className="profile-content-section">

                <span className="eyebrow">
                  AREAS OF EXPERTISE
                </span>

                <h2>
                  Clinical interests
                </h2>

                <div className="expertise-grid">

                  {expertise.map((item) => (
                    <div
                      className="expertise-item"
                      key={item}
                    >
                      <span>✓</span>
                      {item}
                    </div>
                  ))}

                </div>

              </section>


              {/* Services */}
              <section className="profile-content-section">

                <span className="eyebrow">
                  SERVICES
                </span>

                <h2>
                  Consultation services
                </h2>

                <div className="profile-services">

                  {services.map(
                    (service, index) => (
                      <div
                        className="profile-service"
                        key={service}
                      >

                        <span>
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <strong>
                          {service}
                        </strong>

                      </div>
                    )
                  )}

                </div>

              </section>

            </main>


            {/* =================================================
                SIDEBAR
                ================================================= */}

            <aside className="doctor-profile-sidebar">

              <div className="profile-info-card">

                <h3>
                  Professional information
                </h3>

                <div className="profile-info-row">
                  <span>Specialty</span>
                  <strong>
                    {doctor.specialty}
                  </strong>
                </div>

                <div className="profile-info-row">
                  <span>Qualification</span>
                  <strong>
                    {doctor.qualification}
                  </strong>
                </div>

                <div className="profile-info-row">
                  <span>Languages</span>
                  <strong>
                    {languages.join(", ")}
                  </strong>
                </div>

                <div className="profile-info-row">
                  <span>Registration</span>
                  <strong>
                    {registration}
                  </strong>
                </div>

              </div>


              <div className="profile-contact-card">

                <span className="eyebrow">
                  NEED HELP?
                </span>

                <h3>
                  Not sure which specialist you need?
                </h3>

                <p>
                  Explore our specialties or contact
                  Thomson Clinic for guidance.
                </p>

                <Link
                  href="/specialties"
                  className="secondary-button"
                >
                  Explore Specialties
                </Link>

              </div>

            </aside>

          </div>

        </div>
      </section>


      {/* =====================================================
          BACK TO DOCTORS
          ===================================================== */}

      <section className="profile-bottom-cta">
        <div className="container">

          <Link
            href="/doctors"
            className="text-link"
          >
            ← Back to all doctors
          </Link>

        </div>
      </section>

    </div>
  );
}