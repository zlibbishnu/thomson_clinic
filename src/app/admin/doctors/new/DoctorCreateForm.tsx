"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../../admin.module.css";

type FormState = {
  name: string;
  slug: string;
  qualification: string;
  designation: string;
  specialty: string;
  subSpecialty: string;
  registrationNumber: string;
  experienceYears: string;
  languages: string;
  areasOfExpertise: string;
  consultationMode: string;
  consultationFee: string;
  location: string;
  availability: string;
  phone: string;
  email: string;
  website: string;
  photoUrl: string;
  bio: string;
  additionalInformation: string;
  isActive: boolean;
};

const initialForm: FormState = {
  name: "",
  slug: "",
  qualification: "",
  designation: "",
  specialty: "",
  subSpecialty: "",
  registrationNumber: "",
  experienceYears: "",
  languages: "",
  areasOfExpertise: "",
  consultationMode: "",
  consultationFee: "",
  location: "",
  availability: "",
  phone: "",
  email: "",
  website: "",
  photoUrl: "",
  bio: "",
  additionalInformation: "",
  isActive: true,
};

export default function DoctorCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          experienceYears: form.experienceYears === ""
            ? null
            : Number(form.experienceYears),
          consultationFee: form.consultationFee === ""
            ? null
            : Number(form.consultationFee),
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to create the Doctor.");
      }

      setSuccessMessage("Doctor profile created successfully.");
      window.setTimeout(() => {
        router.push(`/admin/doctors/${result.doctor.id}`);
      }, 350);
    } catch (error) {
      console.error("Doctor creation failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create the Doctor. Please try again."
      );
      setIsSaving(false);
    }
  }

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <section className={styles.editSection}>
        <span className={styles.eyebrow}>PROFESSIONAL DETAILS</span>
        <h2 className={styles.detailPanelTitle}>Doctor profile</h2>
        <div className={styles.editGrid}>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-name">Name</label>
            <input id="new-doctor-name" className={styles.editInput} value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-slug">Slug</label>
            <input id="new-doctor-slug" className={styles.editInput} value={form.slug} onChange={(event) => updateField("slug", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-qualification">Qualification</label>
            <input id="new-doctor-qualification" className={styles.editInput} value={form.qualification} onChange={(event) => updateField("qualification", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-designation">Designation</label>
            <input id="new-doctor-designation" className={styles.editInput} value={form.designation} onChange={(event) => updateField("designation", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-specialty">Specialty</label>
            <input id="new-doctor-specialty" className={styles.editInput} value={form.specialty} onChange={(event) => updateField("specialty", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-sub-specialty">Sub-specialty</label>
            <input id="new-doctor-sub-specialty" className={styles.editInput} value={form.subSpecialty} onChange={(event) => updateField("subSpecialty", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-registration-number">Registration number</label>
            <input id="new-doctor-registration-number" className={styles.editInput} value={form.registrationNumber} onChange={(event) => updateField("registrationNumber", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-experience">Years of experience</label>
            <input id="new-doctor-experience" className={styles.editInput} type="number" min="0" value={form.experienceYears} onChange={(event) => updateField("experienceYears", event.target.value)} />
          </div>
        </div>
      </section>

      <section className={styles.editSection}>
        <span className={styles.eyebrow}>PRACTICE DETAILS</span>
        <h2 className={styles.detailPanelTitle}>Consultation and availability</h2>
        <div className={styles.editGrid}>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-languages">Languages</label>
            <input id="new-doctor-languages" className={styles.editInput} value={form.languages} onChange={(event) => updateField("languages", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-expertise">Areas of expertise</label>
            <input id="new-doctor-expertise" className={styles.editInput} value={form.areasOfExpertise} onChange={(event) => updateField("areasOfExpertise", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-consultation-mode">Consultation mode</label>
            <input id="new-doctor-consultation-mode" className={styles.editInput} value={form.consultationMode} onChange={(event) => updateField("consultationMode", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-fee">Consultation fee</label>
            <input id="new-doctor-fee" className={styles.editInput} type="number" min="0" value={form.consultationFee} onChange={(event) => updateField("consultationFee", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-location">Location</label>
            <input id="new-doctor-location" className={styles.editInput} value={form.location} onChange={(event) => updateField("location", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-availability">Availability</label>
            <input id="new-doctor-availability" className={styles.editInput} value={form.availability} onChange={(event) => updateField("availability", event.target.value)} />
          </div>
        </div>
      </section>

      <section className={styles.editSection}>
        <span className={styles.eyebrow}>CONTACT & PROFILE</span>
        <h2 className={styles.detailPanelTitle}>Contact information</h2>
        <div className={styles.editGrid}>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-email">Email</label>
            <input id="new-doctor-email" className={styles.editInput} type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-phone">Phone</label>
            <input id="new-doctor-phone" className={styles.editInput} type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-website">Website</label>
            <input id="new-doctor-website" className={styles.editInput} type="url" value={form.website} onChange={(event) => updateField("website", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="new-doctor-photo">Photo URL</label>
            <input id="new-doctor-photo" className={styles.editInput} type="url" value={form.photoUrl} onChange={(event) => updateField("photoUrl", event.target.value)} />
          </div>
          <div className={`${styles.editField} ${styles.editFull}`}>
            <label className={styles.editLabel} htmlFor="new-doctor-bio">Bio</label>
            <textarea id="new-doctor-bio" className={styles.editTextarea} rows={6} value={form.bio} onChange={(event) => updateField("bio", event.target.value)} />
          </div>
          <div className={`${styles.editField} ${styles.editFull}`}>
            <label className={styles.editLabel} htmlFor="new-doctor-additional-information">Additional information</label>
            <textarea id="new-doctor-additional-information" className={styles.editTextarea} rows={5} value={form.additionalInformation} onChange={(event) => updateField("additionalInformation", event.target.value)} />
          </div>
        </div>
      </section>

      <section className={styles.editSection}>
        <span className={styles.eyebrow}>PUBLIC VISIBILITY</span>
        <label className={styles.editToggle} htmlFor="new-doctor-active">
          <input id="new-doctor-active" type="checkbox" checked={form.isActive} onChange={(event) => updateField("isActive", event.target.checked)} />
          <span>
            <strong>Profile active</strong>
            <small>Active profiles are visible in the public doctor directory.</small>
          </span>
        </label>
      </section>

      <div className={styles.editActions}>
        <button type="submit" className={styles.saveButton} disabled={isSaving}>
          {isSaving ? "Creating..." : "Create Doctor"}
        </button>
        <button type="button" className={styles.cancelButton} onClick={() => router.push("/admin/doctors")} disabled={isSaving}>
          Cancel
        </button>
        {successMessage && <p className={styles.feedbackSuccess} role="status">{successMessage}</p>}
        {errorMessage && <p className={styles.feedbackError} role="alert">{errorMessage}</p>}
      </div>
    </form>
  );
}
