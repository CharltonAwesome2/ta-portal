import React, { useState, useEffect } from "react";
import { 
  FaDownload, 
  FaTimes, 
  FaSpinner,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaEye
} from "react-icons/fa";
import { MdInsertDriveFile } from "react-icons/md";
import styles from "./DocumentViewer.module.css";

const DocumentViewer = ({ file, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (file) {
      loadFile();
    }
    
    return () => {
      if (fileUrl) {
        window.URL.revokeObjectURL(fileUrl);
      }
    };
  }, [file]);

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'word';
    if (['xls', 'xlsx'].includes(extension)) return 'excel';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (['txt', 'log'].includes(extension)) return 'text';
    return 'other';
  };

  const getMimeType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      txt: 'text/plain',
      zip: 'application/zip',
      rar: 'application/x-rar-compressed'
    };
    return mimeTypes[extension] || 'application/octet-stream';
  };

  const getFileIcon = (fileName) => {
    const type = getFileType(fileName);
    const icons = {
      pdf: <FaFilePdf />,
      word: <FaFileWord />,
      excel: <FaFileExcel />,
      image: <FaFileImage />,
      text: <FaFileWord />,
      other: <MdInsertDriveFile />
    };
    return icons[type] || <MdInsertDriveFile />;
  };

  const loadFile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Construct the path
      const role = encodeURIComponent(file.role || '');
      const packType = file.packType || 'training';
      const fileName = encodeURIComponent(file.name);
      
      // Try multiple possible paths
      const paths = [
        file.path,
        `/ta-portal/resources/${role}/${packType}/${fileName}`,
        `/resources/${role}/${packType}/${fileName}`,
        `./resources/${role}/${packType}/${fileName}`,
        `resources/${role}/${packType}/${fileName}`
      ].filter(Boolean);

      console.log('Trying paths for file:', file.name);
      
      let loaded = false;
      let lastError = null;

      for (const path of paths) {
        try {
          console.log('Attempting:', path);
          const response = await fetch(path);
          
          if (response.ok) {
            // Get the blob with correct MIME type
            const mimeType = getMimeType(file.name);
            const blob = await response.blob();
            
            // Create blob with correct type
            const correctBlob = new Blob([blob], { type: mimeType });
            const url = window.URL.createObjectURL(correctBlob);
            
            setFileUrl(url);
            loaded = true;
            setIsLoading(false);
            console.log('Successfully loaded from:', path);
            break;
          } else {
            console.log(`Failed (${response.status}):`, path);
            lastError = `Status ${response.status}`;
          }
        } catch (err) {
          console.log('Error fetching:', path, err.message);
          lastError = err.message;
        }
      }

      if (!loaded) {
        throw new Error(`Could not load file. Last error: ${lastError}`);
      }
    } catch (err) {
      console.error('Error loading file:', err);
      setError(`Unable to load file: ${err.message}`);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      // Use the blob URL directly
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback: open the file directly
      const role = encodeURIComponent(file.role || '');
      const packType = file.packType || 'training';
      const fileName = encodeURIComponent(file.name);
      const path = `/ta-portal/resources/${role}/${packType}/${fileName}`;
      window.open(path, '_blank');
    }
  };

  const handleClose = () => {
    if (fileUrl) {
      window.URL.revokeObjectURL(fileUrl);
    }
    onClose();
  };

  if (!file) return null;

  const fileType = getFileType(file.name);
  const isPreviewable = fileType === 'pdf' || fileType === 'image';

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.fileIcon}>{getFileIcon(file.name)}</span>
            <div>
              <h3>{file.name}</h3>
              <p className={styles.fileMeta}>
                {fileType.toUpperCase()} • {file.size ? `${(file.size / 1024).toFixed(1)} KB` : 'Unknown size'}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.downloadBtn} onClick={handleDownload}>
              <FaDownload /> Download
            </button>
            <button className={styles.closeBtn} onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {isLoading ? (
            <div className={styles.loading}>
              <FaSpinner className={styles.spinner} />
              <p>Loading document...</p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p>❌ {error}</p>
              <button className={styles.retryBtn} onClick={loadFile}>
                Retry
              </button>
            </div>
          ) : isPreviewable && fileUrl ? (
            <div className={styles.preview}>
              {fileType === 'pdf' ? (
                <object
                  data={fileUrl}
                  type="application/pdf"
                  className={styles.pdfViewer}
                >
                  <div className={styles.pdfFallback}>
                    <p>Your browser doesn't support PDF viewing.</p>
                    <button className={styles.downloadBtn} onClick={handleDownload}>
                      <FaDownload /> Download PDF
                    </button>
                  </div>
                </object>
              ) : fileType === 'image' ? (
                <img 
                  src={fileUrl} 
                  alt={file.name} 
                  className={styles.imageViewer}
                  onError={() => setError('Failed to display image')}
                />
              ) : (
                <div className={styles.previewPlaceholder}>
                  <div className={styles.previewIcon}>{getFileIcon(file.name)}</div>
                  <p>Preview available for this file type</p>
                  <button className={styles.viewBtn} onClick={handleDownload}>
                    <FaDownload /> Download to View
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.noPreview}>
              <div className={styles.noPreviewIcon}>{getFileIcon(file.name)}</div>
              <p>Preview not available for this file type</p>
              <button className={styles.downloadBtn} onClick={handleDownload}>
                <FaDownload /> Download File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;