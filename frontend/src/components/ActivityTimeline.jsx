import React from "react";

const ActivityTimeline = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p className="text-gray-500 text-sm">No recent activity.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Activity Timeline
      </h2>
      <ul className="space-y-4 border-l-2 border-blue-500 pl-4">
        {activities.map((activity, index) => (
          <li key={index} className="relative">
            <span className="absolute -left-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-900"></span>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {activity.message}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(activity.date).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTimeline;
