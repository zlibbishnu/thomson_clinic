import Link from "next/link";

const enquiryTypes = [
  {
    number: "01",
    title: "Patient enquiries",
    text:
      "Questions about doctors, specialties, consultations or finding the right area of care.",
  },
  {
    number: "02",
    title: "Doctor enquiries",
    text:
      "Interested healthcare professionals can contact us about joining the Thomson Clinic network.",
  },
  {
    number: "03",
    title: "Platform enquiries",
    text:
      "For partnerships, healthcare organisations, services and other professional enquiries.",
  },
];

const faqs = [
  {
    question: "How do I find a doctor?",
    answer:
      "Use the doctor directory to browse specialists by specialty and review individual doctor profiles.",
  },
  {
    question: "Are online consultations available?",
    answer:
      "Online consultation options may be available for selected doctors and services where clinically appropriate.",
  },
  {
    question: "Can doctors join Thomson Clinic?",
    answer:
      "Yes. Healthcare professionals can submit their details through the doctor registration pathway for consideration.",
  },
  {
    question: "Can I contact Thomson Clinic about a partnership?",
    answer:
      "Yes. Use the enquiry form and select the appropriate enquiry type so that your request can be directed accordingly.",
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="container">

          <div className="contact-hero-content">

            <span className="eyebrow">
              CONTACT THOMSON CLINIC
            </span>

            <h1>
              Let's stay
              <span> connected.</span>
            </h1>

            <p>
              Whether you are looking for a specialist, interested
              in joining our network or exploring a professional
              partnership, we are here to help.
            </p>

          </div>

        </div>
      </section>

      {/* ENQUIRY TYPES */}
      <section className="contact-enquiry-section">
        <div className="container">

          <div className="contact-section-heading">

            <div>
              <span className="eyebrow">
                HOW CAN WE HELP?
              </span>

              <h2>
                Choose the type of enquiry.
              </h2>
            </div>

            <p>
              Providing a little context helps us direct your
              enquiry to the appropriate team or service.
            </p>

          </div>

          <div className="contact-enquiry-grid">

            {enquiryTypes.map((item) => (
              <article
                className="contact-enquiry-card"
                key={item.number}
              >

                <span>
                  {item.number}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* CONTACT FORM + DETAILS */}
      <section className="contact-main-section">
        <div className="container">

          <div className="contact-main-grid">

            {/* FORM */}

            <div className="contact-form-card">

              <div className="contact-card-heading">

                <span className="eyebrow">
                  SEND AN ENQUIRY
                </span>

                <h2>
                  How can we help?
                </h2>

                <p>
                  Complete the form and provide the details
                  relevant to your enquiry.
                </p>

              </div>

              <form className="contact-form">

                <div className="contact-form-row">

                  <label>
                    Full name

                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                    />
                  </label>

                  <label>
                    Email address

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                    />
                  </label>

                </div>

                <div className="contact-form-row">

                  <label>
                    Phone number

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91"
                    />
                  </label>

                  <label>
                    Enquiry type

                    <select name="enquiry">
                      <option value="">
                        Select enquiry type
                      </option>

                      <option value="patient">
                        Patient enquiry
                      </option>

                      <option value="doctor">
                        Doctor enquiry
                      </option>

                      <option value="partnership">
                        Partnership
                      </option>

                      <option value="general">
                        General enquiry
                      </option>
                    </select>

                  </label>

                </div>

                <label>
                  Message

                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell us how we can help..."
                  />
                </label>

                <button
                  type="submit"
                  className="button button-primary"
                >
                  Send enquiry
                </button>

                <p className="form-note">
                  Please do not include highly sensitive medical
                  information in this form.
                </p>

              </form>

            </div>

            {/* DETAILS */}

            <aside className="contact-details">

              <div className="contact-detail-block">

                <span className="eyebrow">
                  THOMSON CLINIC
                </span>

                <h3>
                  Mental Health &
                  Neuroscience
                </h3>

                <p>
                  A healthcare platform connecting patients with
                  specialists and healthcare services.
                </p>

              </div>

              <div className="contact-detail-line" />

              <div className="contact-detail-block">

                <span className="contact-detail-label">
                  LOCATION
                </span>

                <strong>
                  Bhubaneswar, Odisha
                </strong>

                <span>
                  India
                </span>

              </div>

              <div className="contact-detail-block">

                <span className="contact-detail-label">
                  CONSULTATION
                </span>

                <strong>
                  Online & In-person
                </strong>

                <span>
                  Availability depends on the specialist.
                </span>

              </div>

              <div className="contact-detail-block">

                <span className="contact-detail-label">
                  DOCTORS
                </span>

                <Link href="/doctor-registration">
                  Join Thomson Clinic →
                </Link>

              </div>

            </aside>

          </div>

        </div>
      </section>

      {/* ONLINE CARE */}
      <section className="contact-online-section">
        <div className="container">

          <div className="contact-online-card">

            <div>

              <span className="eyebrow">
                ONLINE CONSULTATION
              </span>

              <h2>
                Looking for a consultation?
              </h2>

              <p>
                Browse available doctors and explore consultation
                options directly from their profiles.
              </p>

            </div>

            <Link
              href="/doctors"
              className="button button-primary"
            >
              Find a Doctor
            </Link>

          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq-section">
        <div className="container">

          <div className="contact-section-heading">

            <div>
              <span className="eyebrow">
                FAQ
              </span>

              <h2>
                Common questions.
              </h2>
            </div>

          </div>

          <div className="contact-faq-list">

            {faqs.map((faq, index) => (
              <details
                className="contact-faq-item"
                key={faq.question}
              >

                <summary>

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {faq.question}
                  </strong>

                  <i>
                    +
                  </i>

                </summary>

                <div className="faq-answer">
                  <p>
                    {faq.answer}
                  </p>
                </div>

              </details>
            ))}

          </div>

        </div>
      </section>

      {/* EMERGENCY NOTICE */}
      <section className="contact-notice-section">
        <div className="container">

          <div className="contact-notice">

            <div className="notice-mark">
              !
            </div>

            <div>

              <strong>
                For emergencies
              </strong>

              <p>
                Thomson Clinic is not an emergency service. If
                someone is at immediate risk of harm, has a
                life-threatening medical problem or requires urgent
                assistance, contact your local emergency service
                or go to the nearest emergency department.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="contact-final-section">
        <div className="container">

          <div className="contact-final-content">

            <span className="eyebrow">
              THOMSON CLINIC
            </span>

            <h2>
              Find the right
              place to start.
            </h2>

            <p>
              Explore doctors and specialties, or get in touch
              with Thomson Clinic for further information.
            </p>

            <div className="contact-final-actions">

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
                Explore Specialties
              </Link>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}