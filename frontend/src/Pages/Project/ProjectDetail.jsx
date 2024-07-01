import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FaEllipsisH } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Plan from "./Plan.jsx";
import { getApi, postApi } from "../../Utils/API.js";
import Resource from "./Resource.jsx";

const tabs = [
  { name: "Project Detail", key: "projectDetail" },
  { name: "Plan", key: "plan" },
  { name: "Resource", key: "resource" },
  { name: "Timesheet", key: "timesheet" },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const url = `/api/project/get-project/${id}`;
        const response = await getApi(url);

        if (response && response.data && response.data.success) {
          setProjectDetails(response.data.data);
          console.log("Project fetched successfully:", response.data.data);
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

    fetchProjectDetails();
  }, [id]);

  const [activeTab, setActiveTab] = useState("projectDetail");

  const renderContent = () => {
    switch (activeTab) {
      case "projectDetail":
        return (
          <>
            {projectDetails && (
              <>
                <div className="space-y-2">
                  <h2 className="text-sm text-gray-400">Project Name</h2>
                  <p className="text-md font-semibold">
                    {projectDetails.projectName}
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-sm text-gray-400">Short Description</h2>
                  <p className="text-md font-semibold">
                    {projectDetails.shortDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-sm text-gray-400">Project Type</h2>
                  <p className="text-md font-semibold">
                    {projectDetails.website} - {projectDetails.mobileApp}
                  </p>
                </div>

                <h2 className="text-md font-semibold">
                  Technologies to be used
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {projectDetails && projectDetails.design && (
                    <div className="space-y-2">
                      <h2 className="text-sm text-gray-400">Design</h2>
                      <p className="text-md font-semibold">
                        {projectDetails.design}
                      </p>
                    </div>
                  )}

                  {projectDetails && projectDetails.html && (
                    <div className="space-y-2">
                      <h2 className="text-sm text-gray-400">HTML</h2>
                      <p className="text-md font-semibold">
                        {projectDetails.html}
                      </p>
                    </div>
                  )}

                  {projectDetails && projectDetails.backendApi && (
                    <div className="space-y-2">
                      <h2 className="text-sm text-gray-400">Backend API</h2>
                      <p className="text-md font-semibold">
                        {projectDetails.backendApi}
                      </p>
                    </div>
                  )}

                  {projectDetails && projectDetails.db && (
                    <div className="space-y-2">
                      <h2 className="text-sm text-gray-400">Database</h2>
                      <p className="text-md font-semibold">
                        {projectDetails.db}
                      </p>
                    </div>
                  )}

                  {projectDetails && projectDetails.qa && (
                    <div className="space-y-2">
                      <h2 className="text-sm text-gray-400">QA</h2>
                      <p className="text-md font-semibold">
                        {projectDetails.qa}
                      </p>
                    </div>
                  )}

                  {projectDetails && projectDetails.leadResource && (
                    <div className="space-y-2">
                      <h2 className="text-sm text-gray-400">Lead Resource</h2>
                      <p className="text-md font-semibold">
                        {projectDetails.leadResource}
                      </p>
                    </div>
                  )}

                  {projectDetails && projectDetails.codeReview && (
                    <div className="space-y-2">
                      <h2 className="text-sm text-gray-400">Code Review</h2>
                      <p className="text-md font-semibold">
                        {projectDetails.codeReview}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            {!projectDetails && <p>Loading...</p>}
          </>
        );
      case "plan":
        return <Plan />;
      case "resource":
        return <Resource />;
      case "timesheet":
        return <Timesheet />;
      default:
        return null;
    }
  };

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <h1 className="text-3xl flex items-center font-semibold">
        <span className="cursor-pointer hover:bg-gray-50">
          <IoArrowBackSharp onClick={() => navigate("/project")} />
        </span>
        Project Detail
      </h1>

      <div className="text-sm mt-5 font-medium text-center text-gray-500 border-b border-gray-200 bg-gray-100 rounded-lg">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab, index) => (
            <li key={index} className="me-2">
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`inline-block p-2 lg:p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.key
                    ? "text-[#ee4f50] border-[#ee4f50]"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8 py-5">{renderContent()}</div>
    </div>

    
  );
};

const Timesheet = () => {
  return (
    <>
      <div>Timesheet content should open</div>
    </>
  );
};

export { ProjectDetail, Plan, Resource, Timesheet };

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
