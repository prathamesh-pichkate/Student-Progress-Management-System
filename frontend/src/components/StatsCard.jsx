import React, { useEffect, useState } from "react";
import { fetchStudentStats } from "../api/studentApi";

const StatsCard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStudentStats();

        const formattedStats = [
          {
            label: "Total Students",
            value: data.totalStudents,
            change: "+12%",
            description: "from last month",
            icon: "👥",
            iconBg: "bg-blue-100 dark:bg-blue-900",
            iconColor: "text-blue-600 dark:text-blue-300",
            changeColor: "text-green-600 dark:text-green-400",
          },
          {
            label: "Active Today",
            value: data.activeToday,
            change: "+5%",
            description: "from yesterday",
            icon: "📈",
            iconBg: "bg-green-100 dark:bg-green-900",
            iconColor: "text-green-600 dark:text-green-300",
            changeColor: "text-green-600 dark:text-green-400",
          },
          {
            label: "Avg Rating",
            value: data.avgRating,
            change: "+23",
            description: "points this week",
            icon: "🏆",
            iconBg: "bg-purple-100 dark:bg-purple-900",
            iconColor: "text-purple-600 dark:text-purple-300",
            changeColor: "text-green-600 dark:text-green-400",
          },
          {
            label: "Inactive Users",
            value: data.inactiveUsers,
            change: "+2",
            description: "from last week",
            icon: "⚠️",
            iconBg: "bg-red-100 dark:bg-red-900",
            iconColor: "text-red-600 dark:text-red-300",
            changeColor: "text-red-600 dark:text-red-400",
          },
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error("Error fetching student stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        Loading stats...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${stat.iconBg}`}
            >
              <span className={`text-xl ${stat.iconColor}`}>{stat.icon}</span>
            </div>
          </div>
          <p className={`mt-4 text-sm font-medium ${stat.changeColor}`}>
            {stat.change}{" "}
            <span className="text-gray-500 dark:text-gray-400 font-normal">
              {stat.description}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
