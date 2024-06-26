import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postApi, putApi, getApi } from "../../Utils/API";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

const EmployeeModal = ({ isModalOpen, closeModal, isUpdateModal, employeeId }) => {
  const { register, handleSubmit, reset, setValue, watch, getValues } = useForm();
  const [employees, setEmployees] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employeeId && isUpdateModal) {
      const fetchEmployee = async () => {
        setLoading(true);
        try {
          const url = `/api/employee/get-employee/${employeeId}`;
          const response = await getApi(url);

          if (response && response.data && response.data.success) {
            setInitialValues(response.data.data);
            const total = Math.ceil(response.data.data.length / itemsPerPage);
            setEmployees(response.data.data);
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

      fetchEmployee();
    }
  }, [employeeId, isUpdateModal]);

  const itemsPerPage = 9;

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

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    setLoading(true);

    try {
      let response;

      if (isUpdateModal && employeeId) {
        const url = `/api/employee/update-employee/${employeeId}`;
        response = await putApi(url, formData);
      } else {
        const url = `/api/employee/add-employee`;
        response = await postApi(url, formData);
      }

      if (response && response.data && response.data.success) {
        toast.success(
          `Employee ${isUpdateModal ? "updated" : "added"} successfully`
        );
        reset();
        closeModal();
      } else {
        toast.error(
          response && response.data
            ? response.data.message
            : `Failed to ${isUpdateModal ? "update" : "add"} employee`
        );
      }
    } catch (error) {
      console.error(
        `Error ${isUpdateModal ? "updating" : "adding"} employee:`,
        error
      );
      toast.error(
        `An error occurred while ${
          isUpdateModal ? "updating" : "adding"
        } the employee`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>

            <div className="z-50 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        {isUpdateModal ? "Edit Employee" : "Add New Employee"}
                      </h3>
                      <div className="mt-2">
                        <div className="flex flex-col space-y-4">
                          <div className="sm:flex sm:space-x-4">
                            <div className="mt-2 sm:mt-0 w-full">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                {...register("name")}
                                defaultValue={
                                  initialValues ? initialValues.name : ""
                                }
                                className="mt-1 p-2 px-4 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                              />
                            </div>
                          </div>

                          <div className="sm:flex sm:space-x-4">
                            <div className="mt-2 sm:mt-0 w-full">
                              <label
                                htmlFor="job_role"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Job Role
                              </label>
                              <input
                                type="text"
                                id="job_role"
                                name="job_role"
                                {...register("job_role")}
                                defaultValue={
                                  initialValues ? initialValues.job_role : ""
                                }
                                className="mt-1 p-2 px-4 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                              />
                            </div>
                          </div>

                          <div className="sm:flex sm:space-x-4">
                            <div className="mt-2 sm:mt-0 w-full">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                {...register("email")}
                                defaultValue={
                                  initialValues ? initialValues.email : ""
                                }
                                className="mt-1 p-2 px-4 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${
                      loading && "cursor-not-allowed opacity-50"
                    }`}
                    disabled={loading}
                  >
                    {isUpdateModal ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                      loading && "cursor-not-allowed opacity-50"
                    }`}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeModal;
