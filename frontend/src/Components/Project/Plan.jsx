import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { CiSearch } from "react-icons/ci";
import { getApi } from "../../Utils/API.js";

const Plan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [plan, setPlan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const url = `/api/plan/get-all-plans/${id}`;
        const response = await getApi(url);

        if (response && response.data && response.data.success) {
          setPlan(response.data.data);
          const total = Math.ceil(response.data.data.length / itemsPerPage);
          setTotalPages(total);
        } else {
          console.error(
            "Failed to fetch project:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchPlan();
  }, [id]);

  const itemsPerPage = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableHeaders = [
    "Epic Name",
    "Feature",
    "Priority",
    "Project Stage",
    "Start Date",
    "Due Date",
    "Estimated Time",
  ];

  const filteredPlan = plan.filter((item) =>
    item.epicName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="">
        <div className="flex items-center lg:justify-end">
          <div className="flex flex-col items-center lg:flex-row lg:space-x-5 space-y-2">
            <div>
              <select className=" bg-gray-100 lg:w-40 mt-2 w-[350px] lg:p-0  h-10 p-2 rounded-md">
                <option value="" className="text-gray-400  ">
                  Sort By
                </option>
                <option value="">High to Low</option>
                <option value="">High to Low</option>
                <option value="">High to Low</option>
              </select>
            </div>

            <div className="flex ">
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
              onClick={() => navigate(`/project/addepictask/${id}`)}
              className="bg-[#ee4f50] w-full flex justify-center space-x-2 items-center p-2 rounded-lg text-white"
            >
              <NoteAddIcon className="text-white" />
              <span className="lg:block">Add Task</span>
            </button>
          </div>
        </div>

        <div>
          <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
            {/* TABLE */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th scope="col" className="px-6 py-3" key={index}>
                      <div className="flex items-center text-black">
                        {header}
                      </div>
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPlan.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center">
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredPlan
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, index) => (
                      <tr key={index} className="bg-white border-b">
                        <td className="px-6 py-4">{item.epicName}</td>
                        <td className="px-6 py-4">{item.featureName}</td>
                        <td className="px-6 py-4">{item.priority}</td>
                        <td className="px-6 py-4">{item.projectStage}</td>
                        <td className="px-6 py-4">{item.startDate}</td>
                        <td className="px-6 py-4">{item.dueDate}</td>
                        <td className="px-6 py-4">{item.estimatedTime}</td>
                        <td className="px-6 py-4">
                          <FaEllipsisH
                            onClick={() => navigate("/project/projectdetail")}
                          />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <nav className="mt-4 flex justify-center" aria-label="Page navigation">
          <ul className="inline-flex space-x-2">
            <li>
              <button
                className={`px-3 py-2 bg-gray-200 rounded-md text-gray-700 ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-2 rounded-md ${
                    index + 1 === currentPage
                      ? "bg-[#ee4f50] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`px-3 py-2 bg-gray-200 rounded-md text-gray-700 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Plan;
