import Link from "next/link";

import { db } from "@/lib/db";

import styles from "./admin.module.css";

function countByStatus(
  registrations: Array<{ status: string }>,
  status: string
) {
  return registrations.filter(
    (registration) => registration.status.toUpperCase() === status
  ).length;
}

export default async function AdminDashboardPage() {
  const [doctors, registrations] = await Promise.all([
    db.orm.public.Doctor.all(),
    db.orm.public.DoctorRegistration.all(),
  ]);

  const activeDoctors = doctors.filter((doctor) => doctor.isActive).length;
  const pendingRegistrations = countByStatus(registrations, "PENDING");

  const summary = [
    {
      label: "Total Doctors",
      value: doctors.length,
      className: styles.summaryAccent,
    },
    {
      label: "Active Doctors",
      value: activeDoctors,
      className: styles.summaryGreen,
    },
    {
      label: "Pending Registrations",
      value: pendingRegistrations,
      className: styles.summaryAlert,
    },
    {
      label: "Total Registration Applications",
      value: registrations.length,
      className: styles.summaryMuted,
    },
  ];

  return (
    <>
      <header className={styles.contentHeader}>
        <div>
          <span className={styles.eyebrow}>THOMSON CLINIC ADMINISTRATION</span>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageDescription}>
            A clear view of doctors, applications, and the clinic workspace.
          </p>
        </div>

        <span className={styles.headerMeta}>Read-only workspace</span>
      </header>

      <section aria-label="Clinic summary" className={styles.summaryGrid}>
        {summary.map((item) => (
          <div
            key={item.label}
            className={`${styles.summaryCard} ${item.className}`}
          >
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </div>
        ))}
      </section>

      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Workspace overview</h2>
          <Link href="/admin/registrations" className={styles.sectionLink}>
            View applications
          </Link>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelBody}>
            <p className={styles.panelNote}>
              Registration applications are available for review. Approval,
              rejection, editing, and publication controls will be added in a
              later CMS step.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
