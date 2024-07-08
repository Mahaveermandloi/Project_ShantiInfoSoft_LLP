import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "../Pages/User/Dashboard/UserDashboard";


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user/dashboard" />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
    

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/user/dashboard" />} />
    </Routes>
  );
};

export default UserRoutes;
