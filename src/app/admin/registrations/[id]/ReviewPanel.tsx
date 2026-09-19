"use client";

import { useState } from "react";

import styles from "../../admin.module.css";

import CreateDoctorProfile from "./CreateDoctorProfile";

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

function statusClass(status: string) {
  switch (status) {
    case "PENDING":
      return styles.statusPending;
    case "UNDER_REVIEW":
      return styles.statusReview;
    case "APPROVED":
      return styles.statusApproved;
    case "REJECTED":
      return styles.statusRejected;
    default:
      return styles.statusUnknown;
  }
}

function statusLabel(status: string) {
  return status
    .toUpperCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function ReviewPanel({
  registrationId,
  initialStatus,
}: {
  registrationId: number;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleUpdate() {
    if (isUpdating || selectedStatus === status) {
      return;
    }

    setIsUpdating(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/admin/registrations/${registrationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to update the application status.");
      }

      setStatus(selectedStatus);
      setSuccessMessage("Status updated successfully.");
    } catch (error) {
      console.error("Registration status update failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update the application status. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className={styles.reviewPanel} aria-labelledby="review-panel-title">
      <span className={styles.eyebrow}>REVIEW PANEL</span>
      <h2 id="review-panel-title" className={styles.detailPanelTitle}>
        Application status
      </h2>

      <div className={styles.reviewCurrent}>
        <span>Current status</span>
        <span className={`${styles.statusBadge} ${statusClass(status)}`}>
          {statusLabel(status)}
        </span>
      </div>

      <label className={styles.reviewLabel} htmlFor="registration-status">
        Change status
      </label>
      <select
        id="registration-status"
        className={styles.reviewSelect}
        value={selectedStatus}
        onChange={(event) => setSelectedStatus(event.target.value)}
        disabled={isUpdating}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        className={styles.reviewButton}
        onClick={handleUpdate}
        disabled={isUpdating || selectedStatus === status}
      >
        {isUpdating ? "Updating..." : "Update Status"}
      </button>

      {successMessage && (
        <p className={styles.feedbackSuccess} role="status">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className={styles.feedbackError} role="alert">
          {errorMessage}
        </p>
      )}

      <p className={styles.reviewNote}>
        Approval changes the application status only. It does not create or
        publish a doctor profile.
      </p>

      {status === "APPROVED" && (
        <CreateDoctorProfile registrationId={registrationId} />
      )}
    </section>
  );
}
