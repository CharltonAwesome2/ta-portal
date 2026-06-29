export const departments = [
  { id: 1, name: "Computer Science" },
  { id: 2, name: "Mathematics" },
  { id: 3, name: "Physics" },
  { id: 4, name: "Chemistry" },
  { id: 5, name: "Biology" },
  { id: 6, name: "Engineering" },
];

export const roles = [
  { id: 1, name: "Teaching Assistant" },
  { id: 2, name: "Retention Officer" },
  { id: 3, name: "Tutor" },
  { id: 4, name: "Mentor" },
];

export const trainingModules = {
  "Teaching Assistant": ["Teaching Methods", "Classroom Management", "Grading & Feedback", "Student Engagement"],
  "Retention Officer": ["Student Support", "Retention Strategies", "Crisis Management", "Data Analysis"],
  Tutor: ["Tutoring Techniques", "Learning Styles", "Subject Expertise", "Communication Skills"],
  Mentor: ["Mentoring Skills", "Career Development", "Active Listening", "Goal Setting"],
};

export const mockUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@cput.ac.za",
    department: "Computer Science",
    role: "Teaching Assistant",
    trained: true,
    appointed: true,
    trainingDate: "2024-01-10",
    appointmentDate: "2024-02-01",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@cput.ac.za",
    department: "Mathematics",
    role: "Tutor",
    trained: true,
    appointed: false,
    trainingDate: "2024-01-15",
    appointmentDate: null,
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@cput.ac.za",
    department: "Physics",
    role: "Mentor",
    trained: false,
    appointed: false,
    trainingDate: null,
    appointmentDate: null,
  },
];
const placeholderPDF =
  "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVGl0bGUgKEV4YW1wbGUpCi9Qcm9kdWNlciAoU2FtcGxlKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9Db3VudCAxCi9LaWRzIFs0IDAgUl0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KL1BhcmVudCAzIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA1IDAgUgo+Pgo+PgovQ29udGVudHMgNiAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago2IDAgb2JqCjw8IC9MZW5ndGggNyAwIFIgPj4Kc3RyZWFtCkJUIC9GMSAyNCBUZiAoRXhhbXBsZSkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago3IDAgb2JqCjUwCmVuZG9iagp4cmVmCjAgOCAwMDAwMDAwMCA2NTUzNSBmCjAwMDAwMDAwMTUgMDAwMDAgbgowMDAwMDAwMDcwIDAwMDAwIG4KMDAwMDAwMDExNSAwMDAwMCBuCjAwMDAwMDAxNjMgMDAwMDAgbgowMDAwMDAwMzA0IDAwMDAwIG4KMDAwMDAwMDM3NiAwMDAwMCBuCjAwMDAwMDA0MjggMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDgKL1Jvb3QgMiAwIFIKPj4Kc3RhcnR4cmVmCjQ1NwolJUVPRgo=";
