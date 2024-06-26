// ProjectRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Employee from "../Components/Employee/Employee";
const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Employee />} />
      {/* <Route path="/employee" element={<AddEmployee />} /> */}
      {/* <Route path="/" element={</>} /> */}
      {/* <Route path="/" element={< />} /> */}
    </Routes>
  );
};

export default EmployeeRoutes;
