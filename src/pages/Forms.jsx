import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import { departments, roles } from "@data/mockData";
import { downloadFromBase64, fileUrlFromBase64 } from "@utils/fileStorage";
import styles from "./Forms.module.css";

const Forms = () => {
  const [applications, setApplications] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const renderDocuments = (documents) => {
    if (!documents || documents.length === 0) {
      return <p>No documents uploaded</p>;
    }

    return (
      <div className={styles.documentList}>
        {documents.map((doc, index) => (
          <div key={index} className={styles.documentItem}>
            <span className={styles.docName}>📄 {doc.name}</span>
            <div className={styles.docActions}>
              <button className={styles.viewDocBtn} onClick={() => handleViewDocument(doc.data, doc.name)}>
                View
              </button>
              <button className={styles.downloadDocBtn} onClick={() => handleDownloadDocument(doc.data, doc.name)}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) {
      setApplications(JSON.parse(stored));
    } else {
      // Add mock data if empty
      const mockApps = [
        {
          id: 1,
          studentName: "John Doe",
          studentNumber: "20210001",
          email: "john@cput.ac.za",
          department: "Computer Science",
          role: "Teaching Assistant",
          courses: "Programming 101",
          status: "pending",
          trainingCompleted: false,
          appointed: false,
          applicationDate: "2024-01-15",
          trainingDate: null,
          appointmentDate: null,
          documents: ["cv.pdf"],
        },
        {
          id: 2,
          studentName: "Jane Smith",
          studentNumber: "20210002",
          email: "jane@cput.ac.za",
          department: "Mathematics",
          role: "Tutor",
          courses: "Calculus",
          status: "training_completed",
          trainingCompleted: true,
          appointed: false,
          applicationDate: "2024-01-14",
          trainingDate: "2024-02-01",
          appointmentDate: null,
          documents: ["cv.pdf", "transcript.pdf"],
        },
        {
          id: 3,
          studentName: "Bob Johnson",
          studentNumber: "20210003",
          email: "bob@cput.ac.za",
          department: "Physics",
          role: "Mentor",
          courses: "Physics 101",
          status: "appointed",
          trainingCompleted: true,
          appointed: true,
          applicationDate: "2024-01-10",
          trainingDate: "2024-01-20",
          appointmentDate: "2024-02-01",
          documents: ["cv.pdf"],
        },
      ];
      setApplications(mockApps);
      localStorage.setItem("applications", JSON.stringify(mockApps));
    }
  }, []);

  const updateStatus = (appId, action) => {
    const updated = applications.map((app) => {
      if (app.id === appId) {
        if (action === "complete_training") {
          return {
            ...app,
            trainingCompleted: true,
            status: "training_completed",
            trainingDate: new Date().toISOString().split("T")[0],
          };
        } else if (action === "appoint") {
          return {
            ...app,
            appointed: true,
            status: "appointed",
            appointmentDate: new Date().toISOString().split("T")[0],
          };
        } else if (action === "reject") {
          return { ...app, status: "rejected" };
        }
      }
      return app;
    });
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const filtered = applications.filter((app) => {
    const deptMatch = selectedDepartment === "All" || app.department === selectedDepartment;
    const roleMatch = selectedRole === "All" || app.role === selectedRole;
    const statusMatch = selectedStatus === "All" || app.status === selectedStatus;
    return deptMatch && roleMatch && statusMatch;
  });

  const renderActions = (app) => {
    if (app.status === "rejected") return null;

    if (!app.trainingCompleted && app.status !== "training_completed") {
      return (
        <div className={styles.appActions}>
          <button className={styles.trainingBtn} onClick={() => updateStatus(app.id, "complete_training")}>
            Complete Training
          </button>
          <button className={styles.rejectBtn} onClick={() => updateStatus(app.id, "reject")}>
            Reject
          </button>
        </div>
      );
    }

    if (app.trainingCompleted && !app.appointed) {
      return (
        <div className={styles.appActions}>
          <button className={styles.approveBtn} onClick={() => updateStatus(app.id, "appoint")}>
            Appoint
          </button>
          <button className={styles.rejectBtn} onClick={() => updateStatus(app.id, "reject")}>
            Reject
          </button>
        </div>
      );
    }

    if (app.appointed) {
      return (
        <div className={styles.appActions}>
          <span className={styles.appointedBadge}>✅ Appointed</span>
        </div>
      );
    }

    return null;
  };

  const getStatusLabel = (app) => {
    if (app.status === "rejected") return "REJECTED";
    if (app.appointed) return "APPOINTED";
    if (app.trainingCompleted) return "TRAINING COMPLETED";
    return "PENDING TRAINING";
  };

  const getStatusColor = (app) => {
    if (app.status === "rejected") return styles.rejected;
    if (app.appointed) return styles.appointed;
    if (app.trainingCompleted) return styles.trainingCompleted;
    return styles.pending;
  };

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
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending Training</option>
            <option value="training_completed">Training Completed</option>
            <option value="appointed">Appointed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className={styles.applicationList}>
          {filtered.length === 0 ? (
            <p>No applications found</p>
          ) : (
            filtered.map((app) => (
              <div key={app.id} className={styles.applicationCard}>
                <div className={styles.appHeader}>
                  <div>
                    <h4>{app.studentName}</h4>
                    <span className={styles.roleBadge}>{app.role}</span>
                  </div>
                  <span className={`${styles.status} ${getStatusColor(app)}`}>{getStatusLabel(app)}</span>
                </div>
                <div className={styles.appDetails}>
                  <p>
                    <strong>Student #:</strong> {app.studentNumber}
                  </p>
                  <p>
                    <strong>Department:</strong> {app.department}
                  </p>
                  <p>
                    <strong>Role:</strong> {app.role}
                  </p>
                  <p>
                    <strong>Courses:</strong> {app.courses}
                  </p>
                  <p>
                    <strong>Applied:</strong> {app.applicationDate}
                  </p>
                  {app.trainingDate && (
                    <p>
                      <strong>Training Date:</strong> {app.trainingDate}
                    </p>
                  )}
                  {app.appointmentDate && (
                    <p>
                      <strong>Appointment Date:</strong> {app.appointmentDate}
                    </p>
                  )}
                  <div className={styles.documentsSection}>
                    <strong>Documents:</strong>
                    {renderDocuments(app.documents)}
                  </div>
                </div>
                {renderActions(app)}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Forms;
