// // // EmployeeTable.jsx
// // import React from "react";
// // import { FaEllipsisH } from "react-icons/fa";
// // import { TbEdit } from "react-icons/tb";
// // import { AiOutlineDelete } from "react-icons/ai";

// // const EmployeeTable = ({
// //   loading,
// //   employees,
// //   currentPage,
// //   itemsPerPage,
// //   handleDropdownToggle,
// //   dropdownOpen,
// //   handleUpdateModalOpen,
// //   handleDelete,
// // }) => {
// //   const tableHeaders = ["Employee", "Job Role", "Email"];

// //   return (
// //     <div className="relative mt-5 shadow-md overflow-x-auto sm:rounded-lg">
// //       <table className="lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
// //         <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
// //           <tr>
// //             {tableHeaders.map((header, index) => (
// //               <th scope="col" className="px-6 py-3" key={index}>
// //                 <div className="flex items-center text-black">
// //                   {header}
// //                   <Svg />
// //                 </div>
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {loading ? (
// //             <tr>
// //               <td colSpan="4" className="text-center py-4">
// //                 Loading...
// //               </td>
// //             </tr>
// //           ) : employees.length === 0 ? (
// //             <tr>
// //               <td colSpan="4" className="text-center py-4">
// //                 No employees found
// //               </td>
// //             </tr>
// //           ) : (
// //             employees
// //               .slice(
// //                 (currentPage - 1) * itemsPerPage,
// //                 currentPage * itemsPerPage
// //               )
// //               .map((employee) => (
// //                 <tr key={employee._id} className="bg-white border-b z-30">
// //                   <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
// //                     {employee.Name}
// //                   </td>
// //                   <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
// //                     {employee.Job_Role}
// //                   </td>
// //                   <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
// //                     {employee.Email}
// //                   </td>
// //                   <td className="px-6 py-4 relative">
// //                     <FaEllipsisH
// //                       onClick={() => handleDropdownToggle(employee._id)}
// //                       className="cursor-pointer"
// //                     />

// //                     {dropdownOpen === employee._id && (
// //                       <div className="absolute ml-0 z-10 bg-white divide-y divide-gray-100 rounded-lg lg:w-32 shadow-md left-[-90%] lg:left-[-50%]">
// //                         {/* Modal content */}
// //                         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
// //                           <li>
// //                             <button
// //                               className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#f7faff] hover:bg-[] text-black"
// //                               onClick={() => {
// //                                 handleUpdateModalOpen(employee._id);
// //                               }}
// //                             >
// //                               <TbEdit size={25} />
// //                               <span className="">Edit</span>
// //                             </button>
// //                           </li>

// //                           <li>
// //                             <button
// //                               className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#f3e9ea] bg-[#fef4f5] text-[#E71D36]"
// //                               onClick={() => handleDelete(employee._id)}
// //                             >
// //                               <AiOutlineDelete size={25} />
// //                               <span className="">Delete</span>
// //                             </button>
// //                           </li>
// //                         </ul>
// //                       </div>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };



// // export default EmployeeTable;



// import React from "react";
// import { FaEllipsisH } from "react-icons/fa";
// import { AiOutlineDelete } from "react-icons/ai";
// import { TbEdit } from "react-icons/tb";

// const Svg = () => {
//     return (
//       <svg
//         className="w-3 h-3 ms-1.5"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
//       </svg>
//     );
//   };

// const EmployeeTable = ({
//   loading,
//   currentPage,
//   itemsPerPage,
//   filteredEmployees,
//   handleDropdownToggle,
//   handleDelete,
//   setIsUpdateModalOpen,
//   setSelectedEmployeeId,
// }) => {
//   const tableHeaders = ["Employee", "Job Role", "Email"];

//   return (
//     <div className="">
//       <div className="relative mt-5  shadow-md overflow-x-auto  sm:rounded-lg">
//         <table className="lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
//             <tr>
//               {tableHeaders.map((header, index) => (
//                 <th scope="col" className="px-6 py-3" key={index}>
//                   <div className="flex items-center text-black">
//                     {header}
//                     <Svg />
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">
//                   Loading...
//                 </td>
//               </tr>
//             ) : filteredEmployees.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">
//                   No employees found
//                 </td>
//               </tr>
//             ) : (
//               filteredEmployees
//                 .slice(
//                   (currentPage - 1) * itemsPerPage,
//                   currentPage * itemsPerPage
//                 )
//                 .map((employee) => (
//                   <tr key={employee._id} className="bg-white border-b z-30">
//                     <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
//                       {employee.Name}
//                     </td>
//                     <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
//                       {employee.Job_Role}
//                     </td>
//                     <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
//                       {employee.Email}
//                     </td>
//                     <td className="px-6 py-4 relative">
//                       <FaEllipsisH
//                         onClick={() => handleDropdownToggle(employee._id)}
//                         className="cursor-pointer"
//                       />

//                       {dropdownOpen === employee._id && (
//                         <div className="absolute ml-0 z-10 bg-white divide-y divide-gray-100 rounded-lg lg:w-32 shadow-md left-[-90%] lg:left-[-50%]">
//                           {/* Modal content */}
//                           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                             <li>
//                               <button
//                                 className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef]  bg-[#f7faff] hover:bg-[] text-black"
//                                 onClick={() => {
//                                   setIsUpdateModalOpen(true);
//                                   setSelectedEmployeeId(employee._id);
//                                 }}
//                               >
//                                 <TbEdit size={25} />
//                                 <span className="">Edit</span>
//                               </button>
//                             </li>

//                             <li>
//                               <button
//                                 className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#f3e9ea] bg-[#fef4f5] text-[#E71D36]"
//                                 onClick={() => handleDelete(employee._id)}
//                               >
//                                 <AiOutlineDelete size={25} />
//                                 <span className="">Delete</span>
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeTable;

import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

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

const EmployeeTable = ({
  loading,
  currentPage,
  itemsPerPage,
  filteredEmployees,
  handleDropdownToggle,
  handleDelete,
  setIsUpdateModalOpen,
  setSelectedEmployeeId,
}) => {
  const tableHeaders = ["Employee", "Job Role", "Email"];

  // Handle loading state or empty filteredEmployees
  if (loading) {
    return (
      <div className="text-center py-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!filteredEmployees || filteredEmployees.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No employees found</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="relative mt-5  shadow-md overflow-x-auto  sm:rounded-lg">
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
            </tr>
          </thead>

          <tbody>
            {filteredEmployees
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((employee) => (
                <tr key={employee._id} className="bg-white border-b z-30">
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                    {employee.Name}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                    {employee.Job_Role}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                    {employee.Email}
                  </td>
                  <td className="px-6 py-4 relative">
                    <FaEllipsisH
                      onClick={() => handleDropdownToggle(employee._id)}
                      className="cursor-pointer"
                    />

                    {dropdownOpen === employee._id && (
                      <div className="absolute ml-0 z-10 bg-white divide-y divide-gray-100 rounded-lg lg:w-32 shadow-md left-[-90%] lg:left-[-50%]">
                        {/* Modal content */}
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            <button
                              className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef]  bg-[#f7faff] hover:bg-[] text-black"
                              onClick={() => {
                                setIsUpdateModalOpen(true);
                                setSelectedEmployeeId(employee._id);
                              }}
                            >
                              <TbEdit size={25} />
                              <span className="">Edit</span>
                            </button>
                          </li>

                          <li>
                            <button
                              className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#f3e9ea] bg-[#fef4f5] text-[#E71D36]"
                              onClick={() => handleDelete(employee._id)}
                            >
                              <AiOutlineDelete size={25} />
                              <span className="">Delete</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
