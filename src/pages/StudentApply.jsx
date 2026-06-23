import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@components/common/Card";
import { departments } from "@data/departments";
import styles from "./StudentApply.module.css";

const StudentApply = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    studentNumber: "",
    email: "",
    department: "",
    courses: "",
    documents: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    const newApplication = {
      id: Date.now(),
      ...formData,
      status: "pending",
      applicationDate: new Date().toISOString().split("T")[0],
    };
    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));
    
    alert("Application submitted successfully!");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>Apply as Teacher Assistant</h1>
      <div className={styles.applyLayout}>
        <div className={styles.sidebar}>
          <Card title="Application Guide">
            <ul className={styles.guideList}>
              <li>Fill all required fields</li>
              <li>Upload your CV</li>
              <li>Upload academic transcript</li>
              <li>Submit before deadline</li>
            </ul>
          </Card>
          <Card title="Important Notes">
            <ul className={styles.noteList}>
              <li>Only current CPUT students</li>
              <li>Minimum 65% average</li>
              <li>Good communication skills</li>
            </ul>
          </Card>
        </div>

        <div className={styles.formContainer}>
          <Card title="Application Form">
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Student Number *</label>
                <input
                  type="text"
                  required
                  value={formData.studentNumber}
                  onChange={(e) => setFormData({...formData, studentNumber: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Department *</label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Courses (comma separated)</label>
                <input
                  type="text"
                  value={formData.courses}
                  onChange={(e) => setFormData({...formData, courses: e.target.value})}
                  placeholder="e.g., Programming 101, Data Structures"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Upload Documents</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setFormData({...formData, documents: files.map(f => f.name)});
                  }}
                />
                {formData.documents.length > 0 && (
                  <div className={styles.fileList}>
                    {formData.documents.map((file, index) => (
                      <span key={index} className={styles.fileTag}>{file}</span>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit Application
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentApply;