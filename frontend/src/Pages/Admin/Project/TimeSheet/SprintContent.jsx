import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getApi2, getApi } from "../../../../Utils/API.js";
import Pagination from "../../../../Components/Pagination.jsx";
import { FaSortDown } from "react-icons/fa";
import {
  SprintContentHeader1,
  SprintContentHeader2,
  SprintContentHeader3,
  sprintTableHeaders,
} from "../../../../Components/TableHeaders.jsx";

const SprintContent = () => {
  const { id } = useParams();
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const [departmentData, setDepartmentData] = useState({}); // State to store expanded data
  const itemsPerPage = 5;

  const [sprint, setSprints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/timesheet/get-all-timesheets/${id}`;
        const response = await getApi(url);

        if (response.data.statusCode === 200) {
          const data = response.data.data;

          const groupedBySprint = data.reduce((acc, item) => {
            const sprintName = item.sprintName;
            if (!acc[sprintName]) {
              acc[sprintName] = {
                startDate: item.date,
                endDate: item.date,
                resources: {},
              };
            }

            if (new Date(item.date) < new Date(acc[sprintName].startDate)) {
              acc[sprintName].startDate = item.date;
            }

            if (new Date(item.date) > new Date(acc[sprintName].endDate)) {
              acc[sprintName].endDate = item.date;
            }

            const resourceName = item.resourceName;
            acc[sprintName].resources[resourceName] =
              acc[sprintName].resources[resourceName] || [];
            acc[sprintName].resources[resourceName].push(item);
            return acc;
          }, {});

          setGroupedData(groupedBySprint);
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
  }, [id]);

  useEffect(() => {
    const fetchSprints = async () => {
      const url = `/api/plan/get-all-plans/${id}`;
      try {
        const response = await getApi(url);
        if (response.data.success) {
          setSprints(response.data.data);
        } else {
          console.error(
            "Failed to fetch sprints:",
            response.data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    };

    fetchSprints();
  }, [id]);

  const calculateTotalTime = (items) => {
    const totalMinutes = items.reduce((total, item) => {
      const [hours, minutes] = item.totalTime.split(":").map(Number);
      return total + hours * 60 + minutes;
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const minutesToHourMinuteString = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const toggleRowExpansion = async (jobRole, sprintName) => {
    const rowKey = `${sprintName}-${jobRole}`;
    if (!expandedRows.includes(rowKey)) {
      try {
        const data = { department: jobRole, sprintName };
        const route = `/api/timesheet/get-timesheet-by-department`;
        const response = await getApi2(data, route);

        const totalHours = response.data.reduce((total, resource) => {
          // Ensure totalHours is a string in "hh:mm" format
          const formattedTotalHours =
            typeof resource.totalHours === "string"
              ? resource.totalHours
              : "0:00"; // Default to "0:00" if not in expected format

          const [hours, minutes] = formattedTotalHours.split(":").map(Number);
          return total + hours * 60 + minutes;
        }, 0);

        setDepartmentData((prev) => ({
          ...prev,
          [rowKey]: {
            department: jobRole,
            totalHours: minutesToHourMinuteString(totalHours),
            resources: response.data,
          },
        }));
      } catch (error) {
        console.error("Error fetching expanded data:", error);
      }
    }

    setExpandedRows((prev) =>
      prev.includes(rowKey)
        ? prev.filter((key) => key !== rowKey)
        : [...prev, rowKey]
    );
  };

  const totalPages = Math.ceil(Object.keys(groupedData).length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="relative overflow-y-auto lg:overflow-visible overflow-scroll shadow-md sm:rounded-lg">
        <div className="bg-gray-100">
          <table className="lg:w-full text-sm text-left rtl:text-right dark:text-gray-400">
            <SprintContentHeader1 />
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : Object.keys(groupedData).length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No data found
                  </td>
                </tr>
              ) : (
                Object.keys(groupedData).map((sprintName) => (
                  <React.Fragment key={sprintName}>
                    <tr className="bg-gray-400 border-b">
                      {[
                        { content: sprintName },
                        {
                          content: new Date(
                            groupedData[sprintName].startDate
                          ).toLocaleDateString(),
                        },
                        {
                          content: new Date(
                            groupedData[sprintName].endDate
                          ).toLocaleDateString(),
                        },
                        {
                          content: calculateTotalTime(
                            Object.values(
                              groupedData[sprintName].resources
                            ).flat()
                          ),
                        },
                      ].map((item, index) => (
                        <td
                          key={index}
                          className="px-6 py-4 text-gray-900 whitespace-nowrap cursor-pointer"
                        >
                          <div className="flex items-center text-base">
                            {item.content}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="mt-2 mb-4">
                      <td colSpan="4" className="px-3 bg-white">
                        <div className="py-2">
                          <table className="w-full text-sm text-left text-gray-500">
                            <SprintContentHeader3 />
                            <tbody>
                              {sprintTableHeaders &&
                                sprintTableHeaders.map((item) => (
                                  <React.Fragment key={item}>
                                    <tr className=" border-b dark:bg-gray-100 dark:border-gray-700">
                                      <td className="px-6 py-4">{item}</td>
                                      <td className="px-6 py-4">
                                        {departmentData[`${sprintName}-${item}`]
                                          ?.totalHours > 600 ? (
                                          <span className="text-red-500">
                                            {
                                              departmentData[
                                                `${sprintName}-${item}`
                                              ]?.totalHours
                                            }
                                          </span>
                                        ) : departmentData[
                                            `${sprintName}-${item}`
                                          ]?.totalHours > 570 ? (
                                          <span className="text-green-500">
                                            {
                                              departmentData[
                                                `${sprintName}-${item}`
                                              ]?.totalHours
                                            }
                                          </span>
                                        ) : (
                                          <span className="text-yellow-500">
                                            {
                                              departmentData[
                                                `${sprintName}-${item}`
                                              ]?.totalHours
                                            }
                                          </span>
                                        )}
                                      </td>
                                      <td className="px-6 py-4">
                                        <FaSortDown
                                          size={25}
                                          onClick={() =>
                                            toggleRowExpansion(item, sprintName)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    {expandedRows.includes(
                                      `${sprintName}-${item}`
                                    ) && (
                                      <tr className="">
                                        <td colSpan="3" className="px-6 py-4">
                                          <div className="p-2">
                                            <table className="w-full text-sm text-left text-gray-500">
                                              <thead className="bg-gray-200">
                                                <tr>
                                                  <th className="px-6 py-2">
                                                    Resource Name
                                                  </th>
                                                  <th className="px-6 py-2">
                                                    Hours
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {departmentData[
                                                  `${sprintName}-${item}`
                                                ]?.resources.map(
                                                  (resource, index) => (
                                                    <tr
                                                      className="bg-white border-b dark:bg-gray-100 dark:border-gray-700"
                                                      key={index}
                                                    >
                                                      <td className="px-6 py-4">
                                                        {resource.resourceName}
                                                      </td>
                                                      <td className="px-6 py-4">
                                                        {minutesToHourMinuteString(
                                                          resource.totalHours
                                                        )}
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                ))}
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
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default SprintContent;








