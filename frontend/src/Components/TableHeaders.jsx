import { Svg } from "./Svg";

export const SprintContentHeader2 = () => {
  return (
    <>
      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-2">
            Resource Name
          </th>
          <th scope="col" className="px-6 py-2">
            Date
          </th>
          <th scope="col" className="px-6 py-2">
            Hours
          </th>
        </tr>
      </thead>
    </>
  );
};

export const SprintContentHeader1 = () => {
  return (
    <>
      <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              Sprint Name
              <Svg />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              Start Date
              <Svg />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              End Date
              <Svg />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              Total Time
              <Svg />
            </div>
          </th>
        </tr>
      </thead>
    </>
  );
};

export const sprintTableHeaders = [
  "UI/UX developer",
  "Backend developer",
  "Frontend developer",
  "Frontend developer (Mobile)",
  "Business Analyst",
  "Quality Analyst",
  "Project Manager",
  "Human Resource",
  "Marketing",
];

export const SprintContentHeader3 = () => {
  return (
    <>
      <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">Department</div>
          </th>

          <th scope="col" className="px-6 py-3">
            Hours
          </th>
          <th scope="col" className="px-6 py-3">
            More
          </th>
        </tr>
      </thead>
    </>
  );
};

const tableHeaders = [
  "Epic Name",
  "Priority",
  "Start Date",
  "Due Date",
  "Estimated Time",
  "Total Time",
];

export const PlanHeader1 = () => {
  return (
    <>
      <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
        <tr>
          {tableHeaders.map((header, index) => (
            <th scope="col" className="px-6 py-3" key={index}>
              <div className="flex items-center text-black">{header}</div>
            </th>
          ))}
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
          <th scope="col" className="px-6 py-3">
            More
          </th>
        </tr>
      </thead>
    </>
  );
};

const resourceHeaders = [
  "Name",
  "Working Start Date",
  "Department",
  "Daily Working Type",
];

export const ResourceHeader1 = () => {
  return (
    <>
      <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
        <tr>
          {resourceHeaders.map((header, index) => (
            <th scope="col" className="px-6 py-3" key={index}>
              <div className="flex items-center text-black">{header}</div>
            </th>
          ))}
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
    </>
  );
};
