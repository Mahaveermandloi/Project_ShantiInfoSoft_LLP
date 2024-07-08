import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import { Toast } from "../../../Components/Toast.jsx";
import AddDevice from "./AddDevice";
import EditDevice from "./EditDevice.jsx"; // Ensure this is imported
import DeviceSearchBox from "./DeviceSearchBox";
import DeviceTable from "./DeviceTable";

const Device = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModal, setIsUpdateModalOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdateModalOpen = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setIsUpdateModalOpen(true);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        const url = `/api/device/get-device`;
        const response = await getApi(url);

        if (response && response.data && response.data.success) {
          setDevices(response.data.data);
          console.log(response.data.data);
          const total = Math.ceil(response.data.data.length / itemsPerPage);
          setTotalPages(total);
        } else {
          console.error(
            "Failed to fetch devices:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Toast />
      <div className="lg:w-10/12 lg:ml-auto">
        <h1 className="text-3xl flex items-center font-semibold">Devices</h1>

        <DeviceSearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          openModal={openModal}
          deviceCount={devices.length}
        />

        <div className="">
          <DeviceTable
            devices={devices}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleUpdateModalOpen={handleUpdateModalOpen}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setDevices={setDevices}
            searchTerm={searchTerm}
          />

          {isModalOpen && <AddDevice closeModal={closeModal} />}

          {isUpdateModal && (
            <EditDevice
              closeModal={closeUpdateModal}
              deviceId={selectedDeviceId}
            />
          )}

          
        </div>
      </div>
    </>
  );
};

export default Device;
