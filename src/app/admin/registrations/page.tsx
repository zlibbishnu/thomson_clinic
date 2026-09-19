import Link from "next/link";

import { db } from "@/lib/db";

import styles from "../admin.module.css";

const statuses = [
  { value: "PENDING", label: "Pending" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

function statusCount(
  registrations: Array<{ status: string }>,
  status: string
) {
  return registrations.filter(
    (registration) => registration.status.toUpperCase() === status
  ).length;
}

function statusClass(status: string) {
  switch (status) {
    case "PENDING":
      return styles.statusPending;
    case "UNDER REVIEW":
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default async function RegistrationApplicationsPage() {
  const registrations = await db.orm.public.DoctorRegistration
    .orderBy((registration) => registration.createdAt.desc())
    .all();

  return (
    <>
      <header className={styles.contentHeader}>
        <div>
          <span className={styles.eyebrow}>APPLICATION INBOX</span>
          <h1 className={styles.pageTitle}>Registration Applications</h1>
          <p className={styles.pageDescription}>
            Review professional applications submitted by doctors to Thomson
            Clinic.
          </p>
        </div>

        <span className={styles.headerMeta}>
          {registrations.length} total application
          {registrations.length === 1 ? "" : "s"}
        </span>
      </header>

      <section aria-label="Application status summary" className={styles.statusSummary}>
        {statuses.map((status) => (
          <div key={status.value} className={styles.statusSummaryItem}>
            <span className={styles.statusSummaryLabel}>{status.label}</span>
            <strong className={styles.statusSummaryValue}>
              {statusCount(registrations, status.value)}
            </strong>
          </div>
        ))}
      </section>

      {registrations.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>
            No registration applications yet.
          </h2>
          <p className={styles.emptyStateText}>
            New professional applications will appear here after submission.
          </p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Doctor</th>
                <th scope="col">Specialty</th>
                <th scope="col">Qualification</th>
                <th scope="col">Registration Number</th>
                <th scope="col">Email</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Submitted</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => {
                const status = registration.status.toUpperCase();

                return (
                  <tr key={registration.id}>
                    <td className={styles.doctorName}>{registration.name}</td>
                    <td>{registration.specialty}</td>
                    <td>{registration.qualification}</td>
                    <td>{registration.registrationNumber ?? "--"}</td>
                    <td className={styles.doctorEmail}>{registration.email ?? "--"}</td>
                    <td>{registration.location ?? "--"}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${statusClass(status)}`}
                      >
                        {statusLabel(status)}
                      </span>
                    </td>
                    <td>{formatDate(registration.createdAt)}</td>
                    <td>
                      <Link
                        href={`/admin/registrations/${registration.id}`}
                        className={styles.viewLink}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
