import React from "react";

const HeaderSection = ({ name, email, handle, lastSync }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          {name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          CF Handle: <span className="text-blue-600 font-medium">{handle}</span>
        </p>
      </div>

      <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
        Last Synced:{" "}
        <span className="font-medium text-gray-700 dark:text-white">
          {new Date(lastSync).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default HeaderSection;
