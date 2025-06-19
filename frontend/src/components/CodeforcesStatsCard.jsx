import React from "react";

const CodeforcesStatsCard = ({
  rank,
  maxRank,
  currentRating,
  maxRating,
  contribution,
  lastActive,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Codeforces Stats
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong>Current Rating:</strong>{" "}
          <span className="text-green-600">{currentRating}</span>
        </div>
        <div>
          <strong>Max Rating:</strong>{" "}
          <span className="text-blue-600">{maxRating}</span>
        </div>
        <div>
          <strong>Rank:</strong> <span>{rank}</span>
        </div>
        <div>
          <strong>Max Rank:</strong> <span>{maxRank}</span>
        </div>
        <div>
          <strong>Contribution:</strong> <span>{contribution}</span>
        </div>
        <div>
          <strong>Last Active:</strong>{" "}
          <span>
            {lastActive ? new Date(lastActive).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodeforcesStatsCard;
