import React, { useRef, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { Svg } from "../../Components/Svg.jsx";
import { AiOutlineDelete } from "react-icons/ai";

const EmployeeTable = ({
  employees,
  loading,
  itemsPerPage,
  currentPage,
  handlePageChange,
  filteredEmployees,
  searchTerm,
  handleDropdownToggle,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  handleUpdateModalOpen,
  handleDeleteModalOpen,
  dropdownOpen,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleDropdownToggle(null); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDropdownToggle]);

  const tableHeaders = ["Employee", "Job Role", "Email"];

  return (
    <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
          <tr>
            {tableHeaders.map((header, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                <div className="flex items-center text-black">
                  {header}
                  <Svg />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No employees found
              </td>
            </tr>
          ) : (
            filteredEmployees
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((employee) => (
                <tr key={employee._id} className="bg-white border-b z-30">
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                    {employee.Name}
                  </td>

                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                    {employee.Job_Role}
                  </td>

                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                    {employee.Email}
                  </td>

                  <td className=" px-6 py-4 relative whitespace-nowrap ">
                    <FaEllipsisH
                      onClick={() => handleDropdownToggle(employee._id)}
                      className="cursor-pointer"
                    />

                    {dropdownOpen === employee._id && (
                      <div
                        ref={modalRef}
                        className="absolute ml-0 z-10 bg-white divide-y divide-gray-100  rounded-lg lg:w-32 shadow-md left-[-90%] lg:left-[-50%]"
                      >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            <button
                              className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#f7faff] hover:bg-[] text-black"
                              onClick={() => {
                                setIsUpdateModalOpen(true);
                                handleUpdateModalOpen(employee._id);
                              }}
                            >
                              <TbEdit size={25} />
                              <span className="">Edit</span>
                            </button>
                          </li>

                          <li>
                            <button
                              className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#f3e9ea] bg-[#fef4f5] text-[#E71D36]"
                              onClick={() => {
                                setIsDeleteModalOpen(true);
                                handleDeleteModalOpen(employee._id);
                              }}
                            >
                              <AiOutlineDelete size={25} />
                              <span className="">Delete</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
