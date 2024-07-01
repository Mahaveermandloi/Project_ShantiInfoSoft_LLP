import React, { useState, useEffect } from "react";
import { FaUserTie, FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/Images/Shantilogo.png";

import user from "../../public/Images/user.png";
import { MdHelpOutline } from "react-icons/md";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove access token from localStorage
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <header className="shadow-lg sticky top-0 z-50 bg-white border-gray-200 lg:justify-between lg:p-5 lg:items-center lg:flex flex justify-around items-center h-16">
        <div className="lg:hidden">
          <GiHamburgerMenu size={40} onClick={toggleSidebar} />
        </div>

        <div className="p-5">
          <img src={logo} alt="Logo" className="h-14" />
        </div>

        <div className="hidden lg:flex items-center space-x-5">
          <div className="flex space-x-2">
            <MdHelpOutline size={20} />
            <p>Help</p>
          </div>
          <div className="border-l-2 border-black h-12 ml-5" />

          <div className="relative">
            <Link
              to="#"
              onClick={toggleDropdown}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <img src={user} className="h-10" alt="" />
              <span>Sagar Sir</span>
              <FaAngleDown className="ml-1" />
            </Link>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex justify-center">
        <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </>
  );
};

export default Header;
