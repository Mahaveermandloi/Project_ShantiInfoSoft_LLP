import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { getApi } from "../../../../Utils/API.js";
import Pagination from "../../../../Components/Pagination.jsx";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FaEllipsisH } from "react-icons/fa";
import AddResource from "./AddResource.jsx";
import CreateTimesheet from "./CreateTimesheet.jsx";
import { IoMdAddCircleOutline } from "react-icons/io";

const Resource = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [resourceName, setResourceName] = useState("");

  const [createtimesheetModal, setCreateTimesheetModal] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const url = `/api/resource/get-all-resources/${id}`;
        const response = await getApi(url);

        if (response && response.data && response.data.success) {
          setResources(response.data.data);
          const total = Math.ceil(response.data.data.length / itemsPerPage);
          setTotalPages(total);
        } else {
          console.error(
            "Failed to fetch resources:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [id]);

  const itemsPerPage = 5; // Adjust based on your pagination needs

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredResources = resources.filter((resource) =>
    resource.resourceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = [
    "Name",
    "Working Start Date",
    "Department",
    "Daily Working Type",
  ];

  return (
    <>
      <div>
        <div className="flex lg:justify-end">
          <div className="flex space-x-5">
            
            <div className="flex">
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
              onClick={() => setIsModalOpen(true)}
              className=" bg-[#ee4f50] flex space-x-2 items-center p-2 rounded-lg text-white"
            >
              <span className="text-white">
                <NoteAddIcon />
              </span>
              <span className="hidden lg:block">Add Resource</span>
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : filteredResources.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No resources found
                    </td>
                  </tr>
                ) : (
                  filteredResources
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((resource) => (
                      <tr key={resource._id} className="bg-white border-b">
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          {resource.resourceName}
                        </td>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          {new Date(
                            resource.workingStartDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          Department Name
                        </td>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          {resource.dailyWorkingType}
                        </td>
                        <td className="px-6 py-4 cursor-pointer">
                          <IoMdAddCircleOutline 
                          size={23}
                            onClick={() => {
                              setCreateTimesheetModal(true);
                              setResourceName(resource.resourceName);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <AddResource
              closeModal={closeModal}
              setIsModalOpen={setIsModalOpen}
            />
          )}

          {createtimesheetModal && (
            <CreateTimesheet
              setCreateTimesheetModal={setCreateTimesheetModal}
              resourceName={resourceName}
            />
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Resource;
