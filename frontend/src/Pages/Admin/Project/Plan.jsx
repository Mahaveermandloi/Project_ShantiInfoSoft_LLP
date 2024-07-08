import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { CiSearch } from "react-icons/ci";
import { FaSortDown } from "react-icons/fa";
import { getApi } from "../../../Utils/API.js";
import SubTask from "./SubTask.jsx";
import Pagination from "../../../Components/Pagination.jsx";
import { IoMdAddCircleOutline } from "react-icons/io";


const Plan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [plan, setPlan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const [SubTasksByPlanId, setSubTasksByPlanId] = useState([]);

  const [subTask, setSubTask] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const url = `/api/plan/get-all-plans/${id}`;
        const response = await getApi(url);

        if (response.data.statusCode === 200) {
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

  const [planName, setPlanName] = useState("");

  const getSubTask = async (planName) => {
    try {
      const url = `/api/project/get-subtask-by-name/${planName}`;
      const response = await getApi(url);
      console.log(response.data);
      setSubTasksByPlanId(response.data.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleRowExpansion = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
              <select className="bg-gray-100 lg:w-40 lg:mt-2 w-[350px] lg:p-0 h-10 p-2 rounded-md">
                <option value="" className="text-gray-400">
                  Sort By
                </option>
                <option value="">High to Low</option>
                <option value="">High to Low</option>
                <option value="">High to Low</option>
              </select>
            </div>

            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                className="p-2 bg-gray-100 lg:w-[250px] w-[310px] rounded-l-md"
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
          <div className="relative mt-5  shadow-md  sm:rounded-lg">
            <div className="overflow-y-auto h-96 bg-gray-100">
              <table className="w-full overflow-y-auto  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    <th scope="col" className="px-6 py-3">
                      More
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPlan.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="px-6 py-4 text-center">
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
                        <>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">{item.epicName}</td>
                            <td className="px-6 py-4">{item.featureName}</td>
                            <td className="px-6 py-4">{item.priority}</td>
                            <td className="px-6 py-4">{item.projectStage}</td>
                            <td className="px-6 py-4">{item.startDate}</td>
                            <td className="px-6 py-4">{item.dueDate}</td>
                            <td className="px-6 py-4">{item.estimatedTime}</td>
                            <td className="px-6 py-4">
                              <IoMdAddCircleOutline
                                onClick={() => {
                                  {
                                    setSubTask(true);
                                    setPlanName(item.epicName);
                                  }
                                }}
                                size={24}
                              />
                            </td>
                            <td className="px-6 py-4">
                              <FaSortDown
                                size={25}
                                onClick={() => {
                                  toggleRowExpansion(index);
                                  getSubTask(item.epicName);
                                }}
                              />
                            </td>
                          </tr>

                          {expandedRows.includes(index) && (
                            <tr className="bg-gray-700">
                              <td colSpan="9" className="px-6 ">
                                <div className="p-2">
                                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                                      <tr>
                                        <th scope="col" className="px-6 py-2">
                                          Name
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                          Hours
                                        </th>

                                        <th scope="col" className="px-6 py-2">
                                          Type
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {SubTasksByPlanId.length === 0 ? (
                                        <>
                                          <div>No Subtask to Show</div>
                                        </>
                                      ) : (
                                        <>
                                          {SubTasksByPlanId &&
                                            SubTasksByPlanId.map(
                                              ({ name, hours, type }) => (
                                                <>
                                                  <tr className="bg-white border-b  dark:border-gray-700">
                                                    <td className="px-6 py-2">
                                                      {name}
                                                    </td>
                                                    <td className="px-6 py-2">
                                                      {hours}
                                                    </td>
                                                    <td className="px-6 py-2">
                                                      {type}
                                                    </td>
                                                  </tr>
                                                </>
                                              )
                                            )}
                                        </>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {subTask && (
            <>
              <SubTask setSubTask={setSubTask} planName={planName} />
            </>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Plan;
