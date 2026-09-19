"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import styles from "../admin.module.css";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: searchParams.get("callbackUrl") || "/admin",
    });

    if (result?.error) {
      setErrorMessage("Unable to sign in with those credentials.");
      setIsSubmitting(false);
      return;
    }

    window.location.assign(result?.url || "/admin");
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPanel}>
        <div className={styles.loginBrand}>
          <span className={styles.brandMark}>T</span>
          <span>
            <strong className={styles.brandName}>THOMSON CLINIC</strong>
            <small className={styles.brandLabel}>Admin CMS</small>
          </span>
        </div>

        <span className={styles.eyebrow}>SECURE ADMINISTRATION</span>
        <h1 className={styles.loginTitle}>Administrator sign in</h1>
        <p className={styles.loginDescription}>
          Sign in to manage doctor profiles and registration applications.
        </p>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <label className={styles.editLabel} htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              className={styles.editInput}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.editLabel} htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              className={styles.editInput}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p className={styles.feedbackError} role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
