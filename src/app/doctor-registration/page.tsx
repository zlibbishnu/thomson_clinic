"use client";

import { useState } from "react";
import Link from "next/link";

export default function DoctorRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/doctor-registration", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error ?? "Unable to submit your registration application."
        );
      }

      setSubmitted(true);
      form.reset();

      requestAnimationFrame(() => {
        document
          .getElementById("registration-success")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    } catch (submissionError) {
      console.error("Doctor registration submission failed:", submissionError);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your registration application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="doctor-registration-page">

      {/* HERO */}
      <section className="doctor-registration-hero">
        <div className="container doctor-registration-hero-inner">

          <div className="doctor-registration-hero-content">
            <span className="eyebrow">FOR DOCTORS</span>

            <h1>
              Join Thomson Clinic
            </h1>

            <p>
              Build your professional presence on a healthcare platform
              focused on mental health, neuroscience and multispecialty care.
            </p>

            <div className="doctor-registration-hero-points">
              <span>Professional profile</span>
              <span>Online consultation</span>
              <span>Patient discovery</span>
            </div>
          </div>

          <div className="doctor-registration-hero-card">
            <div className="hero-card-number">01</div>

            <h3>
              Start your application
            </h3>

            <p>
              Share your professional details and practice information.
              Your profile can be reviewed before publication.
            </p>

            <a href="#registration-form" className="primary-button">
              Register as a Doctor
            </a>
          </div>

        </div>
      </section>


      {/* INTRO */}
      <section className="doctor-registration-intro">
        <div className="container registration-intro-grid">

          <div>
            <span className="eyebrow">THOMSON CLINIC</span>

            <h2>
              A professional digital presence for doctors
            </h2>
          </div>

          <div>
            <p>
              Thomson Clinic is being developed as a specialist-led
              healthcare platform connecting patients with doctors across
              mental health, neuroscience and other medical specialties.
            </p>

            <p>
              Doctor registration will allow you to create a structured
              professional profile that can be used for patient discovery,
              consultation and future platform services.
            </p>
          </div>

        </div>
      </section>


      {/* APPLICATION FORM */}
      <section
        className="doctor-registration-form-section"
        id="registration-form"
      >
        <div className="container registration-form-layout">

          {/* SIDEBAR */}
          <aside className="registration-sidebar">

            <div className="registration-sidebar-card">
              <span className="eyebrow">
                APPLICATION PROCESS
              </span>

              <div className="registration-step">
                <span className="step-number">01</span>

                <div>
                  <h4>Submit details</h4>
                  <p>
                    Provide your professional and practice information.
                  </p>
                </div>
              </div>

              <div className="registration-step">
                <span className="step-number">02</span>

                <div>
                  <h4>Application review</h4>
                  <p>
                    Your submitted information can be reviewed by the
                    Thomson Clinic team.
                  </p>
                </div>
              </div>

              <div className="registration-step">
                <span className="step-number">03</span>

                <div>
                  <h4>Profile verification</h4>
                  <p>
                    Professional information can be checked before
                    profile publication.
                  </p>
                </div>
              </div>

              <div className="registration-step">
                <span className="step-number">04</span>

                <div>
                  <h4>Profile published</h4>
                  <p>
                    Approved profiles can become discoverable on the
                    platform.
                  </p>
                </div>
              </div>

            </div>

            <div className="registration-sidebar-note">
              <strong>Already have a question?</strong>

              <p>
                Contact Thomson Clinic if you would like to discuss
                professional registration or collaboration.
              </p>

              <Link href="/contact">
                Contact Thomson Clinic →
              </Link>
            </div>

          </aside>


          {/* FORM */}
          <div className="registration-form-wrapper">

            <div className="registration-form-heading">
              <span className="eyebrow">
                DOCTOR REGISTRATION
              </span>

              <h2>
                Professional information
              </h2>

              <p>
                Please provide accurate information about your professional
                background and current practice.
              </p>
            </div>

            {submitted && (
              <div
                className="registration-demo-message"
                id="registration-success"
              >
                <strong>Registration application submitted.</strong>

                <span>
                  Your registration application has been submitted successfully.
                  Our team will review your professional information before any
                  profile is published.
                </span>
              </div>
            )}

            {error && (
              <div className="registration-demo-message" role="alert">
                <strong>Submission could not be completed.</strong>

                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* PROFESSIONAL DETAILS */}
              <div className="form-section-block">

                <div className="form-section-title">
                  <span>01</span>

                  <div>
                    <h3>Professional details</h3>
                    <p>
                      Your medical and professional credentials
                    </p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-field full-width">
                    <label htmlFor="fullName">
                      Full name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Dr. Full Name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="qualification">
                      Qualification *
                    </label>

                    <input
                      id="qualification"
                      name="qualification"
                      type="text"
                      placeholder="e.g. MBBS, MD, DNB"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="designation">
                      Designation *
                    </label>

                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      placeholder="e.g. Consultant Psychiatrist"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="specialty">
                      Specialty *
                    </label>

                    <select
                      id="specialty"
                      name="specialty"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select specialty
                      </option>

                      <option>Psychiatry</option>
                      <option>Psychology</option>
                      <option>Neurology</option>
                      <option>Neurosurgery</option>
                      <option>Neuropsychiatry</option>
                      <option>Sleep Medicine</option>
                      <option>Addiction Medicine</option>
                      <option>Child & Adolescent Mental Health</option>
                      <option>Geriatric Medicine</option>
                      <option>Internal Medicine</option>
                      <option>Other Specialty</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subSpecialty">
                      Sub-specialty
                    </label>

                    <input
                      id="subSpecialty"
                      name="subSpecialty"
                      type="text"
                      placeholder="e.g. Addiction Psychiatry"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="registrationNumber">
                      Medical registration number *
                    </label>

                    <input
                      id="registrationNumber"
                      name="registrationNumber"
                      type="text"
                      placeholder="Registration number"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="experience">
                      Years of experience
                    </label>

                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      placeholder="e.g. 8"
                    />
                  </div>

                </div>

              </div>


              {/* PRACTICE DETAILS */}
              <div className="form-section-block">

                <div className="form-section-title">
                  <span>02</span>

                  <div>
                    <h3>Practice details</h3>
                    <p>
                      Information patients may use to understand your
                      practice
                    </p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-field full-width">
                    <label htmlFor="expertise">
                      Areas of expertise
                    </label>

                    <input
                      id="expertise"
                      name="expertise"
                      type="text"
                      placeholder="e.g. Depression, Anxiety, Sleep Disorders"
                    />

                    <small>
                      Separate multiple areas with commas.
                    </small>
                  </div>

                  <div className="form-field">
                    <label htmlFor="languages">
                      Languages spoken
                    </label>

                    <input
                      id="languages"
                      name="languages"
                      type="text"
                      placeholder="e.g. English, Hindi, Odia"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="consultationMode">
                      Consultation mode
                    </label>

                    <select
                      id="consultationMode"
                      name="consultationMode"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select option
                      </option>

                      <option>Online</option>
                      <option>In-person</option>
                      <option>Online & In-person</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="consultationFee">
                      Consultation fee
                    </label>

                    <div className="input-prefix">
                      <span>₹</span>

                      <input
                        id="consultationFee"
                        name="consultationFee"
                        type="number"
                        min="0"
                        placeholder="e.g. 1000"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="location">
                      Practice location
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="City, State"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label htmlFor="availability">
                      Availability
                    </label>

                    <input
                      id="availability"
                      name="availability"
                      type="text"
                      placeholder="e.g. Mon–Sat, 5 PM–8 PM"
                    />
                  </div>

                </div>

              </div>


              {/* CONTACT DETAILS */}
              <div className="form-section-block">

                <div className="form-section-title">
                  <span>03</span>

                  <div>
                    <h3>Contact & profile</h3>
                    <p>
                      Professional contact and profile information
                    </p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-field">
                    <label htmlFor="email">
                      Professional email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="doctor@example.com"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label htmlFor="website">
                      Professional website / profile URL
                    </label>

                    <input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label htmlFor="photoUrl">
                      Profile photo URL
                    </label>

                    <input
                      id="photoUrl"
                      name="photoUrl"
                      type="url"
                      placeholder="https://..."
                    />

                    <small>
                      A media upload system can be added when the backend
                      and media storage are connected.
                    </small>
                  </div>

                </div>

              </div>


              {/* BIO */}
              <div className="form-section-block">

                <div className="form-section-title">
                  <span>04</span>

                  <div>
                    <h3>Professional profile</h3>
                    <p>
                      Tell patients about your clinical background
                    </p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="form-field full-width">
                    <label htmlFor="bio">
                      Professional bio *
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      rows={7}
                      placeholder="Write a concise professional biography..."
                      required
                    />

                    <small>
                      Suggested: qualifications, clinical experience,
                      areas of practice and professional interests.
                    </small>
                  </div>

                  <div className="form-field full-width">
                    <label htmlFor="additionalInfo">
                      Additional information
                    </label>

                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={5}
                      placeholder="Anything else you would like the Thomson Clinic team to know..."
                    />
                  </div>

                </div>

              </div>


              {/* DECLARATION */}
              <div className="registration-declaration">

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    required
                  />

                  <span>
                    I confirm that the professional information provided
                    in this application is accurate to the best of my
                    knowledge and I consent to Thomson Clinic reviewing
                    this application.
                  </span>
                </label>

              </div>


              {/* SUBMIT */}
              <div className="registration-submit">

                <button
                  type="submit"
                  className="primary-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>

                <p>
                  Your application will be submitted to the Thomson Clinic
                  team for professional review.
                </p>

              </div>

            </form>

          </div>

        </div>
      </section>


      {/* BOTTOM CTA */}
      <section className="doctor-registration-final">
        <div className="container">

          <div className="doctor-registration-final-inner">

            <div>
              <span className="eyebrow">
                PROFESSIONAL COLLABORATION
              </span>

              <h2>
                Interested in working with Thomson Clinic?
              </h2>

              <p>
                We are building a connected healthcare platform for
                specialists and patients.
              </p>
            </div>

            <Link
              href="/contact"
              className="secondary-button"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}