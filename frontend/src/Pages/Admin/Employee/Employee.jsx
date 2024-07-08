import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";

import { Toast } from "../../../Components/Toast.jsx";
import Pagination from "../../../Components/Pagination.jsx";
import EmployeeSearchBox from "./EmployeeSearchBox";

import AddEmployee from "./AddEmployee.jsx";
import EditEmployee from "./EditEmployee.jsx";
import DeleteEmployee from "./DeleteEmployee.jsx";
import EmployeeTable from "./EmployeeTable"; // Import EmployeeTable component

const Employee = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isUpdateModal, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const url = `/api/employee/get-employees`;
        const response = await getApi(url);

        if (response && response.data && response.data.success) {
          setEmployees(response.data.data);
          const total = Math.ceil(response.data.data.length / itemsPerPage);
          setTotalPages(total);
        } else {
          console.error(
            "Failed to fetch employees:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 5; // Define itemsPerPage here

  const handleDropdownToggle = (employeeId) => {
    setDropdownOpen(dropdownOpen === employeeId ? null : employeeId);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateModalOpen = (employeeId) => {
    setSelectedEmployeeId(employeeId); // Set the selected employee ID
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const handleDeleteModalOpen = (employeeId) => {
    setSelectedEmployeeId(employeeId); // Set the selected employee ID
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Toast />
      <div className="lg:w-10/12 lg:ml-auto">
        <h1 className="text-3xl flex items-center font-semibold">Employee</h1>

        <EmployeeSearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          openModal={openModal}
          employeesLength={employees.length}
        />

        <EmployeeTable
          employees={employees}
          loading={loading}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          filteredEmployees={filteredEmployees}
          searchTerm={searchTerm}
          handleDropdownToggle={handleDropdownToggle}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleUpdateModalOpen={handleUpdateModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
          dropdownOpen={dropdownOpen}
        />

        {isModalOpen && <AddEmployee closeModal={closeModal} />}

        {isUpdateModal && (
          <EditEmployee
            closeModal={() => setIsUpdateModalOpen(false)}
            employeeId={selectedEmployeeId}
          />
        )}

        {isDeleteModal && (
          <DeleteEmployee
            closeModal={() => setIsDeleteModalOpen(false)}
            employeeId={selectedEmployeeId}
            setEmployees={setEmployees}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
export default Employee;