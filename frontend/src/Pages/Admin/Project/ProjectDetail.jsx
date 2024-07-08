import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

import Plan from "./Plan.jsx";
import { getApi, postApi } from "../../../Utils/API.js";
import Resource from "./Resource.jsx";
import { Svg } from "../../../Components/Svg.jsx";
import Timesheet from "./Timesheet.jsx";

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
  const [projectName, setProjectName] = useState("");

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

    const fetchProjectName = async () => {
      const url = `/api/project/get-project/${id}`;
      const response = await getApi(url);
      console.log("this is my project name ", response.data.data.projectName);
      setProjectName(response.data.data.projectName);
    };

    fetchProjectName();

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
          <IoArrowBackSharp onClick={() => navigate(`/project`)} />
        </span>
        {projectName}
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

export { ProjectDetail, Plan, Resource, Timesheet };
