import Link from "next/link";

import { auth } from "@/auth";

import SignOutButton from "./SignOutButton";
import styles from "./admin.module.css";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: "D" },
  { label: "Doctors", href: "/admin/doctors", icon: "D" },
  {
    label: "Registration Applications",
    href: "/admin/registrations",
    icon: "R",
  },
];

const placeholders = [
  { label: "Specialties", icon: "S" },
  { label: "Services", icon: "S" },
  { label: "Settings", icon: "G" },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.brand}>
          <span className={styles.brandMark}>T</span>
          <span>
            <span className={styles.brandName}>THOMSON CLINIC</span>
            <span className={styles.brandLabel}>Admin CMS</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Admin navigation">
          <span className={styles.navLabel}>WORKSPACE</span>

          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navItem}>
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          {placeholders.map((item) => (
            <span
              key={item.label}
              className={styles.navItemDisabled}
              aria-disabled="true"
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </span>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          {session?.user?.role === "ADMIN" ? (
            <>
              <strong className={styles.identityName}>Administrator</strong>
              <span className={styles.identityRole}>ADMIN</span>
              <SignOutButton />
            </>
          ) : (
            <span>Admin access</span>
          )}
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
