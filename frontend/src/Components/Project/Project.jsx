import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FaEllipsisH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../Utils/API";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/project/get-projects";
        const response = await getApi(url);
        console.log("help help help");
        if (response) {
          setProjects(response.data.data); // Assuming response.data is an array of projects

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
          {/* TABLE */}
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
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={tableHeaders.length} className="text-center p-4">
                    No Projects Found
                  </td>
                </tr>
              ) : (
                projects.map((project, index) => (
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
    </div>
  );
};

export default Project;

const Svg = () => {
  return (
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  );
};
