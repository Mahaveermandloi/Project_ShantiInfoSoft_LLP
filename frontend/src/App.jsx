// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./Components/Login";
// import SideBar from "./Components/SideBar";
// import Header from "./Components/Header";

// import Dashboard from "./Components/Dashboard";

// import Meeting_Rooms from "./Components/Meeting_Rooms";

// import Employee from "./Pages/Employee/Employee";

// import Device from "./Pages/Device/Device";

// import ProjectRoutes from "./Routes/ProjectRoutes";
// import EmployeeRoutes from "./Routes/EmployeeRoutes";
// import DeviceRoutes from "./Routes/DeviceRoutes";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     const token = localStorage.getItem("accessToken");
//     return !!token;
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {!isAuthenticated ? (
//           <>
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </>
//         ) : (
//           <Route path="/*" element={<AuthenticatedApp />} />
//         )}
//       </Routes>
//     </Router>
//   );
// };

// const AuthenticatedApp = () => {
//   return (
//     <div>
//       <Header />
//       <SideBar />
//       <main className="p-5 ml-auto w-full">
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/meeting-rooms" element={<Meeting_Rooms />} />
//           <Route path="/employee" element={<Employee />} />
//           <Route path="/device" element={<Device />} />
//           <Route path="/project/*" element={<ProjectRoutes />} />
//           <Route path="/employee/*" element={<EmployeeRoutes />} />
//           <Route path="/device/*" element={<DeviceRoutes />} />

//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default App;


// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import AppRoutes from "./Routes/Routes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Route path="/*" element={<AuthenticatedApp />} />
        )}
      </Routes>
    </Router>
  );
};

const AuthenticatedApp = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <main className="p-5 ml-auto w-full">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
