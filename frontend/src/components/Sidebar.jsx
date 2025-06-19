import React, { useState } from "react";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => currentPath === path;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="fixed top-4 left-4 z-50 sm:hidden">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md text-white bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-blue-800 text-white border-r border-blue-700
          w-[250px] 
          transform transition-transform duration-300 ease-in-out
          z-50

          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:static sm:flex sm:flex-col sm:w-[250px]
        `}
      >
        <div className="flex flex-col  h-full p-6">
          {/* Header: Site Title + Close Button on mobile */}
          <div className="flex items-center justify-between mb-6">
            <span className=" text-xl font-bold hidden md:inline">
              Student Progress Management System
            </span>
            <span className="text-xl font-bold sm:hidden">SPMS</span>

            {/* Close button on mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="sm:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <hr className="my-4 border-white opacity-30" />

          {/* Navigation */}
          <ul className="space-y-4">
            <li>
              <a
                href="/"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition ${
                  isActive("/")
                    ? "bg-white text-blue-800"
                    : "hover:bg-white hover:text-blue-800 text-white"
                }`}
                onClick={() => setIsOpen(false)} // close menu on link click (mobile)
              >
                <LayoutDashboard size={20} />
                <span className=" sm:inline md:text-lg">Dashboard</span>
              </a>
            </li>

            <li>
              <ThemeToggleButton />
            </li>

            <li>
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium hover:bg-white hover:text-blue-800 transition"
                onClick={() => setIsOpen(false)}
              >
                <LogOut size={20} />
                <span className=" sm:inline md:text-lg">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
