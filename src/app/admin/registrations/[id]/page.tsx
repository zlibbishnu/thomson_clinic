import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { db } from "@/lib/db";

import ReviewPanel from "./ReviewPanel";
import styles from "../../admin.module.css";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatFee(fee: number | null) {
  if (fee === null) {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(fee);
}

function formatList(value: string | null) {
  if (!value) {
    return "Not provided";
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(", ");
}

function getInitials(name: string) {
  const parts = name.replace(/^Dr\.?\s*/i, "").trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.detailField}>
      <dt className={styles.detailLabel}>{label}</dt>
      <dd className={styles.detailValue}>{children || "Not provided"}</dd>
    </div>
  );
}

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

export default async function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const registration = await db.orm.public.DoctorRegistration
    .where({ id })
    .first();

  if (!registration) {
    notFound();
  }

  const status = registration.status.toUpperCase();

  return (
    <>
      <Link href="/admin/registrations" className={styles.backLink}>
        &larr; Registration Applications
      </Link>

      <header className={styles.detailHeader}>
        <div>
          <span className={styles.eyebrow}>APPLICATION REVIEW</span>
          <h1 className={styles.pageTitle}>{registration.name}</h1>
          <p className={styles.detailSubtitle}>
            {registration.specialty}
            {registration.subSpecialty ? ` / ${registration.subSpecialty}` : ""}
          </p>
        </div>

        <div className={styles.detailHeaderStatus}>
          <span className={`${styles.statusBadge} ${statusClass(status)}`}>
            {statusLabel(status)}
          </span>
          <span className={styles.detailMeta}>Application #{registration.id}</span>
          <span className={styles.detailMeta}>
            Submitted {formatDate(registration.createdAt)}
          </span>
        </div>
      </header>

      <div className={styles.detailLayout}>
        <main className={styles.detailMain}>
          <section className={styles.detailPanel}>
            <div className={styles.detailPanelHeader}>
              <div>
                <span className={styles.eyebrow}>PROFESSIONAL DETAILS</span>
                <h2 className={styles.detailPanelTitle}>Credentials and practice focus</h2>
              </div>
            </div>

            <dl className={styles.detailFields}>
              <DetailField label="Full name">{registration.name}</DetailField>
              <DetailField label="Qualification">{registration.qualification}</DetailField>
              <DetailField label="Designation">{registration.designation}</DetailField>
              <DetailField label="Specialty">{registration.specialty}</DetailField>
              <DetailField label="Sub-specialty">{registration.subSpecialty}</DetailField>
              <DetailField label="Medical registration number">
                {registration.registrationNumber}
              </DetailField>
              <DetailField label="Years of experience">
                {registration.experienceYears === null
                  ? null
                  : `${registration.experienceYears} years`}
              </DetailField>
              <DetailField label="Languages">
                {formatList(registration.languages)}
              </DetailField>
              <DetailField label="Areas of expertise">
                {formatList(registration.areasOfExpertise)}
              </DetailField>
            </dl>
          </section>

          <section className={styles.detailPanel}>
            <span className={styles.eyebrow}>PRACTICE DETAILS</span>
            <h2 className={styles.detailPanelTitle}>Consultation information</h2>

            <dl className={styles.detailFields}>
              <DetailField label="Consultation mode">
                {registration.consultationMode}
              </DetailField>
              <DetailField label="Consultation fee">
                {formatFee(registration.consultationFee)}
              </DetailField>
              <DetailField label="Practice location">
                {registration.location}
              </DetailField>
              <DetailField label="Availability">
                {registration.availability}
              </DetailField>
            </dl>
          </section>

          <section className={styles.detailPanel}>
            <span className={styles.eyebrow}>CONTACT & PROFILE</span>
            <h2 className={styles.detailPanelTitle}>Professional contact</h2>

            <dl className={styles.detailFields}>
              <DetailField label="Professional email">
                {registration.email ? (
                  <a className={styles.detailLink} href={`mailto:${registration.email}`}>
                    {registration.email}
                  </a>
                ) : null}
              </DetailField>
              <DetailField label="Phone">
                {registration.phone ? (
                  <a className={styles.detailLink} href={`tel:${registration.phone}`}>
                    {registration.phone}
                  </a>
                ) : null}
              </DetailField>
              <DetailField label="Website">
                {registration.website ? (
                  <a
                    className={styles.detailLink}
                    href={registration.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {registration.website}
                  </a>
                ) : null}
              </DetailField>
              <DetailField label="Profile photo URL">
                {registration.photoUrl ? (
                  <a
                    className={styles.detailLink}
                    href={registration.photoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {registration.photoUrl}
                  </a>
                ) : null}
              </DetailField>
            </dl>

            {registration.photoUrl ? (
              <img
                className={styles.profilePhoto}
                src={registration.photoUrl}
                alt={`${registration.name} profile`}
              />
            ) : (
              <div className={styles.photoPlaceholder} aria-label="No profile photo">
                {getInitials(registration.name)}
              </div>
            )}
          </section>

          <section className={styles.detailPanel}>
            <span className={styles.eyebrow}>PROFESSIONAL BIO</span>
            <h2 className={styles.detailPanelTitle}>Background and additional information</h2>

            <div className={styles.detailParagraph}>
              <h3>Professional bio</h3>
              <p>{registration.bio || "Not provided"}</p>
            </div>

            <div className={styles.detailParagraph}>
              <h3>Additional information</h3>
              <p>{registration.additionalInformation || "Not provided"}</p>
            </div>
          </section>
        </main>

        <aside className={styles.detailSidebar}>
          <ReviewPanel registrationId={registration.id} initialStatus={status} />
        </aside>
      </div>
    </>
  );
}
