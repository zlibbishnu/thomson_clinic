import Link from "next/link";

const specialties = [
  {
    title: "Psychiatry",
    description:
      "Assessment and treatment of depression, anxiety, bipolar disorder, psychosis, addiction and other psychiatric conditions.",
    href: "/specialties/psychiatry",
  },
  {
    title: "Psychology",
    description:
      "Evidence-based psychological assessment, psychotherapy and behavioural interventions for children and adults.",
    href: "/specialties/psychology",
  },
  {
    title: "Neurology",
    description:
      "Clinical care for neurological symptoms and conditions, with a focus on the interface between brain and behaviour.",
    href: "/specialties/neurology",
  },
  {
    title: "Neuropsychiatry",
    description:
      "Specialist care for conditions involving cognition, behaviour, emotion and the nervous system.",
    href: "/services/neuropsychiatry",
  },
  {
    title: "Sleep Medicine",
    description:
      "Evaluation and management of insomnia, sleep-wake disorders and sleep-related mental health concerns.",
    href: "/services/sleep-medicine",
  },
  {
    title: "Addiction Psychiatry",
    description:
      "Confidential assessment and treatment for alcohol, tobacco, drug and behavioural addictions.",
    href: "/services/addiction-psychiatry",
  },
  {
    title: "Child & Adolescent Mental Health",
    description:
      "Assessment and support for developmental, emotional, behavioural and psychiatric concerns in young people.",
    href: "/services/child-adolescent-mental-health",
  },
  {
    title: "Geriatric Mental Health",
    description:
      "Mental health assessment and treatment for older adults, including depression, anxiety and cognitive concerns.",
    href: "/services/geriatric-mental-health",
  },
];

const doctors = [
  {
    name: "Dr. Bishnu Prasad Sahoo",
    qualification: "MD Psychiatry",
    designation: "Consultant Psychiatrist",
    specialty: "Psychiatry • Mental Health & Neuroscience",
    href: "/doctors/bishnu-prasad-sahoo",
  },
  {
    name: "Specialist Doctor",
    qualification: "Specialist Consultation",
    designation: "Consultant",
    specialty: "Psychology & Behavioural Health",
    href: "/doctors",
  },
  {
    name: "Specialist Doctor",
    qualification: "Specialist Consultation",
    designation: "Consultant",
    specialty: "Neurology & Neuroscience",
    href: "/doctors",
  },
];

const services = [
  {
    number: "01",
    title: "Online Consultation",
    description:
      "Connect with specialists through secure online consultations from wherever you are.",
    href: "/services/online-consultation",
  },
  {
    number: "02",
    title: "Mental Health Care",
    description:
      "Structured assessment and treatment across a broad range of psychiatric and psychological conditions.",
    href: "/services/mental-health",
  },
  {
    number: "03",
    title: "Neuroscience",
    description:
      "Explore the clinical interface between the brain, behaviour, cognition and mental health.",
    href: "/services/neuroscience",
  },
];

export default function Home() {
  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="home-hero">
        <div className="container hero-grid">

          <div className="hero-content">

            <div className="eyebrow">
              <span className="eyebrow-line" />
              THOMSON CLINIC
            </div>

            <h1>
              Mental Health &
              <br />
              Neuroscience
              <br />
              <span>Care, Connected.</span>
            </h1>

            <p className="hero-description">
              A modern healthcare platform connecting patients
              with trusted specialists across mental health,
              neuroscience and other areas of medicine.
            </p>

            <div className="hero-actions">
              <Link
                href="/doctors"
                className="primary-button"
              >
                Find a Doctor
                <span>→</span>
              </Link>

              <Link
                href="/services"
                className="secondary-button"
              >
                Explore Services
              </Link>
            </div>

            <div className="hero-trust">
              <div>
                <strong>Specialist-led</strong>
                <span>Clinical care</span>
              </div>

              <div>
                <strong>Online & in-person</strong>
                <span>Consultation options</span>
              </div>

              <div>
                <strong>Patient-focused</strong>
                <span>Care pathways</span>
              </div>
            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <div className="hero-card hero-card-main">

              <div className="hero-card-top">
                <span className="status-dot" />
                Specialist Care
              </div>

              <div className="brain-symbol">
                <span>ψ</span>
              </div>

              <h3>
                Mental Health
                <br />
                & Neuroscience
              </h3>

              <p>
                Thoughtful clinical care.
                Evidence-informed practice.
              </p>

              <Link href="/doctors">
                Explore specialists →
              </Link>

            </div>

            <div className="floating-card floating-card-one">
              <span>01</span>
              <div>
                <strong>Psychiatry</strong>
                <small>Adult & child mental health</small>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <span>02</span>
              <div>
                <strong>Neuroscience</strong>
                <small>Brain & behaviour</small>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SEARCH
          ===================================================== */}

      <section className="home-search-section">
        <div className="container">

          <div className="search-panel">

            <div className="search-panel-heading">
              <span className="eyebrow">
                FIND THE RIGHT CARE
              </span>

              <h2>
                What are you looking for?
              </h2>
            </div>

            <form
              className="home-search-form"
              action="/doctors"
            >
              <div className="home-search-input">
                <span>⌕</span>

                <input
                  type="text"
                  name="search"
                  placeholder="Search doctors, specialties or services"
                  aria-label="Search doctors, specialties or services"
                />
              </div>

              <button
                type="submit"
                className="primary-button"
              >
                Search
              </button>
            </form>

            <div className="popular-searches">
              <span>Popular:</span>

              <Link href="/specialties/psychiatry">
                Psychiatry
              </Link>

              <Link href="/services/anxiety">
                Anxiety
              </Link>

              <Link href="/services/depression">
                Depression
              </Link>

              <Link href="/services/sleep-medicine">
                Sleep
              </Link>

              <Link href="/services/addiction-psychiatry">
                Addiction
              </Link>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SPECIALTIES
          ===================================================== */}

      <section className="home-section specialties-section">
        <div className="container">

          <div className="section-heading-row">

            <div>
              <span className="eyebrow">
                AREAS OF CARE
              </span>

              <h2>
                Specialist care,
                <br />
                thoughtfully connected.
              </h2>
            </div>

            <p>
              Explore specialist services across mental health,
              neuroscience and related areas of healthcare.
            </p>

          </div>


          <div className="specialty-grid">

            {specialties.map((specialty, index) => (
              <Link
                href={specialty.href}
                className="specialty-card"
                key={specialty.title}
              >

                <div className="specialty-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="specialty-arrow">
                  ↗
                </div>

                <h3>
                  {specialty.title}
                </h3>

                <p>
                  {specialty.description}
                </p>

                <span className="card-link">
                  Learn more
                </span>

              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURED DOCTORS
          ===================================================== */}

      <section className="home-section doctors-section">
        <div className="container">

          <div className="section-heading-row">

            <div>
              <span className="eyebrow">
                OUR SPECIALISTS
              </span>

              <h2>
                Meet the doctors
              </h2>
            </div>

            <Link
              href="/doctors"
              className="text-link"
            >
              View all doctors →
            </Link>

          </div>


          <div className="doctor-grid">

            {doctors.map((doctor, index) => (
              <Link
                href={doctor.href}
                className="doctor-card"
                key={`${doctor.name}-${index}`}
              >

                <div className="doctor-photo-placeholder">
                  <span>
                    {index === 0 ? "BPS" : "MD"}
                  </span>
                </div>

                <div className="doctor-card-body">

                  <span className="doctor-specialty">
                    {doctor.specialty}
                  </span>

                  <h3>
                    {doctor.name}
                  </h3>

                  <p>
                    {doctor.qualification}
                  </p>

                  <p className="doctor-designation">
                    {doctor.designation}
                  </p>

                  <span className="doctor-view">
                    View profile →
                  </span>

                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          THOMSON CLINIC APPROACH
          ===================================================== */}

      <section className="approach-section">
        <div className="container approach-grid">

          <div className="approach-intro">

            <span className="eyebrow">
              THE THOMSON CLINIC APPROACH
            </span>

            <h2>
              Care that looks
              <br />
              beyond the symptom.
            </h2>

            <p>
              Mental health and neuroscience often intersect.
              Our platform is designed to make it easier to find
              the right specialist, understand available care
              and access appropriate clinical support.
            </p>

            <Link
              href="/about"
              className="secondary-button light-button"
            >
              About Thomson Clinic
            </Link>

          </div>


          <div className="approach-points">

            <div className="approach-point">
              <span>01</span>

              <div>
                <h3>
                  Specialist-led
                </h3>

                <p>
                  Connect with clinicians according to their
                  specialty, expertise and clinical interests.
                </p>
              </div>
            </div>


            <div className="approach-point">
              <span>02</span>

              <div>
                <h3>
                  Evidence-informed
                </h3>

                <p>
                  Clinical information is structured to help
                  patients understand conditions and available
                  treatment pathways.
                </p>
              </div>
            </div>


            <div className="approach-point">
              <span>03</span>

              <div>
                <h3>
                  Accessible
                </h3>

                <p>
                  Discover specialists and consultation options
                  through a simple digital healthcare experience.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SERVICES
          ===================================================== */}

      <section className="home-section services-section">
        <div className="container">

          <div className="section-heading-row">

            <div>
              <span className="eyebrow">
                SERVICES
              </span>

              <h2>
                Designed around
                <br />
                your care journey.
              </h2>
            </div>

            <Link
              href="/services"
              className="text-link"
            >
              Explore all services →
            </Link>

          </div>


          <div className="service-list">

            {services.map((service) => (
              <Link
                href={service.href}
                className="service-row"
                key={service.number}
              >

                <span className="service-number">
                  {service.number}
                </span>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <span className="service-arrow">
                  →
                </span>

              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          DOCTOR CTA
          ===================================================== */}

      <section className="doctor-cta-section">
        <div className="container doctor-cta">

          <div>
            <span className="eyebrow">
              FOR HEALTHCARE PROFESSIONALS
            </span>

            <h2>
              Are you a doctor
              <br />
              or specialist?
            </h2>

            <p>
              Join Thomson Clinic and build a professional
              presence for patients looking for specialist care.
            </p>
          </div>

          <Link
            href="/doctor-registration"
            className="primary-button cta-button"
          >
            Join Thomson Clinic
            <span>→</span>
          </Link>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="final-cta-section">
        <div className="container final-cta">

          <span className="eyebrow">
            THOMSON CLINIC
          </span>

          <h2>
            Finding the right
            <br />
            care starts here.
          </h2>

          <p>
            Explore specialists, understand your options and
            take the next step toward appropriate care.
          </p>

          <Link
            href="/doctors"
            className="primary-button"
          >
            Find a Doctor
            <span>→</span>
          </Link>

        </div>
      </section>

    </>
  );
}