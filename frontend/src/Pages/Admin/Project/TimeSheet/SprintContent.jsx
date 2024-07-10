import React, { useState, useEffect } from "react";
import { Svg } from "../../../../Components/Svg.jsx";
import { useParams } from "react-router-dom";
import Pagination from "../../../../Components/Pagination.jsx";
import { getApi } from "../../../../Utils/API.js";
import {
  SprintContentHeader1,
  SprintContentHeader2,
} from "../../../../Components/TableHeaders.jsx";

const SprintContent = ({ startDate, endDate }) => {
  const { id } = useParams();
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

          const groupedBySprint = filteredData.reduce((acc, item) => {
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
  }, [id, startDate, endDate]);

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
                      <td colSpan="4" className="px-6 bg-white">
                        <div className="p-2">
                          <table className="w-full text-sm text-left text-gray-500">
                            <SprintContentHeader2 />

                            <tbody>
                              {Object.keys(
                                groupedData[sprintName].resources
                              ).map((resourceName) => (
                                <tr
                                  className="bg-white border-b dark:bg-gray-100 dark:border-gray-700"
                                  key={resourceName}
                                >
                                  <td className="px-6 py-4">{resourceName}</td>
                                  <td className="px-6 py-4">
                                    {new Date(
                                      groupedData[sprintName].resources[
                                        resourceName
                                      ][0].date
                                    ).toLocaleDateString()}
                                  </td>

                                  <td className="px-6 py-4">
                                    {calculateTotalTime(
                                      groupedData[sprintName].resources[
                                        resourceName
                                      ]
                                    )}
                                  </td>
                                </tr>
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
