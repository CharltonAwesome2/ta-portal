import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaGraduationCap, FaUserGraduate, FaUserTie } from "react-icons/fa";
import styles from "./Layout.module.css";

const Layout = () => {
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith('/teacher');
  
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <img src="/cput-logo.png" alt="CPUT Logo" className={styles.logoImg} />
            <span><FaGraduationCap /> TA Portal</span>
          </Link>
          <nav className={styles.nav}>
            {isTeacherRoute ? (
              <>
                <Link to="/dashboard" className={styles.navLink}>
                  <FaUserGraduate /> Student View
                </Link>
                <Link to="/teacher" className={`${styles.navLink} ${styles.active}`}>
                  <FaUserTie /> Admin Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/apply" className={styles.navLink}>Apply</Link>
                <Link to="/dashboard" className={styles.navLink}>
                  <FaUserGraduate /> Dashboard
                </Link>
                <Link to="/teacher" className={styles.navLink}>
                  <FaUserTie /> Admin
                </Link>
              </>
            )}
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