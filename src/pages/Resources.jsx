import React, { useState } from "react";
import Card from "@components/common/Card";
import { roles } from "@data/mockData";
import { resourcePacks } from "@data/resources";
import { useFileDownload } from "@hooks/useFileDownload";
import { getFilePath, getFileIcon } from "@utils/paths";
import {
  FaUserGraduate,
  FaBook,
  FaFileAlt,
  FaDownload,
  FaFolderOpen,
  FaChalkboardTeacher,
  FaUserTie,
  FaUsers,
  FaHands,
} from "react-icons/fa";
import { MdDescription, MdCloudDownload, MdInsertDriveFile } from "react-icons/md";
import styles from "./Resources.module.css";

const roleIcons = {
  "Teaching Assistant": <FaChalkboardTeacher />,
  "Retention Officer": <FaUserTie />,
  Tutor: <FaUsers />,
  Mentor: <FaHands />,
};

// Pack type icons
const packIcons = {
  training: <FaBook />,
  appointment: <FaFileAlt />,
};

const Resources = () => {
  const [selectedRole, setSelectedRole] = useState("Teaching Assistant");
  const [selectedPack, setSelectedPack] = useState("training");
  const { downloadFile, downloadMultipleFiles, isDownloading, progress } = useFileDownload();

  const roleResources = resourcePacks[selectedRole];

  if (!roleResources) {
    return (
      <div className={styles.resourcesPage}>
        <h1>
          <FaFolderOpen /> Resources
        </h1>
        <p className={styles.subtitle}>Access training and appointment resources for all roles</p>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>
            <FaFolderOpen />
          </span>
          <p>No resources available for {selectedRole}.</p>
        </div>
      </div>
    );
  }

  const currentPack = roleResources[selectedPack];

  if (!currentPack) {
    return (
      <div className={styles.resourcesPage}>
        <h1>Resources</h1>
        <p className={styles.subtitle}>Access training and appointment resources for all roles</p>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📂</span>
          <p>
            No {selectedPack} pack available for {selectedRole}.
          </p>
        </div>
      </div>
    );
  }

  const handleDownload = async (file) => {
    // Get the correct path with base URL
    const path = getFilePath(file.path);
    await downloadFile(path, file.name);
  };

  const handleDownloadAll = async () => {
    await downloadMultipleFiles(currentPack.files);
  };

  const getFileTypeIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    const icons = {
      pdf: "📕",
      doc: "📘",
      docx: "📘",
      xls: "📗",
      xlsx: "📗",
      jpg: "🖼️",
      jpeg: "🖼️",
      png: "🖼️",
      gif: "🖼️",
    };
    return icons[ext] || "📄";
  };

  return (
    <div className={styles.resourcesPage}>
      <h1>📚 Resources</h1>
      <p className={styles.subtitle}>Access training and appointment resources for all roles</p>

      {/* Progress indicator */}
      {isDownloading && progress > 0 && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.progressText}>
            {progress < 100 ? `Downloading... ${Math.round(progress)}%` : "Complete!"}
          </span>
        </div>
      )}

      <div className={styles.resourcesLayout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Card title="Select Role">
            <div className={styles.roleList}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  className={`${styles.roleBtn} ${selectedRole === role.name ? styles.active : ""}`}
                  onClick={() => setSelectedRole(role.name)}
                  disabled={isDownloading}
                >
                  <span className={styles.roleIcon}>{roleIcons[role.name] || <FaUserGraduate />}</span>
                  {role.name}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Pack Type">
            <div className={styles.packTypeList}>
              <button
                className={`${styles.packTypeBtn} ${selectedPack === "training" ? styles.active : ""}`}
                onClick={() => setSelectedPack("training")}
                disabled={isDownloading}
              >
                <span className={styles.packIcon}>{packIcons.training}</span>
                Training Pack
              </button>
              <button
                className={`${styles.packTypeBtn} ${selectedPack === "appointment" ? styles.active : ""}`}
                onClick={() => setSelectedPack("appointment")}
                disabled={isDownloading}
              >
                <span className={styles.packIcon}>{packIcons.appointment}</span>
                Appointment Pack
              </button>
            </div>
          </Card>

          <Card title="Quick Stats">
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{roleResources.training?.files?.length || 0}</span>
                <span className={styles.statLabel}>Training Files</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{roleResources.appointment?.files?.length || 0}</span>
                <span className={styles.statLabel}>Appointment Files</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  {(roleResources.training?.files?.length || 0) + (roleResources.appointment?.files?.length || 0)}
                </span>
                <span className={styles.statLabel}>Total Files</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <Card
            title={currentPack.name}
            headerRight={
              currentPack.files.length > 0 && (
                <button className={styles.downloadAllBtn} onClick={handleDownloadAll} disabled={isDownloading}>
                  {isDownloading ? "⏳ Downloading..." : `⬇️ Download All (${currentPack.files.length})`}
                </button>
              )
            }
          >
            <p className={styles.packDescription}>{currentPack.description}</p>

            {currentPack.files.length === 0 ? (
              <div className={styles.emptyFiles}>
                <p>No files available in this pack.</p>
              </div>
            ) : (
              <div className={styles.fileGrid}>
                {currentPack.files.map((file, index) => (
                  <div key={index} className={styles.fileCard}>
                    <div className={styles.fileIcon}>{getFileIcon(file.name)}</div>
                    <div className={styles.fileInfo}>
                      <div className={styles.fileName} title={file.name}>
                        {file.name}
                      </div>
                      <div className={styles.fileMeta}>
                        <span className={styles.fileType}>{file.name.split(".").pop().toUpperCase()}</span>
                        <span className={styles.fileSize}>
                          {file.size ? `${(file.size / 1024).toFixed(1)} KB` : ""}
                        </span>
                      </div>
                    </div>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => handleDownload(file)}
                      title="Download file"
                      disabled={isDownloading}
                    >
                      {isDownloading ? <MdCloudDownload className={styles.spinning} /> : <FaDownload />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
