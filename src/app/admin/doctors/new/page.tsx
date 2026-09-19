import Link from "next/link";

import DoctorCreateForm from "./DoctorCreateForm";
import styles from "../../admin.module.css";

export default function NewDoctorPage() {
  return (
    <>
      <div className={styles.editHeaderLinks}>
        <Link href="/admin/doctors" className={styles.backLink}>
          &larr; Doctors
        </Link>
      </div>

      <header className={styles.detailHeader}>
        <div>
          <span className={styles.eyebrow}>DOCTOR MANAGEMENT</span>
          <h1 className={styles.pageTitle}>Add Doctor</h1>
          <p className={styles.pageDescription}>
            Create a doctor profile for the Thomson Clinic platform.
          </p>
        </div>
      </header>

      <DoctorCreateForm />
    </>
  );
}
