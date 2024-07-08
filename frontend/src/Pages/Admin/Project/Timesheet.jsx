


import React, { useState, useEffect } from "react";
import { Svg } from "../../../Components/Svg.jsx";
import { useParams } from "react-router-dom";
import Pagination from "../../../Components/Pagination.jsx";
import { getApi } from "../../../Utils/API.js";
import { FaSortDown } from "react-icons/fa";

const Timesheet = () => {
  const { id } = useParams();
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const today = new Date();
  const defaultStartDate = today.toISOString().split("T")[0];
  const defaultEndDate = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .split("T")[0];
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

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
  const totalPages = Math.ceil(groupedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const formatTotalTime = (totalTime) => {
    const [hours, minutes] = totalTime.split(":").map(Number);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
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
                    Date
                    <Svg />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center text-black">
                    Total Time
                    <Svg />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center text-black">More</div>
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
                        {new Date(group.data[0].date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {calculateTotalTime(group)}
                      </td>
                      <td
                        className="px-6 py-4 text-gray-900 whitespace-nowrap"
                        onClick={() => toggleRowExpansion(index)}
                      >
                        <FaSortDown
                          size={23}
                          className={`ml-1 transition-transform duration-300 transform ${
                            group.expanded ? "rotate-180" : ""
                          }`}
                        />
                      </td>
                    </tr>
                    {group.expanded && (
                      <tr key={`${index}-details`} className="bg-gray-100">
                        <td colSpan="4" className="px-6 py-4">
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
                                      {new Date(item.date).toLocaleDateString()}
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
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end m-4">
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
