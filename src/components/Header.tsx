"use client";

import { useState } from "react";
import Link from "next/link";

import { navigation } from "@/config/navigation";
import SearchBar from "./SearchBar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">

      {/* Top information strip */}
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>
            Mental Health • Neuroscience • Multispecialty Care
          </span>

          <span className="top-contact">
            Online consultations available
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="header-main">
        <div className="container header-inner">

          {/* Brand */}
          <Link
            href="/"
            className="brand"
            onClick={() => setMobileOpen(false)}
          >
            <div className="brand-mark">
              T
            </div>

            <div className="brand-text">
              <span className="brand-name">
                THOMSON CLINIC
              </span>

              <span className="brand-tagline">
                Mental Health & Neuroscience
              </span>
            </div>
          </Link>

          {/* Desktop search */}
          <div className="header-search">
            <SearchBar />
          </div>

          {/* Doctor registration */}
          <Link
            href="/doctor-registration"
            className="doctor-register-button"
            onClick={() => setMobileOpen(false)}
          >
            Join as Doctor
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`main-navigation ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="container navigation-inner">

          {/* Search shown on mobile */}
          <div className="mobile-search">
            <SearchBar />
          </div>

          <ul className="nav-list">

            {navigation.map((item) => (
              <li
                key={item.label}
                className="nav-item"
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}

                  {item.children && (
                    <span className="dropdown-arrow">
                      ▾
                    </span>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <ul className="dropdown-menu">

                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}

                  </ul>
                )}

              </li>
            ))}

          </ul>

        </div>
      </nav>

    </header>
  );
}