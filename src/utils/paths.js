/**
 * Get the correct file path considering the base URL
 * @param {string} path - The file path
 * @returns {string} - The corrected path
 */
export const getFilePath = (path) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // If path already starts with / or http, return as is
  if (path.startsWith('/') || path.startsWith('http')) {
    return path;
  }
  
  // If path starts with ./ or ../, keep it relative
  if (path.startsWith('./') || path.startsWith('../')) {
    return path;
  }
  
  // Otherwise, prepend the base URL
  return `${baseUrl}${path}`;
};

/**
 * Get the file extension from a filename
 * @param {string} filename - The filename
 * @returns {string} - The file extension
 */
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

/**
 * Get a file icon based on file type
 * @param {string} filename - The filename
 * @returns {string} - The emoji icon
 */
export const getFileIcon = (filename) => {
  const ext = getFileExtension(filename);
  const icons = {
    pdf: '📕',
    doc: '📘',
    docx: '📘',
    xls: '📗',
    xlsx: '📗',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    ppt: '📊',
    pptx: '📊',
    zip: '📦',
    rar: '📦'
  };
  return icons[ext] || '📄';
};