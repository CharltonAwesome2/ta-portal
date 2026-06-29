import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@components/common/Card";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  // For demo, using a hardcoded student - in production this would come from auth
  const [user] = useState({
    name: "John Doe",
    studentNumber: "20210001",
    email: "john@cput.ac.za",
  });

  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) {
      const allApps = JSON.parse(stored);
      const studentApps = allApps.filter(app => app.studentNumber === user.studentNumber);
      setApplications(studentApps);
    }
  }, [user.studentNumber]);

  const stats = {
    total: applications.length,
    pendingTraining: applications.filter(a => a.status === "pending").length,
    trainingCompleted: applications.filter(a => a.status === "training_completed").length,
    appointed: applications.filter(a => a.appointed).length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  const getStatusBadge = (app) => {
    if (app.appointed) return { text: "✓ Appointed", className: styles.appointed };
    if (app.trainingCompleted) return { text: "Training Complete", className: styles.trainingCompleted };
    if (app.status === "rejected") return { text: "Rejected", className: styles.rejected };
    return { text: "Pending Training", className: styles.pending };
  };

  return (
    <div className={styles.dashboard}>
      <h1>Student Dashboard</h1>
      <p className={styles.subtitle}>Track your applications and progress</p>
      
      <div className={styles.statsGrid}>
        <Card title="Total Applications">
          <div className={styles.statNumber}>{stats.total}</div>
        </Card>
        <Card title="Pending Training">
          <div className={`${styles.statNumber} ${styles.pendingColor}`}>{stats.pendingTraining}</div>
        </Card>
        <Card title="Training Completed">
          <div className={`${styles.statNumber} ${styles.trainingColor}`}>{stats.trainingCompleted}</div>
        </Card>
        <Card title="Appointed">
          <div className={`${styles.statNumber} ${styles.appointedColor}`}>{stats.appointed}</div>
        </Card>
      </div>

      <div className={styles.actionsGrid}>
        <Card 
          title="Apply for Position"
          className={styles.actionCard}
        >
          <button 
            className={styles.actionButton}
            onClick={() => navigate("/apply")}
          >
            New Application
          </button>
        </Card>
        <Card 
          title="Your Status"
          className={styles.actionCard}
        >
          <p>Track your application progress here</p>
          <button className={styles.secondaryButton}>
            View Details
          </button>
        </Card>
      </div>

      <Card title="Your Applications">
        {applications.length === 0 ? (
          <p>You haven't submitted any applications yet.</p>
        ) : (
          <div className={styles.applicationList}>
            {applications.map(app => {
              const status = getStatusBadge(app);
              return (
                <div key={app.id} className={styles.applicationItem}>
                  <div className={styles.appInfo}>
                    <span className={styles.roleName}>{app.role}</span>
                    <span className={styles.departmentName}>{app.department}</span>
                  </div>
                  <div className={styles.appStatus}>
                    <span className={`${styles.statusBadge} ${status.className}`}>
                      {status.text}
                    </span>
                    <span className={styles.appDate}>{app.applicationDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentDashboard;