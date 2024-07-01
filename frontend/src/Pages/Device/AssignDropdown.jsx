import React from "react";

const AssignDropdown = ({
  device,
  handleMakeAvailable,
  setAssignDropdownOpen,
  setAssignDevice,
  setDeviceId,
  modalRef,
  assignDropdownOpen,
}) => {
  return (
    <>
      {assignDropdownOpen === device._id && (
        <div
          ref={modalRef}
          className="absolute ml-0 z-10 bg-white divide-y divide-gray-100 rounded-lg lg:w-44 shadow-md left-[-90%] lg:left-[-50%]"
        >
          <ul className="flex flex-col gap-1 py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#21A8710D] text-green-500"
                onClick={() => {
                  setAssignDropdownOpen(null);
                  setAssignDevice(true);
                  setDeviceId(device._id);
                }}
              >
                Assign
              </button>
            </li>
            <li>
              <button
                className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-[#e6e9ef] bg-[#9ba0ac1a] text-gray-900"
                onClick={() => {
                  handleMakeAvailable(device._id);
                  setAssignDropdownOpen(null); // Close the assign dropdown
                }}
              >
                Available
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AssignDropdown;
