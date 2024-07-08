// EmployeeSearchBox.jsx
import React from "react";
import { CiSearch } from "react-icons/ci";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const EmployeeSearchBox = ({ searchTerm, setSearchTerm, openModal, employeesLength }) => {
  return (
    <div className="mt-2 lg:flex lg:justify-between items-center">
      <div className="text-gray-400"> {employeesLength} Members</div>

      <div className="flex space-x-5">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="p-2 bg-gray-100 w-[250px] rounded-l-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch size={40} className="bg-gray-100 p-2 h-[42px] rounded-r-md" />
        </div>

        <button
          onClick={openModal}
          className="bg-[#ee4f50] flex space-x-2 items-center p-2 rounded-lg text-white"
        >
          <span className="text-white">
            <NoteAddIcon />
          </span>
          <span className="hidden lg:block">Add Employee</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeSearchBox;
