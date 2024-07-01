// Routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Device from "../Pages/Device/Device";
import Employee from "../Pages/Employee/Employee";
import Project from "../Pages/Project/Project";
import AddProject from "../Pages/Project/AddProject";
import AddEpicTask from "../Pages/Project/AddEpicTask";


import { ProjectDetail } from "../Pages/Project/ProjectDetail";


import Dashboard from "../Pages/Dashboard/Dashboard";
import Meeting_Rooms from "../Pages/Meeting_Rooms/Meeting_Rooms";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meeting-rooms" element={<Meeting_Rooms />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/device" element={<Device />} />

      {/* Project routes */}
      <Route path="/project" element={<Project />} />
      <Route path="/project/addproject" element={<AddProject />} />
      <Route path="/project/addepictask/:id" element={<AddEpicTask />} />
      <Route path="/project/projectdetail/:id" element={<ProjectDetail />} />

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
