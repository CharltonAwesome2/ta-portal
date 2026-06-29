import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@components/common/Card";
import { departments, roles, trainingModules } from "@data/mockData";
import { fileToBase64 } from "@utils/fileStorage";
import styles from "./StudentApply.module.css";

const StudentApply = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    studentNumber: "",
    email: "",
    department: "",
    role: "",
    courses: "",
    documents: [], // Will store { name, data: base64 }
  });
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const filePromises = files.map(async (file) => {
        const base64Data = await fileToBase64(file);
        return {
          name: file.name,
          data: base64Data,
          size: file.size,
          type: file.type,
        };
      });

      const uploadedFiles = await Promise.all(filePromises);
      setFormData({
        ...formData,
        documents: [...formData.documents, ...uploadedFiles],
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    const newApplication = {
      id: Date.now(),
      ...formData,
      status: "pending",
      trainingCompleted: false,
      appointed: false,
      applicationDate: new Date().toISOString().split("T")[0],
      trainingDate: null,
      appointmentDate: null,
    };
    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));

    alert(`Application submitted successfully!\nYour application for ${formData.role} position has been received.`);
    navigate("/dashboard");
  };

  const selectedRoleModules = formData.role ? trainingModules[formData.role] : [];

  return (
    <div className={styles.container}>
      <h1>Apply as a Student Assistant</h1>
      <p className={styles.subtitle}>Complete your application for one of our student assistant positions</p>
      <div className={styles.applyLayout}>
        <div className={styles.sidebar}>
          <Card title="Available Roles">
            <div className={styles.roleList}>
              {roles.map((role) => (
                <div key={role.id} className={styles.roleItem}>
                  <h4>{role.name}</h4>
                  <ul className={styles.trainingList}>
                    {trainingModules[role.name].map((module, index) => (
                      <li key={index}>{module}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Application Process">
            <ul className={styles.guideList}>
              <li>
                <span className={styles.stepNumber}>1</span>
                <span className={styles.stepText}>Select your desired role</span>
              </li>
              <li>
                <span className={styles.stepNumber}>2</span>
                <span className={styles.stepText}>Complete mandatory training modules</span>
              </li>
              <li>
                <span className={styles.stepNumber}>3</span>
                <span className={styles.stepText}>Submit your application</span>
              </li>
              <li>
                <span className={styles.stepNumber}>4</span>
                <span className={styles.stepText}>Wait for training completion</span>
              </li>
              <li>
                <span className={styles.stepNumber}>5</span>
                <span className={styles.stepText}>Get appointed upon successful training</span>
              </li>
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
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Student Number *</label>
                <input
                  type="text"
                  required
                  value={formData.studentNumber}
                  onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Department *</label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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
                <label>Select Role *</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {formData.role && (
                <div className={styles.formGroup}>
                  <label>Required Training Modules</label>
                  <div className={styles.trainingModules}>
                    {selectedRoleModules.map((module, index) => (
                      <div key={index} className={styles.trainingModule}>
                        <span className={styles.moduleIcon}>📚</span>
                        <span>{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Courses (comma separated)</label>
                <input
                  type="text"
                  value={formData.courses}
                  onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                  placeholder="e.g., Programming 101, Data Structures"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Upload Documents</label>
                <input type="file" multiple onChange={handleFileUpload} disabled={uploading} />
                {uploading && <p>Uploading files...</p>}
                {formData.documents.length > 0 && (
                  <div className={styles.fileList}>
                    {formData.documents.map((file, index) => (
                      <span key={index} className={styles.fileTag}>
                        {file.name}
                        <button onClick={() => handleRemoveFile(index)} className={styles.removeFileBtn}>
                          ×
                        </button>
                      </span>
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
