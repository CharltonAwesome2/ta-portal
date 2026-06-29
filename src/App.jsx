import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/common/Layout";
import StudentApply from "@pages/StudentApply";
import StudentDashboard from "@pages/StudentDashboard";
import TeacherDashboard from "@pages/TeacherDashboard";
import "@styles/global.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="apply" element={<StudentApply />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="teacher/*" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;