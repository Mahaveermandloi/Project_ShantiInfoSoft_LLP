import React, { useRef, useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteApi, putApi } from "../../Utils/API.js";
import { Svg } from "../../Components/Svg.jsx";
import Pagination from "../../Components/Pagination.jsx";
import { URL_Path } from "../../Utils/constant.jsx";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AssignDevice from "./AssignDevice.jsx";
import AssignDropdown from "./AssignDropdown.jsx";
import DeleteDevice from "./DeleteDevice.jsx"; // Import the DeleteDevice component

const DeviceTable = ({
  devices,
  loading,
  currentPage,
  totalPages,
  handlePageChange,
  handleUpdateModalOpen,
  setIsUpdateModalOpen,
  setDevices,
  searchTerm = "", // Default searchTerm to an empty string
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [assignDevice, setAssignDevice] = useState(null);
  const [assignDropdownOpen, setAssignDropdownOpen] = useState(null);
  const [deviceIdToDelete, setDeviceIdToDelete] = useState(""); // State to hold deviceId to delete

  const [id, setId] = useState();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDropdownOpen(null);
        setAssignDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (deviceId) => {
    setDropdownOpen(dropdownOpen === deviceId ? null : deviceId);
    setAssignDropdownOpen(null); // Close the assign dropdown if the main dropdown is toggled
  };

  const handleAssignDropdownToggle = (deviceId) => {
    setId(deviceId);
    setAssignDropdownOpen(assignDropdownOpen === deviceId ? null : deviceId);
  };

  const handleDeleteDevice = (deviceId) => {
    setDeviceIdToDelete(deviceId); // Set the device id to delete
  };

  const onSubmit = async (deviceId) => {
    try {
      const url = `/api/device/avail-device/${deviceId}`;
      const data = "";

      const response = await putApi(data, url);
      console.log("this is response data", response.data);

      if (response.statusCode === 200) {
        toast.success("Device Availed Successfully");
        window.location.reload();

        setTimeout(() => {
          setAssignDevice(null);
          reset();
        }, 1000);
      } else {
        toast.error(response.message || "Some Error Occurred");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error(error.response?.data?.message || "Some Error Occurred");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Request":
        return "text-yellow-500";
      case "Available":
        return "text-black";
      case "Assign":
        return "text-green-500";
      default:
        return "text-black";
    }
  };

  const handleDownload = (Bill) => {
    const url = `${URL_Path}${Bill}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "download.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tableHeaders = [
    "Device Name",
    "Category",
    "Status",
    "Purchased Date",
    "Warranty",
  ];

  const filteredDevices = devices.filter((device) =>
    device.DeviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;

  return (
    <>
      <div className="relative mt-5 lg:overflow-visible overflow-scroll shadow-md sm:rounded-lg">
        <table className="lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredDevices.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No devices found
                </td>
              </tr>
            ) : (
              filteredDevices
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((device) => (
                  <tr key={device._id} className="bg-white border-b">
                    <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                      <img
                        src={`${URL_Path}${device.Image}`}
                        className="w-10 h-10"
                        alt="image"
                      />
                      <div>{device.DeviceName}</div>
                    </td>

                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {device.Category}
                    </td>

                    <td
                      className={`px-6 py-4 ${getStatusColor(
                        device.Status
                      )} whitespace-nowrap`}
                    >
                      {device.Status}
                    </td>

                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {device.PurchasedDate}
                    </td>

                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {device.WarrantyStartDate}
                    </td>

                    <td className="px-6 py-4 relative">
                      <FaEllipsisH
                        onClick={() => {
                          handleDropdownToggle(device._id);
                        }}
                        className="cursor-pointer"
                      />

                      {dropdownOpen === device._id && (
                        <div
                          ref={modalRef}
                          className="absolute ml-0 z-10 bg-white divide-y divide-gray-100 rounded-lg lg:w-44 shadow-md left-[-90%] lg:left-[-50%]"
                        >
                          <ul className="py-2 text-sm flex flex-col gap-1 text-gray-700 dark:text-gray-200">
                            <li>
                              <button
                                className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#21A8710D] text-green-500"
                                onClick={() => {
                                  handleAssignDropdownToggle(device._id);

                                  setDropdownOpen(false);
                                }}
                              >
                                <PersonOutlineOutlinedIcon
                                  size={25}
                                  className="text-green-500"
                                />
                                <span className="">Assign</span>
                              </button>
                            </li>

                            <li>
                              <button
                                className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#f7faff] text-black"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  handleUpdateModalOpen(device._id);
                                  setDropdownOpen(null);
                                }}
                              >
                                <TbEdit size={25} />
                                <span className="">Edit</span>
                              </button>
                            </li>

                            <li>
                              <button
                                className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#f3e9ea] bg-[#fef4f5] text-[#E71D36]"
                                onClick={() => {
                                  handleDeleteDevice(device._id);
                                  setDropdownOpen(null);
                                }}
                              >
                                <AiOutlineDelete size={25} />
                                <span className="">Delete</span>
                              </button>
                            </li>

                            <li>
                              <button
                                className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#f3e9ea] bg-[#9ba0ac1a] text-gray-900"
                                onClick={() => {
                                  setDropdownOpen(null);
                                  handleDownload(device.Bill);
                                }}
                              >
                                <FileDownloadOutlinedIcon size={25} />
                                <span className="">Download Bill</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}

                      {assignDropdownOpen === device._id && (
                        <>
                          <div
                            ref={modalRef}
                            className="absolute ml-0 z-10 bg-white divide-y divide-gray-100 rounded-lg lg:w-44 shadow-md left-[-90%] lg:left-[-50%]"
                          >
                            <ul className="flex flex-col gap-1 py-2 text-sm text-gray-700 dark:text-gray-200">
                              <li>
                                <button
                                  className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#21A8710D] text-green-500"
                                  onClick={() => {
                                    setAssignDevice(device._id);
                                  }}
                                >
                                  Assign
                                </button>
                              </li>
                              <li>
                                <button
                                  className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#9ba0ac1a] text-gray-900"
                                  onClick={() => {
                                    onSubmit(device._id);
                                  }}
                                >
                                  Available
                                </button>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {assignDevice === id && (
        <>
          <AssignDevice
            assignDevice={assignDevice}
            setAssignDevice={setAssignDevice}
          />
        </>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {deviceIdToDelete && (
        <DeleteDevice
          closeModal={() => setDeviceIdToDelete("")}
          deviceId={deviceIdToDelete}
          setDevices={setDevices}
        />
      )}
    </>
  );
};

export default DeviceTable;
