"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "../../admin.module.css";

type DoctorReference = {
  doctorId: number;
  slug: string;
};

export default function CreateDoctorProfile({
  registrationId,
}: {
  registrationId: number;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [createdDoctor, setCreatedDoctor] = useState<DoctorReference | null>(null);
  const [existingDoctor, setExistingDoctor] = useState<DoctorReference | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCreate() {
    if (isCreating || createdDoctor || existingDoctor) {
      return;
    }

    setIsCreating(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/admin/registrations/${registrationId}/create-doctor`,
        { method: "POST" }
      );
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (result?.doctorId && result?.slug) {
          setExistingDoctor({ doctorId: result.doctorId, slug: result.slug });
        }

        throw new Error(result?.error ?? "Unable to create the Doctor profile.");
      }

      setCreatedDoctor({ doctorId: result.doctorId, slug: result.slug });
    } catch (error) {
      console.error("Doctor profile creation failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create the Doctor profile. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  }

  if (createdDoctor) {
    return (
      <section className={styles.createDoctorPanel} aria-live="polite">
        <span className={styles.eyebrow}>PROFILE CREATED</span>
        <h2 className={styles.detailPanelTitle}>Doctor profile is ready</h2>
        <p className={styles.createDoctorText}>
          Doctor ID: {createdDoctor.doctorId}
        </p>
        <Link
          href={`/doctors/${createdDoctor.slug}`}
          className={styles.createDoctorLink}
        >
          View Doctor Profile
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.createDoctorPanel} aria-live="polite">
      <span className={styles.eyebrow}>PUBLIC PROFILE</span>
      <h2 className={styles.detailPanelTitle}>Create Doctor Profile</h2>
      <p className={styles.createDoctorText}>
        Create a public Doctor profile from this approved application.
      </p>

      {existingDoctor ? (
        <>
          <p className={styles.feedbackError}>{errorMessage}</p>
          <Link
            href={`/doctors/${existingDoctor.slug}`}
            className={styles.createDoctorLink}
          >
            View Existing Doctor Profile
          </Link>
        </>
      ) : (
        <>
          <button
            type="button"
            className={styles.createDoctorButton}
            onClick={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? "Creating Profile..." : "Create Doctor Profile"}
          </button>

          {errorMessage && (
            <p className={styles.feedbackError} role="alert">
              {errorMessage}
            </p>
          )}
        </>
      )}
    </section>
  );
}
