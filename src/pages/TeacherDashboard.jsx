import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Card from "@components/common/Card";
import Users from "./Users";
import Forms from "./Forms";
import Resources from "./Resources";
import DocumentManagement from "./DocumentManagement";
import { roles } from "@data/mockData";
import { 
  FaChartBar, 
  FaUsers, 
  FaFileAlt, 
  FaBook, 
  FaFolderOpen,
  FaUserGraduate,
  FaUserTie,
  FaUsers as FaUsersIcon,
  FaHands
} from "react-icons/fa";
import styles from "./TeacherDashboard.module.css";

const TeacherDashboard = () => {
return (
    <div className={styles.dashboard}>
      <h1><FaUserTie /> Administrator Dashboard</h1>
      <p className={styles.dashboardSubtitle}>Manage applications, users, and reports</p>
      <div className={styles.dashboardLayout}>
        <nav className={styles.sidebar}>
          <NavLink to="/teacher" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          } end>
            <span className={styles.icon}><FaChartBar /></span>
            Overview
          </NavLink>
          <NavLink to="/teacher/users" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            <span className={styles.icon}><FaUsers /></span>
            Users
          </NavLink>
          <NavLink to="/teacher/forms" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            <span className={styles.icon}><FaFileAlt /></span>
            Applications
          </NavLink>
          <NavLink to="/teacher/resources" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            <span className={styles.icon}><FaBook /></span>
            Resources
          </NavLink>
          <NavLink to="/teacher/documents" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            <span className={styles.icon}><FaFolderOpen /></span>
            Documents
          </NavLink>
          <NavLink to="/teacher/reports" className={({isActive}) => 
            `${styles.sidebarLink} ${isActive ? styles.active : ""}`
          }>
            <span className={styles.icon}><FaChartBar /></span>
            Reports
          </NavLink>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="users" element={<Users />} />
            <Route path="forms" element={<Forms />} />
            <Route path="resources" element={<Resources />} />
            <Route path="reports" element={<Reports />} />
            <Route path="documents" element={<DocumentManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingTraining: 0,
    trainingCompleted: 0,
    appointed: 0,
    rejected: 0,
  });
  const [roleStats, setRoleStats] = useState({});

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");

    setStats({
      totalApplications: applications.length,
      pendingTraining: applications.filter((a) => a.status === "pending").length,
      trainingCompleted: applications.filter((a) => a.status === "training_completed").length,
      appointed: applications.filter((a) => a.appointed).length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    });

    // Role-based statistics
    const roleStatsData = {};
    roles.forEach((role) => {
      const roleApps = applications.filter((a) => a.role === role.name);
      roleStatsData[role.name] = {
        total: roleApps.length,
        appointed: roleApps.filter((a) => a.appointed).length,
        inTraining: roleApps.filter((a) => a.status === "pending" || a.status === "training_completed").length,
      };
    });
    setRoleStats(roleStatsData);
  }, []);

  return (
    <div className={styles.overview}>
      <div className={styles.statsGrid}>
        <Card title="Total Applications">
          <div className={styles.statLabel}>All time</div>
          <div className={styles.statNumber}>{stats.totalApplications}</div>
        </Card>
        <Card title="Pending Training">
          <div className={styles.statLabel}>Awaiting completion</div>
          <div className={styles.statNumber} style={{ color: "#ff9800" }}>
            {stats.pendingTraining}
          </div>
        </Card>
        <Card title="Training Completed">
          <div className={styles.statLabel}>Ready for appointment</div>
          <div className={styles.statNumber} style={{ color: "#2196f3" }}>
            {stats.trainingCompleted}
          </div>
        </Card>
        <Card title="Appointed">
          <div className={styles.statLabel}>Active positions</div>
          <div className={styles.statNumber} style={{ color: "#4caf50" }}>
            {stats.appointed}
          </div>
        </Card>
        <Card title="Rejected">
          <div className={styles.statLabel}>Not selected</div>
          <div className={styles.statNumber} style={{ color: "#f44336" }}>
            {stats.rejected}
          </div>
        </Card>
      </div>

      <Card title="Role Distribution">
        <div className={styles.roleStats}>
          {Object.entries(roleStats).map(([role, data]) => (
            <div key={role} className={styles.roleStatItem}>
              <h4>{role}</h4>
              <div className={styles.roleStatDetails}>
                <span>Total: {data.total}</span>
                <span>Appointed: {data.appointed}</span>
                <span>In Training: {data.inTraining}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const Reports = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) {
      setApplications(JSON.parse(stored));
    }
  }, []);

  const getAppointmentRate = () => {
    if (applications.length === 0) return 0;
    const appointed = applications.filter((a) => a.appointed).length;
    return ((appointed / applications.length) * 100).toFixed(1);
  };

  return (
    <div className={styles.reports}>
      <Card title="Reports & Analytics">
        <div className={styles.reportGrid}>
          <div className={styles.reportItem}>
            <h4>Appointment Rate</h4>
            <div className={styles.reportNumber}>{getAppointmentRate()}%</div>
          </div>
          <div className={styles.reportItem}>
            <h4>Total Trained</h4>
            <div className={styles.reportNumber}>{applications.filter((a) => a.trainingCompleted).length}</div>
          </div>
          <div className={styles.reportItem}>
            <h4>Pending Reviews</h4>
            <div className={styles.reportNumber}>
              {applications.filter((a) => a.status === "pending" || a.status === "training_completed").length}
            </div>
          </div>
          <div className={styles.reportItem}>
            <h4>Success Rate</h4>
            <div className={styles.reportNumber}>
              {applications.filter((a) => a.appointed).length > 0 ? "High" : "N/A"}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
