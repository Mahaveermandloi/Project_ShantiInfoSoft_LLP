import React, { useRef, useEffect, useState } from "react";
import { putApi } from "../../../Utils/API";

const AssignDropdown = ({
  deviceId,
  handleAssignDropdownToggle,
  openAssignDevice,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleAssignDropdownToggle(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const makeAvailable = async (deviceId) => {
    const url = `/api/device/assign-device/${deviceId}`;

    const response = await putApi(deviceId, url);

    if (response.statusCode === 200) {
      toast.success("Device Freed Successfully");

      setTimeout(() => {
        closeModal();
        reset();
        window.location.reload();
      }, 1000);
    } else {
      alert("Some error occurred");
      toast.error("Some Error occured");
    }
  };

  return (
    <>
    
    </>
  );
};

export default AssignDropdown;

