// Get the base URL from Vite's environment
const baseUrl = import.meta.env.BASE_URL || '/';

export const resourcePacks = {
  "Teaching Assistant": {
    training: {
      name: "TA Training Pack",
      description: "Training materials and enrollment forms for Teaching Assistant positions",
      files: [
        { name: "2026 TA training enrolment form.docx", path: `${baseUrl}resources/Teaching Assistant/training/2026 TA training enrolment form.docx` },
        { name: "FUNDANI PAYDATES FOR THE YEAR 2026.pdf", path: `${baseUrl}resources/Teaching Assistant/training/FUNDANI PAYDATES FOR THE YEAR 2026.pdf` },
        { name: "TA training dates 2026.docx", path: `${baseUrl}resources/Teaching Assistant/training/TA training dates 2026.docx` },
        { name: "TA training programme 06 Feb 2026.docx", path: `${baseUrl}resources/Teaching Assistant/training/TA training programme 06 Feb 2026.docx` }
      ],
      totalFiles: 4
    },
    appointment: {
      name: "TA Appointment Pack New 2026",
      description: "Required documents for TA appointment",
      files: [
        { name: "APPOINTMENT FORM.pdf", path: `${baseUrl}resources/Teaching Assistant/appointment/APPOINTMENT FORM.pdf` },
        { name: "CPUT bank form.pdf", path: `${baseUrl}resources/Teaching Assistant/appointment/CPUT bank form.pdf` },
        { name: "FUNDANI PAYDATES FOR THE YEAR 2026.pdf", path: `${baseUrl}resources/Teaching Assistant/appointment/FUNDANI PAYDATES FOR THE YEAR 2026.pdf` },
        { name: "TA Checklist.pdf", path: `${baseUrl}resources/Teaching Assistant/appointment/TA Checklist.pdf` },
        { name: "Tax Declaration.pdf", path: `${baseUrl}resources/Teaching Assistant/appointment/Tax Declaration.pdf` },
        { name: "TA_Job description.pdf", path: `${baseUrl}resources/Teaching Assistant/appointment/TA_Job description.pdf` }
      ],
      totalFiles: 6
    }
  },
  "Retention Officer": {
    training: {
      name: "RO Training Pack",
      description: "Training materials for Retention Officers",
      files: [
        { name: "REQUEST FORM.pdf", path: `${baseUrl}resources/Retention Officer/training/REQUEST FORM.pdf` },
        { name: "RETENTION OFFICER DUTIES.pdf", path: `${baseUrl}resources/Retention Officer/training/RETENTION OFFICER DUTIES.pdf` },
        { name: "TRAINING CHECKLIST.pdf", path: `${baseUrl}resources/Retention Officer/training/TRAINING CHECKLIST.pdf` }
      ],
      totalFiles: 3
    },
    appointment: {
      name: "RO Appointment Pack",
      description: "Required documents for Retention Officer appointment",
      files: [
        { name: "APPOINTMENT OF STUDENTS.pdf", path: `${baseUrl}resources/Retention Officer/appointment/APPOINTMENT OF STUDENTS.pdf` },
        { name: "CONFIDENTIALITY FORM.pdf", path: `${baseUrl}resources/Retention Officer/appointment/CONFIDENTIALITY FORM.pdf` },
        { name: "CPUT BANKING FORM.pdf", path: `${baseUrl}resources/Retention Officer/appointment/CPUT BANKING FORM.pdf` },
        { name: "RETENTION OFFICER APPOINTMENT CHECKLIST.pdf", path: `${baseUrl}resources/Retention Officer/appointment/RETENTION OFFICER APPOINTMENT CHECKLIST.pdf` },
        { name: "RETENTION OFFICER DUTIES.pdf", path: `${baseUrl}resources/Retention Officer/appointment/RETENTION OFFICER DUTIES.pdf` },
        { name: "TAX DECLARATION.pdf", path: `${baseUrl}resources/Retention Officer/appointment/TAX DECLARATION.pdf` }
      ],
      totalFiles: 6
    }
  },
  "Tutor": {
    training: {
      name: "Tutor Training Pack",
      description: "Training materials for Tutors",
      files: [
        { name: "FUNDANI PAYDATES FOR THE YEAR 2026.pdf", path: `${baseUrl}resources/Tutor/training/FUNDANI PAYDATES FOR THE YEAR 2026.pdf` },
        { name: "STUDENT TUTOR Application form 2026.docx", path: `${baseUrl}resources/Tutor/training/STUDENT TUTOR Application form 2026.docx` },
        { name: "Tutor programme 08 & 09 February 2026.docx", path: `${baseUrl}resources/Tutor/training/Tutor programme 08 & 09 February 2026.docx` },
        { name: "TUTOR TRAINING DATES 2026.docx", path: `${baseUrl}resources/Tutor/training/TUTOR TRAINING DATES 2026.docx` }
      ],
      totalFiles: 4
    },
    appointment: {
      name: "Tutor Appointment Pack",
      description: "Required documents for Tutor appointment",
      files: [
        { name: "Student appointment form.pdf", path: `${baseUrl}resources/Tutor/appointment/Student appointment form.pdf` },
        { name: "Tutor_ Checklist.pdf", path: `${baseUrl}resources/Tutor/appointment/Tutor_ Checklist.pdf` },
        { name: "Tutor_CPUT bank form.pdf", path: `${baseUrl}resources/Tutor/appointment/Tutor_CPUT bank form.pdf` },
        { name: "Tutor_Tax declaration.pdf", path: `${baseUrl}resources/Tutor/appointment/Tutor_Tax declaration.pdf` },
        { name: "Tutor_Terms and conditions.pdf", path: `${baseUrl}resources/Tutor/appointment/Tutor_Terms and conditions.pdf` },
        { name: "WORKSTUDY Pay dates 2025.pdf", path: `${baseUrl}resources/Tutor/appointment/WORKSTUDY Pay dates 2025.pdf` }
      ],
      totalFiles: 6
    }
  },
  "Mentor": {
    training: {
      name: "Mentor Training Pack",
      description: "Training materials for Mentors",
      files: [
        { name: "REQUEST FORM.pdf", path: `${baseUrl}resources/Mentor/training/REQUEST FORM.pdf` },
        { name: "ROLES AND RESPONSIBILITIES.pdf", path: `${baseUrl}resources/Mentor/training/ROLES AND RESPONSIBILITIES.pdf` },
        { name: "TRAINING CHECKLIST.pdf", path: `${baseUrl}resources/Mentor/training/TRAINING CHECKLIST.pdf` }
      ],
      totalFiles: 3
    },
    appointment: {
      name: "Mentor Appointment Pack",
      description: "Required documents for Mentor appointment",
      files: [
        { name: "APPOINTMENT FORM.pdf", path: `${baseUrl}resources/Mentor/appointment/APPOINTMENT FORM.pdf` },
        { name: "CLAIM FORM.pdf", path: `${baseUrl}resources/Mentor/appointment/CLAIM FORM.pdf` },
        { name: "CPUT BANKING FORM.pdf", path: `${baseUrl}resources/Mentor/appointment/CPUT BANKING FORM.pdf` },
        { name: "MENTOR APPOINTMENT CHECKLIST.pdf", path: `${baseUrl}resources/Mentor/appointment/MENTOR APPOINTMENT CHECKLIST.pdf` },
        { name: "ROLES AND RESPONSIBILITIES.pdf", path: `${baseUrl}resources/Mentor/appointment/ROLES AND RESPONSIBILITIES.pdf` },
        { name: "TAX DECLARATION.pdf", path: `${baseUrl}resources/Mentor/appointment/TAX DECLARATION.pdf` },
        { name: "TERMS & CONDITION FORM.pdf", path: `${baseUrl}resources/Mentor/appointment/TERMS & CONDITION FORM.pdf` }
      ],
      totalFiles: 7
    }
  }
};

export const getResourcePack = (role, type) => {
  return resourcePacks[role]?.[type] || null;
};

export const getAllRoles = () => Object.keys(resourcePacks);

export const getFileType = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  if (['pdf'].includes(extension)) return 'pdf';
  if (['doc', 'docx'].includes(extension)) return 'word';
  if (['xls', 'xlsx'].includes(extension)) return 'excel';
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
  return 'other';
};

export const getFileIcon = (fileName) => {
  const type = getFileType(fileName);
  const icons = {
    pdf: '📕',
    word: '📘',
    excel: '📗',
    image: '🖼️',
    other: '📄'
  };
  return icons[type] || '📄';
};

export const formatFileSize = (size) => {
  if (size < 1024) return size + ' KB';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' MB';
  return (size / (1024 * 1024)).toFixed(1) + ' GB';
};