import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Card from "@components/common/Card";
import Users from "./Users";
import Forms from "./Forms";
import styles from "./TeacherDashboard.module.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <h1>Teacher Dashboard</h1>
      <div className={styles.dashboardLayout}>
        <nav className={styles.sidebar}>
          <NavLink to="/teacher" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          } end>
            Dashboard
          </NavLink>
          <NavLink to="/teacher/users" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            Users
          </NavLink>
          <NavLink to="/teacher/forms" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            Forms
          </NavLink>
          <NavLink to="/teacher/human-capital" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            Human Capital
          </NavLink>
        </nav>

        <div className={styles.content}>
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="users" element={<Users />} />
            <Route path="forms" element={<Forms />} />
            <Route path="human-capital" element={<HumanCapital />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    setStats({
      totalApplications: applications.length,
      pending: applications.filter(a => a.status === "pending").length,
      approved: applications.filter(a => a.status === "approved").length,
      rejected: applications.filter(a => a.status === "rejected").length,
    });
  }, []);

  return (
    <div className={styles.overview}>
      <div className={styles.statsGrid}>
        <Card title="Total Applications" variant="stats">
          <div className={styles.statNumber}>{stats.totalApplications}</div>
        </Card>
        <Card title="Pending" variant="stats">
          <div className={styles.statNumber} style={{color: "#ff9800"}}>{stats.pending}</div>
        </Card>
        <Card title="Approved" variant="stats">
          <div className={styles.statNumber} style={{color: "#4caf50"}}>{stats.approved}</div>
        </Card>
        <Card title="Rejected" variant="stats">
          <div className={styles.statNumber} style={{color: "#f44336"}}>{stats.rejected}</div>
        </Card>
      </div>
      <Card title="Recent Applications">
        <div className={styles.recentList}>
          <p>No recent applications to display</p>
        </div>
      </Card>
    </div>
  );
};

const HumanCapital = () => {
  return (
    <Card title="Human Capital">
      <p>Human Capital management dashboard</p>
      <div className={styles.humanCapitalGrid}>
        <div className={styles.statCard}>
          <h4>Total Staff</h4>
          <div className={styles.number}>12</div>
        </div>
        <div className={styles.statCard}>
          <h4>TA Positions</h4>
          <div className={styles.number}>8</div>
        </div>
        <div className={styles.statCard}>
          <h4>Available Positions</h4>
          <div className={styles.number}>3</div>
        </div>
      </div>
    </Card>
  );
};

export default TeacherDashboard;