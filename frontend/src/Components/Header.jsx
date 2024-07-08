import React, { useState, useEffect } from "react";
import { FaUserTie, FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/Images/Shantilogo.png";
import { URL_Path } from "../Utils/constant";
import { Toast } from "../Components/Toast.jsx";

import user from "../../public/Images/user.png";
import { MdHelpOutline } from "react-icons/md";
import { postApi } from "../Utils/API";
import { toast } from "react-toastify";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  let email = "";
  email = localStorage.getItem("email");

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

  const handleLogout = async () => {
    const url = `/logout`;
    const role = localStorage.getItem("role");

    const data = { role };
    console.log(data); // Ensure the data object is correct

    try {
      const response = await postApi(data, url);

      console.log(response);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken === null) {
        toast.success(`${role.toLocaleUpperCase()} logged out successfully `);
        navigate("/login");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <Toast />
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
              <span>{email}</span>
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
