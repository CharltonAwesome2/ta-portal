// Utility functions for handling file storage

// Convert File to base64 string for storage
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Convert base64 string back to Blob
export const base64ToBlob = (base64, mimeType) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

// Get file extension from filename
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

// Get MIME type from extension
export const getMimeType = (filename) => {
  const extension = getFileExtension(filename);
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

// Create a download link from base64 data
export const downloadFromBase64 = (base64, filename) => {
  const mimeType = getMimeType(filename);
  const blob = base64ToBlob(base64, mimeType);
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 100);
};

// Create a file URL from base64 for viewing
export const fileUrlFromBase64 = (base64, filename) => {
  const mimeType = getMimeType(filename);
  const blob = base64ToBlob(base64, mimeType);
  return window.URL.createObjectURL(blob);
};