import React from "react";
import { deleteApi } from "../../../Utils/API";

import { toast } from "react-toastify";

const DeleteEmployee = ({ closeModal, employeeId, setEmployees }) => {
  const handleDelete = async () => {
    try {
      const url = `/api/employee/delete-employee/${employeeId}`;
      const response = await deleteApi(url);

      if (response.statusCode === 200) {
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
    } finally {
      closeModal(); // Close the modal whether delete succeeded or failed
    }
  };

  return (
    <>
      <div className="absolute left-1/2 w-full transform -translate-x-1/2 bg-black bg-opacity-50 inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-md shadow-md p-4 w-72">
          <h2 className="text-xl font-bold mb-4">Delete Employee</h2>
          <p className="mb-4">Are you sure you want to delete this Employee?</p>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteEmployee;
