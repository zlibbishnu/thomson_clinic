"use client";

import { signOut } from "next-auth/react";

import styles from "./admin.module.css";

export default function SignOutButton() {
  return (
    <button
      type="button"
      className={styles.signOutButton}
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      Sign out
    </button>
  );
}
