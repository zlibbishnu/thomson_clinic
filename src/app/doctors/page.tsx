import Link from "next/link";

import { db } from "@/lib/db";

const specialties = [
  "All Specialties",
  "Psychiatry",
  "Psychology",
  "Neurology",
  "Neuropsychiatry",
];

function getInitials(name: string) {
  const cleanName = name.replace(/^Dr\.?\s*/i, "").trim();

  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}

export default async function DoctorsPage() {
  const doctors = await db.orm.public.Doctor
    .where({ isActive: true })
    .orderBy((doctor) => doctor.name.asc())
    .all();

  return (
    <div className="directory-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="directory-hero">
        <div className="container">

          <span className="eyebrow">
            THOMSON CLINIC
          </span>

          <h1>
            Find a Specialist
          </h1>

          <p>
            Explore doctors and specialists across mental health,
            neuroscience and other areas of healthcare.
          </p>

        </div>
      </section>


      {/* =====================================================
          DIRECTORY
          ===================================================== */}

      <section className="directory-section">
        <div className="container">

          <div className="directory-layout">

            {/* =================================================
                SIDEBAR
                ================================================= */}

            <aside className="directory-sidebar">

              <div className="filter-box">

                <h3>
                  Refine your search
                </h3>

                <div className="filter-group">

                  <label htmlFor="specialty">
                    Specialty
                  </label>

                  <select id="specialty">

                    {specialties.map((specialty) => (
                      <option
                        key={specialty}
                        value={specialty}
                      >
                        {specialty}
                      </option>
                    ))}

                  </select>

                </div>


                <div className="filter-group">

                  <label htmlFor="location">
                    Location
                  </label>

                  <select id="location">

                    <option>
                      All locations
                    </option>

                    <option>
                      Bhubaneswar
                    </option>

                    <option>
                      Cuttack
                    </option>

                    <option>
                      Online consultation
                    </option>

                  </select>

                </div>


                <div className="filter-group">

                  <label htmlFor="consultation">
                    Consultation
                  </label>

                  <select id="consultation">

                    <option>
                      Any mode
                    </option>

                    <option>
                      Online
                    </option>

                    <option>
                      In-person
                    </option>

                  </select>

                </div>


                <button
                  type="button"
                  className="filter-reset"
                >
                  Reset filters
                </button>

              </div>

            </aside>


            {/* =================================================
                MAIN RESULTS
                ================================================= */}

            <div className="directory-results">

              <div className="directory-toolbar">

                <div>

                  <span className="results-label">
                    SPECIALISTS
                  </span>

                  <h2>
                    Doctors & Consultants
                  </h2>

                </div>

                <span className="results-count">
                  {doctors.length}{" "}
                  {doctors.length === 1
                    ? "specialist"
                    : "specialists"}
                </span>

              </div>


              {/* Search */}

              <div className="directory-search">

                <span>
                  ⌕
                </span>

                <input
                  type="search"
                  placeholder="Search by doctor, specialty or condition"
                  aria-label="Search doctors"
                />

              </div>


              {/* Doctor cards */}

              <div className="directory-doctor-list">

                {doctors.length > 0 ? (

                  doctors.map((doctor) => (

                    <article
                      className="directory-doctor-card"
                      key={doctor.slug}
                    >

                      <div className="directory-doctor-photo">

                        <span>
                          {getInitials(doctor.name)}
                        </span>

                      </div>


                      <div className="directory-doctor-content">

                        <div className="directory-doctor-main">

                          <span className="doctor-specialty">
                            {doctor.specialty}
                          </span>

                          <h3>
                            {doctor.name}
                          </h3>

                          <p className="doctor-qualification">
                            {doctor.qualification}
                          </p>

                          <p className="doctor-designation">
                            {doctor.designation}
                          </p>


                          <div className="doctor-meta">

                            {doctor.subSpecialty && (
                              <span>
                                {doctor.subSpecialty}
                              </span>
                            )}

                            {doctor.location && (
                              <span>
                                {doctor.location}
                              </span>
                            )}

                            {doctor.consultationMode && (
                              <span>
                                {doctor.consultationMode}
                              </span>
                            )}

                          </div>

                        </div>


                        <div className="directory-doctor-actions">

                          <Link
                            href={`/doctors/${doctor.slug}`}
                            className="secondary-button"
                          >
                            View Profile
                          </Link>

                          <Link
                            href={`/doctors/${doctor.slug}#booking`}
                            className="primary-button"
                          >
                            Consult
                          </Link>

                        </div>

                      </div>

                    </article>

                  ))

                ) : (

                  <div className="directory-empty-state">

                    <h3>
                      No specialists available
                    </h3>

                    <p>
                      There are currently no active doctor profiles
                      available in the directory.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}