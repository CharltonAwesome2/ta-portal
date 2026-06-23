import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <img src="/cput-logo.png" alt="CPUT Logo" className={styles.logoImg} />
            <span>TA Portal</span>
          </Link>
          <nav className={styles.nav}>
            <Link to="/apply" className={styles.navLink}>Apply</Link>
            <Link to="/teacher" className={styles.navLink}>Teacher Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;