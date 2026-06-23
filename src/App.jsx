import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/common/Layout";
import StudentApply from "@pages/StudentApply";
import TeacherDashboard from "@pages/TeacherDashboard";
import "@styles/global.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentApply />} />
          <Route path="apply" element={<StudentApply />} />
          <Route path="teacher/*" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;