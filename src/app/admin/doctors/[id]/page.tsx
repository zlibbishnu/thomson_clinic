import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";

import DoctorEditForm from "./DoctorEditForm";
import DoctorAccountActions from "./DoctorAccountActions";
import styles from "../../admin.module.css";

function formatStatus(isActive: boolean) {
  return isActive ? "Active" : "Inactive";
}

export default async function ManageDoctorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const doctor = await db.orm.public.Doctor.where({ id }).first();

  if (!doctor) {
    notFound();
  }

  return (
    <>
      <div className={styles.editHeaderLinks}>
        <Link href="/admin/doctors" className={styles.backLink}>
          &larr; Doctors
        </Link>
        <Link
          href={`/doctors/${doctor.slug}`}
          className={styles.publicProfileLink}
        >
          View Public Profile
        </Link>
      </div>

      <header className={styles.detailHeader}>
        <div>
          <span className={styles.eyebrow}>DOCTOR MANAGEMENT</span>
          <h1 className={styles.pageTitle}>Manage Doctor</h1>
          <p className={styles.detailSubtitle}>{doctor.name}</p>
        </div>

        <div className={styles.detailHeaderStatus}>
          <span
            className={`${styles.statusBadge} ${
              doctor.isActive ? styles.statusActive : styles.statusInactive
            }`}
          >
            {formatStatus(doctor.isActive)}
          </span>
          <span className={styles.detailMeta}>Doctor #{doctor.id}</span>
          <span className={styles.detailMeta}>{doctor.specialty}</span>
        </div>
      </header>

      <DoctorEditForm initialDoctor={doctor} />
      <DoctorAccountActions
        doctorId={doctor.id}
        doctorName={doctor.name}
        initialIsActive={doctor.isActive}
      />
    </>
  );
}
