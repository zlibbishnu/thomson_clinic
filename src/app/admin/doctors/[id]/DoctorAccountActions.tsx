"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../../admin.module.css";

export default function DoctorAccountActions({
  doctorId,
  doctorName,
  initialIsActive,
}: {
  doctorId: number;
  doctorName: string;
  initialIsActive: boolean;
}) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function updateStatus(nextIsActive: boolean) {
    if (isUpdatingStatus) {
      return;
    }

    if (pendingStatus !== null) {
      return;
    }

    setPendingStatus(nextIsActive);
  }

  async function confirmStatusChange() {
    if (isUpdatingStatus || pendingStatus === null) {
      return;
    }

    const nextIsActive = pendingStatus;
    const action = nextIsActive ? "reactivate" : "deactivate";

    setIsUpdatingStatus(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextIsActive }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error ?? `Unable to ${action} the Doctor.`);
      }

      setIsActive(nextIsActive);
      setPendingStatus(null);
      setSuccessMessage(
        nextIsActive
          ? "Doctor reactivated successfully."
          : "Doctor deactivated successfully."
      );
      router.refresh();
    } catch (error) {
      console.error("Doctor status update failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : `Unable to ${action} the Doctor. Please try again.`
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function deleteDoctor() {
    if (isDeleting || confirmation !== "DELETE") {
      return;
    }

    setIsDeleting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to delete the Doctor.");
      }

      router.push("/admin/doctors");
    } catch (error) {
      console.error("Doctor deletion failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete the Doctor. Please try again."
      );
      setIsDeleting(false);
    }
  }

  return (
    <>
      <section className={styles.accountStatusSection}>
        <span className={styles.eyebrow}>ACCOUNT STATUS</span>
        <h2 className={styles.detailPanelTitle}>Profile status</h2>
        <p className={styles.statusExplanation}>
          {isActive
            ? "Active profiles are visible in the public doctor directory."
            : "Inactive profiles are hidden from the public doctor directory but kept in the database."}
        </p>
        <div className={styles.statusActionRow}>
          <span className={`${styles.statusBadge} ${isActive ? styles.statusActive : styles.statusInactive}`}>
            {isActive ? "Active" : "Inactive"}
          </span>
          <button
            type="button"
            className={styles.secondaryActionButton}
            onClick={() => updateStatus(!isActive)}
            disabled={isUpdatingStatus}
          >
            {isUpdatingStatus
              ? "Updating..."
              : isActive ? "Deactivate Doctor" : "Reactivate Doctor"}
          </button>
        </div>
        {successMessage && <p className={styles.feedbackSuccess} role="status">{successMessage}</p>}
        {errorMessage && <p className={styles.feedbackError} role="alert">{errorMessage}</p>}
      </section>

      <section className={styles.dangerZone}>
        <span className={styles.dangerEyebrow}>DANGER ZONE</span>
        <h2 className={styles.dangerTitle}>Permanent deletion</h2>
        <p className={styles.dangerText}>
          Permanent deletion removes this Doctor profile from the database and cannot be undone.
        </p>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => {
            setConfirmation("");
            setErrorMessage("");
            setIsDeleteOpen(true);
          }}
          disabled={isDeleting}
        >
          Delete Doctor Permanently
        </button>
      </section>

      {pendingStatus !== null && (
        <div className={styles.modalBackdrop} role="presentation">
          <section
            className={styles.confirmationModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="status-confirmation-title"
          >
            <span className={styles.eyebrow}>CONFIRM STATUS CHANGE</span>
            <h2 id="status-confirmation-title" className={styles.detailPanelTitle}>
              {pendingStatus ? "Reactivate Doctor?" : "Deactivate Doctor?"}
            </h2>
            <p className={styles.statusExplanation}>
              {pendingStatus
                ? "This Doctor will become publicly visible again."
                : "This removes the Doctor from the public directory but keeps the record in the database."}
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setPendingStatus(null)}
                disabled={isUpdatingStatus}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.reviewButton}
                onClick={confirmStatusChange}
                disabled={isUpdatingStatus}
              >
                {isUpdatingStatus ? "Updating..." : "Confirm"}
              </button>
            </div>
          </section>
        </div>
      )}

      {isDeleteOpen && (
        <div className={styles.modalBackdrop} role="presentation">
          <section
            className={styles.confirmationModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-doctor-title"
          >
            <span className={styles.dangerEyebrow}>CONFIRM PERMANENT DELETION</span>
            <h2 id="delete-doctor-title" className={styles.detailPanelTitle}>
              Delete {doctorName}?
            </h2>
            <p className={styles.dangerText}>
              This action permanently removes the Doctor profile and cannot be undone.
            </p>
            <label className={styles.editLabel} htmlFor="delete-confirmation">
              Type DELETE to confirm
            </label>
            <input
              id="delete-confirmation"
              className={styles.editInput}
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              autoFocus
            />
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setIsDeleteOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={deleteDoctor}
                disabled={isDeleting || confirmation !== "DELETE"}
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
