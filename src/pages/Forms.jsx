import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import { departments } from "@data/departments";
import styles from "./Forms.module.css";

const Forms = () => {
  const [applications, setApplications] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) {
      setApplications(JSON.parse(stored));
    } else {
      // Add some mock data if empty
      const mockApps = [
        {
          id: 1,
          studentName: "John Doe",
          studentNumber: "20210001",
          email: "john@cput.ac.za",
          department: "Computer Science",
          courses: "Programming 101",
          status: "pending",
          applicationDate: "2024-01-15",
          documents: ["cv.pdf"],
        },
        {
          id: 2,
          studentName: "Jane Smith",
          studentNumber: "20210002",
          email: "jane@cput.ac.za",
          department: "Mathematics",
          courses: "Calculus",
          status: "approved",
          applicationDate: "2024-01-14",
          documents: ["cv.pdf", "transcript.pdf"],
        },
      ];
      setApplications(mockApps);
      localStorage.setItem("applications", JSON.stringify(mockApps));
    }
  }, []);

  const updateStatus = (appId, newStatus) => {
    const updated = applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const filtered = selectedDepartment === "All" 
    ? applications 
    : applications.filter(app => app.department === selectedDepartment);

  return (
    <div className={styles.formsPage}>
      <Card title="Applications Management">
        <div className={styles.filters}>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.applicationList}>
          {filtered.length === 0 ? (
            <p>No applications found</p>
          ) : (
            filtered.map(app => (
              <div key={app.id} className={styles.applicationCard}>
                <div className={styles.appHeader}>
                  <h4>{app.studentName}</h4>
                  <span className={`${styles.status} ${styles[app.status]}`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
                <div className={styles.appDetails}>
                  <p><strong>Student #:</strong> {app.studentNumber}</p>
                  <p><strong>Department:</strong> {app.department}</p>
                  <p><strong>Courses:</strong> {app.courses}</p>
                  <p><strong>Applied:</strong> {app.applicationDate}</p>
                  <p><strong>Documents:</strong> {app.documents?.join(", ")}</p>
                </div>
                {app.status === "pending" && (
                  <div className={styles.appActions}>
                    <button 
                      className={styles.approveBtn}
                      onClick={() => updateStatus(app.id, "approved")}
                    >
                      Approve
                    </button>
                    <button 
                      className={styles.rejectBtn}
                      onClick={() => updateStatus(app.id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Forms;