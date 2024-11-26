"use client";
import Link from "next/link";
import styles from "./navBar.module.css"; // Optional CSS Module
import { useState } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.brandLogo}>
          GETFIT
        </Link>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <Link href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="#about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
