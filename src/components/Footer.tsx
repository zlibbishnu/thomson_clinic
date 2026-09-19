import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            T
          </div>

          <h3>THOMSON CLINIC</h3>

          <p className="footer-tagline">
            Mental Health & Neuroscience
          </p>

          <p>
            Connecting people with trusted specialists across
            mental health, neuroscience and other areas of
            healthcare.
          </p>
        </div>

        {/* Explore */}
        <div className="footer-column">
          <h4>Explore</h4>

          <Link href="/doctors">
            Doctors
          </Link>

          <Link href="/services">
            Services
          </Link>

          <Link href="/about">
            About Thomson Clinic
          </Link>

          <Link href="/contact">
            Contact
          </Link>
        </div>

        {/* For doctors */}
        <div className="footer-column">
          <h4>For Doctors</h4>

          <Link href="/doctor-registration">
            Join Thomson Clinic
          </Link>

          <Link href="/doctor-registration">
            Doctor Registration
          </Link>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h4>Contact</h4>

          <p>Thomson Clinic</p>
          <p>Mental Health & Neuroscience</p>
          <p>Bhubaneswar, Odisha</p>
          <p>India</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">

          <span>
            © {new Date().getFullYear()} Thomson Clinic.
            All rights reserved.
          </span>

          <div className="footer-legal">
            <Link href="/privacy">
              Privacy
            </Link>

            <Link href="/terms">
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}