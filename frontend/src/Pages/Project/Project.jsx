import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FaEllipsisH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../Utils/API";
import Pagination from "../../Components/Pagination";
import { Svg } from "../../Components/Svg"; // Adjust the import path as needed

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/project/get-projects";
        const response = await getApi(url);
        if (response) {
          setProjects(response.data.data);
          console.log("Projects fetched successfully:", response.data.data);
        } else {
          console.error("Failed to fetch projects:", response.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const tableHeaders = [
    "Project Name",
    "Project Type",
    "Project Start Date",
    "Members/Resources",
    "Document",
  ];

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <h1 className="text-3xl font-semibold">Project</h1>

      <div className="mt-5 lg:mt-4 lg:flex justify-between">
        <div>
          <p className="text-gray-400">{projects.length} Projects</p>
        </div>

        <div className="flex items-center justify-evenly space-x-2 lg:space-x-5 mt-2">
          <div className="flex lg:mt-0 h-10">
            <input
              type="text"
              placeholder="Search"
              className="p-2 bg-gray-100 w-60 rounded-l-md"
            />
            <CiSearch size={40} className="bg-gray-100 p-2 rounded-r-md" />
          </div>

          <button
            onClick={() => navigate("/project/addproject")}
            className="bg-[#ee4f50] flex space-x-2 items-center h-10 p-3 lg:p-2 rounded-lg text-white"
          >
            <NoteAddIcon className="text-white" />
            <span className="hidden lg:block">Add Project</span>
          </button>
        </div>
      </div>

      <div>
        <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th scope="col" className="px-6 py-3" key={index}>
                    <div className="flex items-center text-black">
                      {header}
                      <a href="#">
                        <Svg />
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentProjects.length === 0 ? (
                <tr>
                  <td colSpan={tableHeaders.length} className="text-center p-4">
                    No Projects Found
                  </td>
                </tr>
              ) : (
                currentProjects.map((project, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      {project.projectName}
                    </th>
                    <td className="px-6 py-4">{project.projectType}</td>
                    <td className="px-6 py-4">{project.projectStartDate}</td>
                    <td className="px-6 py-4">{project.membersResources}</td>
                    <td className="px-6 py-4">{project.document}</td>
                    <td className="px-6 py-4">
                      <FaEllipsisH
                        onClick={() =>
                          navigate(`/project/projectdetail/${project._id}`)
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Project;
