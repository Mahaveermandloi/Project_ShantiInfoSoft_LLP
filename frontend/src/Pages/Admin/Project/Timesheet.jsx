import React, { useState, useEffect } from "react";
import { Svg } from "../../../Components/Svg.jsx";
import { useParams } from "react-router-dom";
import Pagination from "../../../Components/Pagination.jsx";
import { getApi } from "../../../Utils/API.js";
import { FaSortDown } from "react-icons/fa";

const Timesheet = () => {
  const [Subtask, setSubTask] = useState([]);
  const [sprintName, setSprintName] = useState("");
  const [Sprint, setSprints] = useState([]);
  const [projectName, setProjectName] = useState("");

  const { id } = useParams();
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedSprint, setSelectedSprint] = useState("");

  const [selectedSubtask, setSelectedSubtask] = useState("");

  const today = new Date();
  const defaultStartDate = today.toISOString().split("T")[0];
  const defaultEndDate = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .split("T")[0];
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/timesheet/get-all-timesheets/${id}`;
        const response = await getApi(url);
        if (response.data.statusCode === 200) {
          const data = response.data.data;

          const filteredData = data.filter((item) => {
            const itemDate = new Date(item.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return itemDate >= start && itemDate <= end;
          });

          const grouped = filteredData.reduce((acc, item) => {
            acc[item.resourceName] = acc[item.resourceName] || [];
            acc[item.resourceName].push(item);
            return acc;
          }, {});

          const groupedArray = Object.keys(grouped).map((resourceName) => ({
            resourceName,
            data: grouped[resourceName],
          }));

          console.log(groupedArray);

          setNewData(groupedArray);

          console.log(newData);
          setGroupedData(groupedArray);

          setLoading(false);
        } else {
          setLoading(false);
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, startDate, endDate]);

  useEffect(() => {
    const fetchProjectName = async () => {
      const url = `/api/project/get-project/${id}`;
      try {
        const response = await getApi(url);
        console.log("Project Name:", response.data.data.projectName);
        setProjectName(response.data.data.projectName);
      } catch (error) {
        console.error("Error fetching project name:", error);
      }
    };

    const fetchSprints = async () => {
      const url = `/api/plan/get-all-plans/${id}`;
      try {
        const response = await getApi(url);
        console.log("Sprints:", response);
        if (response && response.data && response.data.success) {
          setSprints(response.data.data);
        } else {
          console.error(
            "Failed to fetch sprints:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    };

    fetchSprints();
    fetchProjectName();
  }, [id]);

  useEffect(() => {
    if (sprintName) {
      const fetchSubtasks = async () => {
        const url = `/api/project/get-subtask-by-name/${sprintName}`;
        try {
          const response = await getApi(url);

          setSubTask(response.data.data);
        } catch (error) {
          console.error("Error fetching subtasks:", error);
        }
      };

      fetchSubtasks();
    }
  }, [sprintName]);

  const toggleRowExpansion = (index) => {
    setCurrentPage(1); // Reset page when expanding rows
    setGroupedData((prevData) =>
      prevData.map((group, idx) =>
        idx === index ? { ...group, expanded: !group.expanded } : group
      )
    );
  };

  const calculateTotalTime = (group) => {
    const totalMinutes = group.data.reduce((total, item) => {
      const [hours, minutes] = item.totalTime.split(":").map(Number);
      return total + hours * 60 + minutes;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const paginatedData = groupedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("this is paginated Data ", paginatedData);

  const totalPages = Math.ceil(groupedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const formatTotalTime = (totalTime) => {
    const [hours, minutes] = totalTime.split(":").map(Number);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const filterUsingSprintName = (sprintName, subtask, resourceName) => {
    const filteredData = newData.map((group) => {
      if (group.resourceName === resourceName) {
        return {
          ...group,
          data: group.data.filter((item) => {
            if (!item) return false; // Check if item is defined
            if (sprintName && item.sprintName !== sprintName) return false;
            if (subtask && item.subTaskName !== subtask) return false;
            return true;
          }),
        };
      }
      return group;
    });

    setGroupedData(filteredData);
  };

  return (
    <>

      <div className="flex justify-between lg:justify-end gap-5 lg:mr-10">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="text-xs">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-100 px-2 py-1 rounded-md text-gray-900 whitespace-nowrap"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="text-xs">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-100 px-2 py-1 rounded-md text-gray-900 whitespace-nowrap"
          />
        </div>
      </div>

      <div className="relative overflow-y-auto lg:overflow-visible overflow-scroll shadow-md sm:rounded-lg">
        <div className="overflow-y-auto h-[337px] bg-gray-100">
          <table className="lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center text-black">
                    Name
                    <Svg />
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center text-black">
                    Total Time
                    <Svg />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : groupedData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedData.map((group, index) => (
                  <React.Fragment key={index}>
                    <tr className="bg-white border-b">
                      <td
                        className="px-6 py-4 text-gray-900 whitespace-nowrap cursor-pointer"
                        onClick={() => toggleRowExpansion(index)}
                      >
                        <div className="flex items-center">
                          {group.resourceName}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {calculateTotalTime(group)}
                      </td>
                    </tr>

                    <div className="flex my-3 ml-10 gap-10 ">
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="sprint"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sprint:
                        </label>
                        <select
                          id="sprint"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500
                           text-black
                          focus:border-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            const selectedValue = e.target.value;

                            setSelectedSprint(selectedValue);
                            setSprintName(selectedValue);
                            filterUsingSprintName(
                              e.target.value,
                              selectedSubtask,
                              group.resourceName
                            );
                          }}
                        >
                          <option value="" className="text-black">
                            Select Sprint
                          </option>
                          {Sprint.map(({ epicName, _id }) => (
                            <option
                              key={_id}
                              value={epicName}
                              className="text-black"
                            >
                              {epicName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="subtask"
                          className="block text-sm font-medium text-gray-700"
                        >
                          SubTask:
                        </label>
                        <select
                          id="subtask"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                          text-black
                          "
                          onChange={(e) => {
                            setSelectedSubtask(e.target.value);
                            filterUsingSprintName(
                              selectedSprint,
                              e.target.value,
                              group.resourceName
                            );
                          }}
                        >
                          <option value="">Select SubTask</option>
                          {Subtask.map(({ name, _id }) => (
                            <option
                              key={_id}
                              value={name}
                              className="text-black"
                            >
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <tr key={`${index}-details`} className="bg-gray-900 mt-2">
                      <td colSpan="4" className="px-6">
                        <div className="p-2">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-6 py-2">
                                  Sprint Name
                                </th>
                                <th scope="col" className="px-6 py-2">
                                  Sub Task
                                </th>
                                <th scope="col" className="px-6 py-2">
                                  Date
                                </th>
                                <th scope="col" className="px-6 py-2">
                                  Start Time
                                </th>
                                <th scope="col" className="px-6 py-2">
                                  End Time
                                </th>
                                <th scope="col" className="px-6 py-2">
                                  Hours
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.data.length === 0 ? (
                                <>
                                  <p>No data found</p>
                                </>
                              ) : (
                                <>
                                  {group.data.map((item, subIndex) => (
                                    <tr
                                      key={`${index}-sub-${subIndex}`}
                                      className="bg-white border-b dark:bg-gray-100 dark:border-gray-700"
                                    >
                                      <td className="px-6 py-4">
                                        {item.sprintName}
                                      </td>
                                      <td className="px-6 py-4">
                                        {item.subTaskName}
                                      </td>

                                      <td className="px-6 py-4">
                                        {/* {new Date(
                                          item.date
                                        ).toLocaleDateString()} */}
                                        {item.date
                                          ? new Date(
                                              item.date
                                            ).toLocaleDateString()
                                          : "No date"}

                                        {/* {item.date} */}
                                      </td>

                                      <td className="px-6 py-4">
                                        {item.startTime}
                                      </td>
                                      <td className="px-6 py-4">
                                        {item.endTime}
                                      </td>

                                      <td className="px-6 py-4">
                                        {formatTotalTime(item.totalTime)}
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center   ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>



    </>
  );
};

export default Timesheet;
