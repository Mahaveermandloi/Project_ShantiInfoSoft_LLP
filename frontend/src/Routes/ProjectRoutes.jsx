// ProjectRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Project from "../Components/Project/Project";
import AddProject from "../Components/Project/AddProject";
import AddEpicTask from "../Components/Project/AddEpicTask";
import { ProjectDetail, Plan } from "../Components/Project/ProjectDetail";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Project />} />
      <Route path="/addproject" element={<AddProject />} />
      <Route path="/addepictask/:id" element={<AddEpicTask />} />
      <Route path="/projectdetail/:id" element={<ProjectDetail />} />
    </Routes>
  );
};

export default ProjectRoutes;
