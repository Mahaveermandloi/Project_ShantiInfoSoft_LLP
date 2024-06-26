// // EmployeeSearchBar.jsx
// import React from "react";
// import { CiSearch } from "react-icons/ci";
// import NoteAddIcon from "@mui/icons-material/NoteAdd";

// const EmployeeSearchBar = ({ searchTerm, setSearchTerm, openModal }) => {
//   return (
//     <div className="flex space-x-5">
//       <div className="flex">
//         <input
//           type="text"
//           placeholder="Search"
//           className="p-2 bg-gray-100 w-[250px] rounded-l-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <CiSearch size={40} className="bg-gray-100 p-2 rounded-r-md" />
//       </div>

//       <button
//         onClick={openModal}
//         className="bg-[#ee4f50] flex space-x-2 items-center p-2 rounded-lg text-white"
//       >
//         <span className="text-white">
//           <NoteAddIcon />
//         </span>
//         <span className="hidden lg:block">Add Employee</span>
//       </button>
//     </div>
//   );
// };

// export default EmployeeSearchBar;

import React from "react";

const EmployeeSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default EmployeeSearchBar;
