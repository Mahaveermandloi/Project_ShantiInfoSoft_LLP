import { AiOutlineSetting } from "react-icons/ai";
import { GoProject } from "react-icons/go";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { GrUserWorker } from "react-icons/gr";
import { TbDevices2 } from "react-icons/tb";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = () => {
    if (isMobileScreen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isOpen && isMobileScreen && (
        <div
          className="fixed inset-0 overflow-y-auto bg-white bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed flex flex-col top-22 left-0 h-[calc(100vh-4rem)] lg:w-1/6 z-50   text-black p-5 shadow-2xl  transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="overflow-y-auto h-full custom-scrollbar">
          <ul>
            {sidebarItems.map((item, index) => (
              <Link key={index} onClick={handleItemClick} to={item.to}>
                <li className="mb-4 flex items-center cursor-pointer lg:text-xl text-lg hover:bg-gray-100 p-2 rounded">
                  {item.iconComponent && (
                    <span className="mr-2">{item.iconComponent}</span>
                  )}
                  {item.text}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0; /* Remove scrollbar space */
          background: transparent; /* Optional: just make scrollbar invisible */
        }
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </>
  );
};

export default SideBar;

const sidebarItems = [
  { iconComponent: <RxDashboard />, text: "Dashboard", to: "/dashboard" },
  {
    iconComponent: <HiOutlineUserGroup />,
    text: "Meeting Rooms",
    to: "/meeting-rooms",
  },

  { iconComponent: <GrUserWorker />, text: "Employee", to: "/employee" },
  { iconComponent: <TbDevices2 />, text: "Device", to: "/device" },
  { iconComponent: <GoProject />, text: "Project", to: "/project" },
  { iconComponent: <AiOutlineSetting />, text: "Setting", to: "/setting" },
];
