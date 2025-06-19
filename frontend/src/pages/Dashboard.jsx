import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import StudentTable from "../components/StudentTable";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div
        className={`flex-1 overflow-y-auto p-4 ${
          theme === "light"
            ? "bg-gray-50 text-gray-800"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">
          Student Progress Management System
        </h1>

        <StatsCard />

        <div className="mt-8">
          <StudentTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
