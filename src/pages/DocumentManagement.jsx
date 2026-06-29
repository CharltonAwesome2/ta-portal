import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import DocumentViewer from "@components/admin/DocumentViewer";
import { roles } from "@data/mockData";
import { resourcePacks } from "@data/resources";
import { useFileDownload } from "@hooks/useFileDownload";
import { 
  FaFile, 
  FaDownload, 
  FaEye, 
  FaSearch,
  FaFilter,
  FaFolderOpen,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaTh,
  FaList,
  FaTimes,
  FaSpinner
} from "react-icons/fa";
import { MdInsertDriveFile } from "react-icons/md";
import styles from "./DocumentManagement.module.css";

const DocumentManagement = () => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedPack, setSelectedPack] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const { downloadFile, isDownloading, progress } = useFileDownload();

  useEffect(() => {
    // Build file list from resources with proper paths
    const files = [];
    Object.entries(resourcePacks).forEach(([role, packs]) => {
      Object.entries(packs).forEach(([packType, pack]) => {
        pack.files.forEach((file) => {
          files.push({
            ...file,
            role,
            packType,
            packName: pack.name,
            // Use the path from the file object or construct one
            path: file.path || `/resources/${role}/${packType}/${file.name}`,
            size: Math.floor(Math.random() * 5000) + 500 // Simulate file size in KB
          });
        });
      });
    });
    setAllFiles(files);
  }, []);

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'word';
    if (['xls', 'xlsx'].includes(extension)) return 'excel';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    return 'other';
  };

  const getFileIcon = (fileName) => {
    const type = getFileType(fileName);
    const icons = {
      pdf: <FaFilePdf />,
      word: <FaFileWord />,
      excel: <FaFileExcel />,
      image: <FaFileImage />,
      other: <MdInsertDriveFile />
    };
    return icons[type] || <MdInsertDriveFile />;
  };

  const formatFileSize = (size) => {
    if (size < 1024) return size + ' KB';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' MB';
    return (size / (1024 * 1024)).toFixed(1) + ' GB';
  };

  const filteredFiles = allFiles.filter(file => {
    const roleMatch = selectedRole === "All" || file.role === selectedRole;
    const packMatch = selectedPack === "All" || file.packType === selectedPack;
    const searchMatch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    return roleMatch && packMatch && searchMatch;
  });

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleCloseViewer = () => {
    setSelectedFile(null);
  };

  const handleDownload = async (file) => {
    // Use the path from the file object
    const filePath = file.path || `/resources/${file.role}/${file.packType}/${file.name}`;
    await downloadFile(filePath, file.name);
  };

  const getPackTypeLabel = (packType) => {
    return packType === 'training' ? 'Training' : 'Appointment';
  };

  return (
    <div className={styles.documentManagement}>
      {/* Progress indicator for downloads */}
      {isDownloading && progress > 0 && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>
            {progress < 100 ? `Downloading... ${Math.round(progress)}%` : 'Complete!'}
          </span>
        </div>
      )}

      <div className={styles.header}>
        <div>
          <h1><FaFolderOpen /> Document Management</h1>
          <p className={styles.subtitle}>Browse, view, and download all training and appointment documents</p>
        </div>
        <div className={styles.stats}>
          <span className={styles.statBadge}>
            <FaFile /> {allFiles.length} Total Documents
          </span>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label><FaFilter /> Role</label>
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            className={styles.filterSelect}
            disabled={isDownloading}
          >
            <option value="All">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label><FaFilter /> Pack Type</label>
          <select 
            value={selectedPack} 
            onChange={(e) => setSelectedPack(e.target.value)}
            className={styles.filterSelect}
            disabled={isDownloading}
          >
            <option value="All">All Packs</option>
            <option value="training">Training Packs</option>
            <option value="appointment">Appointment Packs</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label><FaSearch /> Search</label>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            disabled={isDownloading}
          />
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <span>{filteredFiles.length} documents found</span>
          <span className={styles.viewToggle}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              disabled={isDownloading}
            >
              <FaTh /> Grid
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              disabled={isDownloading}
            >
              <FaList /> List
            </button>
          </span>
        </div>

        <div className={viewMode === 'grid' ? styles.fileGrid : styles.fileList}>
          {filteredFiles.map((file, index) => (
            <div key={index} className={styles.fileCard}>
              <div className={styles.fileCardHeader}>
                <span className={styles.fileIconLarge}>{getFileIcon(file.name)}</span>
                <div className={styles.fileBadges}>
                  <span className={styles.roleBadge}>{file.role}</span>
                  <span className={`${styles.packBadge} ${file.packType === 'training' ? styles.trainingBadge : styles.appointmentBadge}`}>
                    {getPackTypeLabel(file.packType)}
                  </span>
                </div>
              </div>
              <div className={styles.fileCardBody}>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileMeta}>
                  <span>{file.packName}</span>
                  <span>•</span>
                  <span>{formatFileSize(file.size)}</span>
                </div>
              </div>
              <div className={styles.fileCardActions}>
                <button 
                  className={styles.viewBtn}
                  onClick={() => handleViewFile(file)}
                  disabled={isDownloading}
                >
                  <FaEye /> View
                </button>
                <button 
                  className={styles.downloadBtn}
                  onClick={() => handleDownload(file)}
                  disabled={isDownloading}
                >
                  {isDownloading ? <FaSpinner className={styles.spinning} /> : <FaDownload />}
                  {isDownloading ? ' Downloading...' : ' Download'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}><FaFolderOpen /></span>
            <p>No documents found matching your filters</p>
            <button 
              className={styles.clearFiltersBtn}
              onClick={() => {
                setSelectedRole("All");
                setSelectedPack("All");
                setSearchTerm("");
              }}
              disabled={isDownloading}
            >
              <FaTimes /> Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedFile && (
        <DocumentViewer 
          file={selectedFile}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
};

export default DocumentManagement;