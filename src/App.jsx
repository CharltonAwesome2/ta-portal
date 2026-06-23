import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/common/Layout";
import StudentApply from "@pages/StudentApply";
import TeacherDashboard from "@pages/TeacherDashboard";
import "@styles/global.css";

function App() {
  return (
    <BrowserRouter basename="/ta-portal">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentApply />} />
          <Route path="apply" element={<StudentApply />} />
          <Route path="teacher/*" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;