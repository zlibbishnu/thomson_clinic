"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../../admin.module.css";

type DoctorRecord = {
  id: number;
  name: string;
  slug: string;
  qualification: string;
  designation: string;
  specialty: string;
  subSpecialty: string | null;
  registrationNumber: string | null;
  experienceYears: number | null;
  languages: string | null;
  areasOfExpertise: string | null;
  consultationMode: string | null;
  consultationFee: number | null;
  location: string | null;
  availability: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  photoUrl: string | null;
  bio: string | null;
  additionalInformation: string | null;
  isActive: boolean;
};

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

function toFormState(doctor: DoctorRecord): FormState {
  return {
    name: doctor.name,
    slug: doctor.slug,
    qualification: doctor.qualification,
    designation: doctor.designation,
    specialty: doctor.specialty,
    subSpecialty: doctor.subSpecialty ?? "",
    registrationNumber: doctor.registrationNumber ?? "",
    experienceYears: doctor.experienceYears?.toString() ?? "",
    languages: doctor.languages ?? "",
    areasOfExpertise: doctor.areasOfExpertise ?? "",
    consultationMode: doctor.consultationMode ?? "",
    consultationFee: doctor.consultationFee?.toString() ?? "",
    location: doctor.location ?? "",
    availability: doctor.availability ?? "",
    phone: doctor.phone ?? "",
    email: doctor.email ?? "",
    website: doctor.website ?? "",
    photoUrl: doctor.photoUrl ?? "",
    bio: doctor.bio ?? "",
    additionalInformation: doctor.additionalInformation ?? "",
    isActive: doctor.isActive,
  };
}

export default function DoctorEditForm({
  initialDoctor,
}: {
  initialDoctor: DoctorRecord;
}) {
  const router = useRouter();
  const [form, setForm] = useState(() => toFormState(initialDoctor));
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
      const response = await fetch(`/api/admin/doctors/${initialDoctor.id}`, {
        method: "PATCH",
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
        throw new Error(result?.error ?? "Unable to save Doctor changes.");
      }

      setForm(toFormState(result.doctor));
      setSuccessMessage("Doctor profile changes saved successfully.");
      router.refresh();
    } catch (error) {
      console.error("Doctor profile save failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save Doctor changes. Please try again."
      );
    } finally {
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
            <label className={styles.editLabel} htmlFor="doctor-name">Name</label>
            <input id="doctor-name" className={styles.editInput} value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-slug">Slug</label>
            <input id="doctor-slug" className={styles.editInput} value={form.slug} onChange={(event) => updateField("slug", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-qualification">Qualification</label>
            <input id="doctor-qualification" className={styles.editInput} value={form.qualification} onChange={(event) => updateField("qualification", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-designation">Designation</label>
            <input id="doctor-designation" className={styles.editInput} value={form.designation} onChange={(event) => updateField("designation", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-specialty">Specialty</label>
            <input id="doctor-specialty" className={styles.editInput} value={form.specialty} onChange={(event) => updateField("specialty", event.target.value)} required />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-sub-specialty">Sub-specialty</label>
            <input id="doctor-sub-specialty" className={styles.editInput} value={form.subSpecialty} onChange={(event) => updateField("subSpecialty", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-registration-number">Registration number</label>
            <input id="doctor-registration-number" className={styles.editInput} value={form.registrationNumber} onChange={(event) => updateField("registrationNumber", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-experience">Years of experience</label>
            <input id="doctor-experience" className={styles.editInput} type="number" min="0" value={form.experienceYears} onChange={(event) => updateField("experienceYears", event.target.value)} />
          </div>
        </div>
      </section>

      <section className={styles.editSection}>
        <span className={styles.eyebrow}>PRACTICE DETAILS</span>
        <h2 className={styles.detailPanelTitle}>Consultation and availability</h2>

        <div className={styles.editGrid}>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-languages">Languages</label>
            <input id="doctor-languages" className={styles.editInput} value={form.languages} onChange={(event) => updateField("languages", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-expertise">Areas of expertise</label>
            <input id="doctor-expertise" className={styles.editInput} value={form.areasOfExpertise} onChange={(event) => updateField("areasOfExpertise", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-consultation-mode">Consultation mode</label>
            <input id="doctor-consultation-mode" className={styles.editInput} value={form.consultationMode} onChange={(event) => updateField("consultationMode", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-fee">Consultation fee</label>
            <input id="doctor-fee" className={styles.editInput} type="number" min="0" value={form.consultationFee} onChange={(event) => updateField("consultationFee", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-location">Location</label>
            <input id="doctor-location" className={styles.editInput} value={form.location} onChange={(event) => updateField("location", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-availability">Availability</label>
            <input id="doctor-availability" className={styles.editInput} value={form.availability} onChange={(event) => updateField("availability", event.target.value)} />
          </div>
        </div>
      </section>

      <section className={styles.editSection}>
        <span className={styles.eyebrow}>CONTACT & PROFILE</span>
        <h2 className={styles.detailPanelTitle}>Contact information</h2>

        <div className={styles.editGrid}>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-email">Email</label>
            <input id="doctor-email" className={styles.editInput} type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-phone">Phone</label>
            <input id="doctor-phone" className={styles.editInput} type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-website">Website</label>
            <input id="doctor-website" className={styles.editInput} type="url" value={form.website} onChange={(event) => updateField("website", event.target.value)} />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor="doctor-photo">Photo URL</label>
            <input id="doctor-photo" className={styles.editInput} type="url" value={form.photoUrl} onChange={(event) => updateField("photoUrl", event.target.value)} />
          </div>
          <div className={`${styles.editField} ${styles.editFull}`}>
            <label className={styles.editLabel} htmlFor="doctor-bio">Bio</label>
            <textarea id="doctor-bio" className={styles.editTextarea} rows={6} value={form.bio} onChange={(event) => updateField("bio", event.target.value)} />
          </div>
          <div className={`${styles.editField} ${styles.editFull}`}>
            <label className={styles.editLabel} htmlFor="doctor-additional-information">Additional information</label>
            <textarea id="doctor-additional-information" className={styles.editTextarea} rows={5} value={form.additionalInformation} onChange={(event) => updateField("additionalInformation", event.target.value)} />
          </div>
        </div>
      </section>

      <section className={styles.editSection}>
        <span className={styles.eyebrow}>PUBLIC VISIBILITY</span>
        <label className={styles.editToggle} htmlFor="doctor-active">
          <input
            id="doctor-active"
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => updateField("isActive", event.target.checked)}
          />
          <span>
            <strong>Profile active</strong>
            <small>Active profiles are visible in the public doctor directory.</small>
          </span>
        </label>
      </section>

      <div className={styles.editActions}>
        <button type="submit" className={styles.saveButton} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        {successMessage && <p className={styles.feedbackSuccess} role="status">{successMessage}</p>}
        {errorMessage && <p className={styles.feedbackError} role="alert">{errorMessage}</p>}
      </div>
    </form>
  );
}
