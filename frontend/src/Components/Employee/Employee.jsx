import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbEdit, TbFlagSearch } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { deleteApi, getApi, postApi, putApi } from "../../Utils/API.js";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import { toast } from "react-toastify";
import { Toast } from "../Toast.jsx";
import Pagination from "../Pagination.jsx";

const Svg = () => {
  return (
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  );
};

const Employee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Function to handle opening the update modal
  const handleUpdateModalOpen = (employeeId) => {
    setSelectedEmployeeId(employeeId); // Set the selected employee ID
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const [isUpdateModal, setIsUpdateModalOpen] = useState(false);

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

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

    const itemsPerPage = 9; // Define itemsPerPage here


  const handleDropdownToggle = (employeeId) => {
    setDropdownOpen(dropdownOpen === employeeId ? null : employeeId);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ["Employee", "Job Role", "Email"];

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleDelete = async (employeeId) => {
    try {
      const url = `/api/employee/delete-employee/${employeeId}`;
      const response = await deleteApi(url);

      if (response) {
        toast.success("Employee deleted successfully");
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeId)
        );
      } else {
        toast.error(
          response && response.data
            ? response.data.message
            : "Failed to delete employee"
        );
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("An error occurred while deleting the employee");
    }
  };

  const getPageNumbers = () => {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      let pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return [1, ...pages, totalPages];
    }

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    <>
      <Toast />
      <div className="lg:w-10/12 lg:ml-auto">
        <h1 className="text-3xl flex items-center font-semibold">Employee</h1>

        <div className="mt-2 lg:flex lg:justify-between items-center">
          <div className="text-gray-400"> {employees.length} Members</div>

          <div className="flex space-x-5">
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                className="p-2 bg-gray-100 w-[250px] rounded-l-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CiSearch size={40} className="bg-gray-100 p-2 rounded-r-md" />
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

        <div className="">
          <div className="relative mt-5  shadow-md overflow-x-auto  sm:rounded-lg">
            <table className="lg:w-full    text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                        <td className="px-6 py-4 relative">
                          <FaEllipsisH
                            onClick={() => handleDropdownToggle(employee._id)}
                            className="cursor-pointer"
                          />

                          {dropdownOpen === employee._id && (
                            <div
                              ref={modalRef} // Attach the ref to the modal's outermost container
                              className="absolute ml-0 z-10 bg-white divide-y divide-gray-100 rounded-lg lg:w-32 shadow-md left-[-90%] lg:left-[-50%]"
                            >
                              {/* Modal content */}
                              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                  <button
                                    className="flex gap-2 items-center px-4 py-2 w-full text-left  hover:bg-[#e6e9ef]  bg-[#f7faff] hover:bg-[] text-black"
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
                                    onClick={() => handleDelete(employee._id)}
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

          {isModalOpen && <AddEmployee closeModal={closeModal} />}

          {isUpdateModal && (
            <UpdateEmployee
              closeModal={closeUpdateModal}
              employeeId={selectedEmployeeId} // Ensure selectedEmployeeId is set correctly
            />
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Employee;

const UpdateEmployee = ({ closeModal, employeeId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Email: "",
    Job_Role: "",
  });

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        const url = `/api/employee/get-employee-by-id/${employeeId}`;
        const response = await getApi(url); // Implement getApi function to fetch data

        if (response && response.data && response.data.success) {
          const { Name, Email, Job_Role } = response.data.data;
          setEmployeeData({ Name, Email, Job_Role });
        } else {
          console.error(
            "Failed to fetch employee data:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeById();
  }, [employeeId]);

  const onSubmit = async (data) => {
    const url = `/api/employee/edit-employee/${employeeId}`;

    try {
      const response = await putApi(data, url); // Implement postApi function to send data
      console.log(response);
      if (response) {
        toast.success("Employee details updated successfully");
        closeModal();
        reset();
        window.location.reload(); // Reload page or update employee list as needed
      } else {
        console.error(
          "Failed to add employee:",
          response && response.data ? response.data.message : "Unknown error"
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const jobRoles = [
    "UI developer",
    "UX developer",
    "Backend developer",
    "Frontend developer",
    "Software Engineer",
  ];

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-5 w-full max-w-md max-h-full">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Update Employee
          </h3>
          <button
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center focus:outline-none"
            onClick={closeModal}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1 6 6m0 0 6-6M7 7l6 6M7 7L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("Name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length should be 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum length should be 50 characters",
                  },
                })}
                defaultValue={employeeData.Name} // Set default value
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.Name && (
                <span className="text-red-500 text-sm">
                  {errors.Name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                defaultValue={employeeData.Email} // Set default value
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.Email && (
                <span className="text-red-500 text-sm">
                  {errors.Email.message}
                </span>
              )}
            </div>

            {/* Job Role */}
            <div>
              <label
                htmlFor="jobRole"
                className="block text-sm font-medium text-gray-700"
              >
                Job Role
              </label>
              <select
                id="jobRole"
                {...register("Job_Role", {
                  required: "Job role is required",
                })}
                defaultValue={employeeData.Job_Role} // Set default value
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a job role</option>
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.Job_Role && (
                <span className="text-red-500 text-sm">
                  {errors.Job_Role.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AddEmployee = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

 
  const onSubmit = async (data) => {
    const url = `/api/employee/create-employee`;
    try {
      const response = await postApi(data, url);

      if (response && response.data && response.data.success) {
        toast.success("Employee added successfully!!!");
        closeModal();
        reset();
        window.location.reload(); // Reload page or update employee list as needed
      } else {
        console.error(
          "Failed to add employee:",
          response && response.data ? response.data.message : "Unknown error"
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const jobRoles = [
    "UI developer",
    "UX developer",
    "Backend developer",
    "Frontend developer",
    "Software Engineer",
  ];

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-5 w-full max-w-md max-h-full">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Add Employee</h3>
          <button
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center focus:outline-none"
            onClick={closeModal}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1 6 6m0 0 6-6M7 7l6 6M7 7L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("Name", {
                  minLength: {
                    value: 3,
                    message: "Minimum length should be 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum length should be 50 characters",
                  },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.Name && (
                <span className="text-red-500 text-sm">
                  {errors.Name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.Email && (
                <span className="text-red-500 text-sm">
                  {errors.Email.message}
                </span>
              )}
            </div>

            {/* Job Role */}
            <div>
              <label
                htmlFor="jobRole"
                className="block text-sm font-medium text-gray-700"
              >
                Job Role
              </label>
              <select
                id="jobRole"
                {...register("Job_Role", {
                  required: "Job role is required",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a job role</option>
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.Job_Role && (
                <span className="text-red-500 text-sm">
                  {errors.Job_Role.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
