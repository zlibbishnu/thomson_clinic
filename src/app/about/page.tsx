import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Specialist-led",
    text:
      "Connect with qualified healthcare professionals across mental health, neuroscience and other areas of medicine.",
  },
  {
    number: "02",
    title: "Accessible",
    text:
      "Make specialist care easier to discover and access through online and in-person consultation options.",
  },
  {
    number: "03",
    title: "Connected",
    text:
      "Bring doctors, patients and healthcare services together through one evolving digital platform.",
  },
  {
    number: "04",
    title: "Patient-centred",
    text:
      "Present clear information and practical choices so patients can make informed decisions about their care.",
  },
];

const journey = [
  {
    number: "01",
    title: "Discover",
    text:
      "Search specialties, conditions, services and doctors based on your healthcare needs.",
  },
  {
    number: "02",
    title: "Choose",
    text:
      "Review specialist profiles, qualifications, expertise and available consultation options.",
  },
  {
    number: "03",
    title: "Consult",
    text:
      "Connect with the appropriate healthcare professional through an available consultation pathway.",
  },
  {
    number: "04",
    title: "Continue",
    text:
      "Build continuity of care through follow-up consultations and appropriate specialist services.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="container">

          <div className="about-hero-content">

            <span className="eyebrow">
              ABOUT THOMSON CLINIC
            </span>

            <h1>
              Healthcare,
              <span> connected.</span>
            </h1>

            <p>
              Thomson Clinic is a healthcare platform focused on
              making specialist care easier to discover, understand
              and access.
            </p>

            <div className="about-hero-actions">

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

          <div className="about-hero-card">

            <div className="about-mark">
              T
            </div>

            <div>
              <strong>
                THOMSON CLINIC
              </strong>

              <span>
                Mental Health & Neuroscience
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="about-intro-section">
        <div className="container">

          <div className="about-intro-grid">

            <div>

              <span className="eyebrow">
                OUR PLATFORM
              </span>

              <h2>
                Making specialist
                healthcare easier to navigate.
              </h2>

            </div>

            <div className="about-intro-copy">

              <p>
                Finding the right healthcare professional can be
                difficult. Information may be spread across different
                websites, directories and communication channels.
              </p>

              <p>
                Thomson Clinic is being developed as a unified
                platform where people can discover doctors,
                specialties and healthcare services in a clear,
                structured environment.
              </p>

              <p>
                Our initial focus is mental health and neuroscience,
                while the platform is designed to support a broader
                multispecialty healthcare network.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* FOCUS */}
      <section className="about-focus-section">
        <div className="container">

          <div className="about-section-heading">

            <div>
              <span className="eyebrow">
                OUR FOCUS
              </span>

              <h2>
                Built around specialist care.
              </h2>
            </div>

            <p>
              Thomson Clinic brings together clinical expertise,
              accessible digital services and a structured approach
              to discovering healthcare.
            </p>

          </div>

          <div className="about-focus-grid">

            <article className="about-focus-card about-focus-primary">

              <span className="focus-number">
                01
              </span>

              <h3>
                Mental Health
              </h3>

              <p>
                Psychiatry, psychology, addiction psychiatry,
                child and adolescent mental health, geriatric
                mental health and related areas of care.
              </p>

              <Link
                href="/specialties/psychiatry"
              >
                Explore mental health →
              </Link>

            </article>

            <article className="about-focus-card">

              <span className="focus-number">
                02
              </span>

              <h3>
                Neuroscience
              </h3>

              <p>
                Neurology, neuropsychiatry, cognitive concerns,
                sleep-related conditions and other brain and
                nervous system-related areas.
              </p>

              <Link
                href="/specialties/neurology"
              >
                Explore neuroscience →
              </Link>

            </article>

            <article className="about-focus-card">

              <span className="focus-number">
                03
              </span>

              <h3>
                Multispecialty Care
              </h3>

              <p>
                The platform is designed to expand beyond its
                initial focus and connect patients with specialists
                across multiple areas of healthcare.
              </p>

              <Link href="/doctors">
                Browse doctors →
              </Link>

            </article>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="about-journey-section">
        <div className="container">

          <div className="about-journey-header">

            <span className="eyebrow">
              HOW IT WORKS
            </span>

            <h2>
              From finding care
              to continuing care.
            </h2>

            <p>
              The platform is designed around a simple healthcare
              journey.
            </p>

          </div>

          <div className="about-journey-grid">

            {journey.map((item) => (
              <div
                className="about-journey-item"
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

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="about-principles-section">
        <div className="container">

          <div className="about-section-heading">

            <div>
              <span className="eyebrow">
                WHAT GUIDES US
              </span>

              <h2>
                Principles behind the platform.
              </h2>
            </div>

            <p>
              These principles shape how Thomson Clinic is being
              designed and how information is presented to patients
              and healthcare professionals.
            </p>

          </div>

          <div className="about-principles-grid">

            {principles.map((principle) => (
              <article
                className="about-principle-card"
                key={principle.number}
              >

                <span className="principle-number">
                  {principle.number}
                </span>

                <h3>
                  {principle.title}
                </h3>

                <p>
                  {principle.text}
                </p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* DIGITAL CARE */}
      <section className="about-digital-section">
        <div className="container">

          <div className="about-digital-grid">

            <div className="about-digital-content">

              <span className="eyebrow">
                DIGITAL HEALTHCARE
              </span>

              <h2>
                Designed for modern
                healthcare access.
              </h2>

              <p>
                Digital healthcare can reduce the friction involved
                in finding and accessing specialist care. Thomson
                Clinic is being developed with this principle at its
                core.
              </p>

              <p>
                Online consultations can complement in-person care
                where clinically appropriate, while structured
                doctor and service information helps patients
                understand their options before making contact.
              </p>

              <Link
                href="/services/online-consultation"
                className="text-link"
              >
                Explore online consultation →
              </Link>

            </div>

            <div className="about-digital-panel">

              <div className="digital-panel-top">
                <span>
                  THOMSON CLINIC
                </span>

                <span>
                  DIGITAL CARE
                </span>
              </div>

              <div className="digital-panel-line" />

              <div className="digital-panel-stat">

                <strong>
                  Discover
                </strong>

                <span>
                  Doctors • Services • Specialties
                </span>

              </div>

              <div className="digital-panel-line" />

              <div className="digital-panel-stat">

                <strong>
                  Connect
                </strong>

                <span>
                  Online • In-person • Follow-up
                </span>

              </div>

              <div className="digital-panel-line" />

              <div className="digital-panel-stat">

                <strong>
                  Continue
                </strong>

                <span>
                  Ongoing specialist care
                </span>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOR DOCTORS */}
      <section className="about-doctors-section">
        <div className="container">

          <div className="about-doctors-card">

            <div className="about-doctors-content">

              <span className="eyebrow">
                FOR HEALTHCARE PROFESSIONALS
              </span>

              <h2>
                A digital home
                for specialists.
              </h2>

              <p>
                Thomson Clinic is being developed to give doctors
                a structured professional presence while helping
                patients discover relevant specialists and services.
              </p>

              <Link
                href="/doctor-registration"
                className="button button-primary"
              >
                Join as Doctor
              </Link>

            </div>

            <div className="about-doctors-side">

              <div>
                <span>01</span>
                <strong>Professional profile</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Specialty visibility</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Patient discovery</strong>
              </div>

              <div>
                <span>04</span>
                <strong>Digital consultations</strong>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* VISION */}
      <section className="about-vision-section">
        <div className="container">

          <div className="about-vision-content">

            <span className="eyebrow">
              THE VISION
            </span>

            <h2>
              Building a connected
              healthcare ecosystem.
            </h2>

            <p>
              Thomson Clinic is being built as an evolving platform
              that can connect patients, specialists and healthcare
              services through a common digital infrastructure.
            </p>

            <p>
              The long-term direction is to make specialist
              healthcare more discoverable, more connected and
              easier to access across locations and disciplines.
            </p>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="about-final-cta">
        <div className="container">

          <div className="about-final-content">

            <span className="eyebrow">
              THOMSON CLINIC
            </span>

            <h2>
              Find the care
              you are looking for.
            </h2>

            <p>
              Explore specialists, services and areas of care
              across the Thomson Clinic platform.
            </p>

            <div className="about-final-actions">

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

    </div>
  );
}