import Link from "next/link";

import { db } from "@/lib/db";

import styles from "../admin.module.css";

function getInitials(name: string) {
  const cleanName = name.replace(/^Dr\.?\s*/i, "").trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatFee(fee: number | null) {
  if (fee === null) {
    return "Not specified";
  }

  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(fee);
}

function formatStatus(isActive: boolean) {
  return isActive ? "Active" : "Inactive";
}

export default async function AdminDoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    specialty?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const specialty = params.specialty?.trim() ?? "";
  const status = params.status === "active" || params.status === "inactive"
    ? params.status
    : "all";

  const doctors = await db.orm.public.Doctor
    .orderBy((doctor) => doctor.name.asc())
    .all();

  const specialties = Array.from(
    new Set(
      doctors
        .map((doctor) => doctor.specialty.trim())
        .filter(Boolean)
    )
  ).sort((first, second) => first.localeCompare(second));

  const normalizedSearch = search.toLowerCase();
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = normalizedSearch === "" || [
      doctor.name,
      doctor.specialty,
      doctor.subSpecialty,
      doctor.registrationNumber,
      doctor.location,
    ].some((value) => value?.toLowerCase().includes(normalizedSearch));

    const matchesSpecialty = specialty === "" || doctor.specialty === specialty;
    const matchesStatus =
      status === "all" ||
      (status === "active" && doctor.isActive) ||
      (status === "inactive" && !doctor.isActive);

    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const activeDoctors = doctors.filter((doctor) => doctor.isActive).length;
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
      label: "Inactive Doctors",
      value: doctors.length - activeDoctors,
      className: styles.summaryMuted,
    },
    {
      label: "Specialties",
      value: specialties.length,
      className: styles.summaryAlert,
    },
  ];

  return (
    <>
      <header className={styles.contentHeader}>
        <div>
          <span className={styles.eyebrow}>CLINIC DIRECTORY</span>
          <h1 className={styles.pageTitle}>Doctors</h1>
          <p className={styles.pageDescription}>
            Manage doctor profiles published on the Thomson Clinic platform.
          </p>
        </div>

        <Link href="/admin/doctors/new" className={styles.addButton}>
          + Add Doctor
        </Link>
      </header>

      <section aria-label="Doctor summary" className={styles.summaryGrid}>
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

      <section className={styles.filterPanel} aria-label="Doctor filters">
        <form method="get" className={styles.filterForm}>
          <div className={styles.filterFieldSearch}>
            <label className={styles.filterLabel} htmlFor="doctor-search">
              Search doctors
            </label>
            <input
              id="doctor-search"
              name="search"
              type="search"
              className={styles.filterInput}
              placeholder="Name, specialty, registration number..."
              defaultValue={search}
            />
          </div>

          <div className={styles.filterField}>
            <label className={styles.filterLabel} htmlFor="doctor-specialty">
              Specialty
            </label>
            <select
              id="doctor-specialty"
              name="specialty"
              className={styles.filterSelect}
              defaultValue={specialty}
            >
              <option value="">All specialties</option>
              {specialties.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterField}>
            <label className={styles.filterLabel} htmlFor="doctor-status">
              Status
            </label>
            <select
              id="doctor-status"
              name="status"
              className={styles.filterSelect}
              defaultValue={status}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className={styles.filterActions}>
            <button type="submit" className={styles.filterButton}>
              Apply filters
            </button>
            {(search || specialty || status !== "all") && (
              <Link href="/admin/doctors" className={styles.clearFilters}>
                Clear
              </Link>
            )}
          </div>
        </form>
      </section>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Doctor profiles</h2>
        <span className={styles.headerMeta}>
          {filteredDoctors.length} of {doctors.length} shown
        </span>
      </div>

      {doctors.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>No doctors found.</h2>
          <p className={styles.emptyStateText}>
            Doctor profiles will appear here after they are added to the platform.
          </p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>
            No doctors match your current filters.
          </h2>
          <p className={styles.emptyStateText}>
            Try broadening your search or clearing one of the filters.
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
                <th scope="col">Experience</th>
                <th scope="col">Location</th>
                <th scope="col">Consultation mode</th>
                <th scope="col">Fee</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => {
                const photoUrl = doctor.photoUrl?.trim();

                return (
                  <tr key={doctor.id}>
                    <td>
                      <div className={styles.doctorCell}>
                        {photoUrl ? (
                          <img
                            className={styles.doctorAvatar}
                            src={photoUrl}
                            alt={`${doctor.name} profile`}
                          />
                        ) : (
                          <span className={styles.doctorAvatarInitials}>
                            {getInitials(doctor.name)}
                          </span>
                        )}
                        <span>
                          <strong className={styles.doctorName}>{doctor.name}</strong>
                          <small className={styles.doctorDesignation}>
                            {doctor.designation}
                          </small>
                        </span>
                      </div>
                    </td>
                    <td>{doctor.specialty}</td>
                    <td>{doctor.qualification}</td>
                    <td>
                      {doctor.experienceYears === null
                        ? "Not specified"
                        : `${doctor.experienceYears} years`}
                    </td>
                    <td>{doctor.location ?? "Not specified"}</td>
                    <td>{doctor.consultationMode ?? "Not specified"}</td>
                    <td>{formatFee(doctor.consultationFee)}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          doctor.isActive
                            ? styles.statusActive
                            : styles.statusInactive
                        }`}
                      >
                        {formatStatus(doctor.isActive)}
                      </span>
                    </td>
                    <td>
                      <span className={styles.actionLinks}>
                        <Link
                          href={`/doctors/${doctor.slug}`}
                          className={styles.viewLink}
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/doctors/${doctor.id}`}
                          className={styles.manageLink}
                        >
                          Manage
                        </Link>
                      </span>
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
