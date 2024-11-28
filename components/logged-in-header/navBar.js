"use client";
import Link from "next/link";
import styles from "./navBar.module.css"; // Optional CSS Module
import { useState } from "react";
import { logout } from "../../actions/auth-actions";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/mainpage" className={styles.brandLogo}>
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
          <Link href="/mainpage#home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/mainpage#exercises" onClick={() => setMenuOpen(false)}>
            Exercises
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <Link href="/customExercises" onClick={() => setMenuOpen(false)}>
            Custom Workouts
          </Link>
          <Link href={"/"} onClick={logout}>
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}
