// import React, { useState } from "react";
// import Timesheet from "./Employee";
// import SprintContent from "./SprintContent";
// import FilterUsingDate from "./FilterUsingDate";
// import Employee from "./Employee";

// const TimesheetTab = () => {
//   const tabs = [
//     { name: "Employee", key: "employee" },
//     { name: "Sprint", key: "sprint" },
//   ];

//   const today = new Date();
//   const defaultStartDate = today.toISOString().split("T")[0];
//   const defaultEndDate = new Date(today.setDate(today.getDate() + 7))
//     .toISOString()
//     .split("T")[0];

//   const [startDate, setStartDate] = useState(defaultStartDate);
//   const [endDate, setEndDate] = useState(defaultEndDate);
//   const [activeTab, setActiveTab] = useState("employee");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "employee":
//         return <Employee startDate={startDate} endDate={endDate} />; // Pass dates as props

//       case "sprint":
//         return <SprintContent startDate={startDate} endDate={endDate} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className=" rounded-lg">
//       <div className="lg:flex justify-between   items-center gap-5 bg-gray-100 rounded-lg">
//         <div>
//           {/* Tab Navigation */}
//           <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 bg-gray-100 rounded-lg">
//             <ul className="flex flex-wrap -mb-px">
//               {tabs.map((tab, index) => (
//                 <li key={index} className="me-2">
//                   <button
//                     onClick={() => setActiveTab(tab.key)}
//                     className={`inline-block p-2 lg:p-4 border-b-2 rounded-t-lg ${
//                       activeTab === tab.key
//                         ? "text-[#ee4f50] border-[#ee4f50]"
//                         : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
//                     }`}
//                   >
//                     {tab.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <FilterUsingDate
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//         />
//       </div>

//       <div className="mt-4">{renderContent()}</div>
//     </div>
//   );
// };

// export default TimesheetTab;

import React, { useState } from "react";
import Timesheet from "./Employee";
import SprintContent from "./SprintContent";
import FilterUsingDate from "./FilterUsingDate";
import Employee from "./Employee";

const TimesheetTab = () => {
  const tabs = [
    { name: "Employee", key: "employee" },
    { name: "Sprint", key: "sprint" },
  ];

  const today = new Date();
  const defaultStartDate = today.toISOString().split("T")[0];
  const defaultEndDate = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [activeTab, setActiveTab] = useState("employee");

  const renderContent = () => {
    switch (activeTab) {
      case "employee":
        return (
          <>
            <Employee startDate={startDate} endDate={endDate} />
          </>
        );

      case "sprint":
        return <SprintContent startDate={startDate} endDate={endDate} />;

      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg">
      <div className="lg:flex justify-between items-center gap-5 bg-gray-100 rounded-lg">
        <div>
          {/* Tab Navigation */}
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 bg-gray-100 rounded-lg">
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
        </div>

        {activeTab === "employee" && (
          <FilterUsingDate
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
      </div>

      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default TimesheetTab;
