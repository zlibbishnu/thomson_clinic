import Link from "next/link";

const serviceCategories = [
  {
    number: "01",
    title: "Mental Health",
    description:
      "Assessment, diagnosis and treatment across a broad range of psychiatric and psychological conditions.",
    href: "/services/mental-health",
    items: [
      "Depression",
      "Anxiety disorders",
      "Bipolar disorder",
      "Psychotic disorders",
      "Stress-related conditions",
    ],
  },
  {
    number: "02",
    title: "Neuroscience",
    description:
      "Clinical services focused on the relationship between the brain, cognition, behaviour and mental health.",
    href: "/services/neuroscience",
    items: [
      "Neuropsychiatry",
      "Cognitive concerns",
      "Brain & behaviour",
      "Memory concerns",
      "Neurological symptoms",
    ],
  },
  {
    number: "03",
    title: "Online Consultation",
    description:
      "Connect with appropriate specialists through convenient online consultations.",
    href: "/services/online-consultation",
    items: [
      "Psychiatry",
      "Psychology",
      "Neurology",
      "Follow-up care",
      "Specialist opinions",
    ],
  },
];

const clinicalServices = [
  {
    title: "Psychiatric Assessment",
    description:
      "Structured clinical evaluation of symptoms, history, functioning and treatment needs.",
    href: "/services/psychiatric-assessment",
  },
  {
    title: "Psychological Assessment",
    description:
      "Assessment of cognition, behaviour, emotions and psychological functioning.",
    href: "/services/psychological-assessment",
  },
  {
    title: "Medication Management",
    description:
      "Specialist review and optimization of pharmacological treatment when clinically appropriate.",
    href: "/services/medication-management",
  },
  {
    title: "Psychotherapy",
    description:
      "Evidence-informed psychological interventions delivered according to individual clinical needs.",
    href: "/services/psychotherapy",
  },
  {
    title: "Sleep Medicine",
    description:
      "Assessment and management of insomnia and other sleep-related concerns.",
    href: "/services/sleep-medicine",
  },
  {
    title: "Addiction Psychiatry",
    description:
      "Assessment and treatment for alcohol, tobacco, drug and behavioural addictions.",
    href: "/services/addiction-psychiatry",
  },
];

export default function ServicesPage() {
  return (
    <div className="services-page">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="services-hero">
        <div className="container">

          <span className="eyebrow">
            THOMSON CLINIC
          </span>

          <h1>
            Services designed
            <br />
            around your care.
          </h1>

          <p>
            Explore specialist healthcare services across
            mental health, neuroscience and related clinical
            areas.
          </p>

        </div>
      </section>


      {/* =====================================================
          CORE SERVICE CATEGORIES
          ===================================================== */}

      <section className="services-category-section">
        <div className="container">

          <div className="services-section-intro">

            <div>
              <span className="eyebrow">
                CORE SERVICES
              </span>

              <h2>
                Start with the
                <br />
                area you need.
              </h2>
            </div>

            <p>
              Browse our principal areas of care or explore
              individual clinical services below.
            </p>

          </div>


          <div className="service-category-grid">

            {serviceCategories.map((category) => (
              <Link
                href={category.href}
                className="service-category-card"
                key={category.number}
              >

                <div className="service-category-top">
                  <span>
                    {category.number}
                  </span>

                  <strong>
                    ↗
                  </strong>
                </div>

                <h3>
                  {category.title}
                </h3>

                <p>
                  {category.description}
                </p>

                <ul>
                  {category.items.map((item) => (
                    <li key={item}>
                      <span>—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="service-category-link">
                  Explore →
                </span>

              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          CLINICAL SERVICES
          ===================================================== */}

      <section className="clinical-services-section">
        <div className="container">

          <div className="section-heading-row">

            <div>
              <span className="eyebrow">
                CLINICAL SERVICES
              </span>

              <h2>
                Specialist support
                <br />
                for different needs.
              </h2>
            </div>

            <p>
              Services may vary by specialist, location and
              consultation mode. Individual profiles provide
              the most current information.
            </p>

          </div>


          <div className="clinical-service-grid">

            {clinicalServices.map((service, index) => (
              <Link
                href={service.href}
                className="clinical-service-card"
                key={service.title}
              >

                <span className="clinical-service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <span className="clinical-service-arrow">
                  →
                </span>

              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          FIND A SPECIALIST
          ===================================================== */}

      <section className="services-doctor-section">
        <div className="container services-doctor-cta">

          <div>

            <span className="eyebrow">
              FIND A SPECIALIST
            </span>

            <h2>
              Not sure where
              <br />
              to start?
            </h2>

            <p>
              Browse our specialist directory to find a doctor
              according to specialty, location and consultation
              options.
            </p>

          </div>

          <Link
            href="/doctors"
            className="primary-button"
          >
            Find a Doctor
            <span>→</span>
          </Link>

        </div>
      </section>


      {/* =====================================================
          ONLINE CONSULTATION
          ===================================================== */}

      <section className="online-service-section">
        <div className="container online-service-grid">

          <div>
            <span className="eyebrow">
              ONLINE CARE
            </span>

            <h2>
              Specialist care,
              <br />
              wherever you are.
            </h2>

            <p>
              Online consultation can make specialist care more
              accessible when an in-person visit is not required.
              Availability depends on the individual specialist
              and clinical situation.
            </p>

            <Link
              href="/services/online-consultation"
              className="secondary-button"
            >
              Learn about online consultation
            </Link>
          </div>


          <div className="online-service-panel">

            <div>
              <span>01</span>

              <strong>
                Choose a specialist
              </strong>

              <p>
                Browse doctors by specialty and area of
                expertise.
              </p>
            </div>

            <div>
              <span>02</span>

              <strong>
                Select consultation
              </strong>

              <p>
                Review available online or in-person options.
              </p>
            </div>

            <div>
              <span>03</span>

              <strong>
                Continue your care
              </strong>

              <p>
                Follow-up and ongoing care can be coordinated
                according to clinical need.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="services-final-cta">
        <div className="container">

          <span className="eyebrow">
            THOMSON CLINIC
          </span>

          <h2>
            Find the care
            <br />
            that fits your needs.
          </h2>

          <Link
            href="/doctors"
            className="primary-button"
          >
            Explore Specialists
            <span>→</span>
          </Link>

        </div>
      </section>

    </div>
  );
}