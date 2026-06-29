import { useState } from 'react';

export const useFileDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

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

  const downloadFile = async (filePath, fileName) => {
    setIsDownloading(true);
    setError(null);
    setProgress(0);

    try {
      // Get the base URL
      const baseUrl = import.meta.env.BASE_URL || '/';
      
      // Clean the path
      let path = filePath;
      if (!path.startsWith('/') && !path.startsWith('http')) {
        path = `${baseUrl}${path}`;
      }
      
      console.log('Downloading from path:', path);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Fetch the file
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      // Get the blob with correct MIME type
      const mimeType = getMimeType(fileName);
      const blob = await response.blob();
      
      // Create blob with correct type
      const correctBlob = new Blob([blob], { type: mimeType });
      
      // Create a download link
      const url = window.URL.createObjectURL(correctBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setProgress(0);
        setIsDownloading(false);
      }, 1000);

      return true;
    } catch (err) {
      setError(err.message);
      setIsDownloading(false);
      setProgress(0);
      console.error('Download error:', err);
      
      // Fallback: try to open in new tab
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        let path = filePath;
        if (!path.startsWith('/') && !path.startsWith('http')) {
          path = `${baseUrl}${path}`;
        }
        window.open(path, '_blank');
      } catch (fallbackErr) {
        console.error('Fallback download failed:', fallbackErr);
        alert(`Unable to download ${fileName}. Please try again.`);
      }
      return false;
    }
  };

  const downloadMultipleFiles = async (files) => {
    setIsDownloading(true);
    setError(null);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progressValue = ((i + 1) / files.length) * 100;
        setProgress(progressValue);
        
        const filePath = file.path || `/resources/${file.role}/${file.packType}/${file.name}`;
        await downloadFile(filePath, file.name);
        
        if (i < files.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setIsDownloading(false);
      }, 1000);
      
      return true;
    } catch (err) {
      setError(err.message);
      setIsDownloading(false);
      setProgress(0);
      return false;
    }
  };

  return {
    downloadFile,
    downloadMultipleFiles,
    isDownloading,
    error,
    progress,
    clearError: () => setError(null)
  };
};