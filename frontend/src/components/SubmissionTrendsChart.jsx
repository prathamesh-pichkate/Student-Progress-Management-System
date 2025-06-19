import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SubmissionTrendsChart = ({ submissionStats }) => {
  if (!submissionStats || submissionStats.length === 0) {
    return (
      <p className="text-sm text-gray-500">No submission data available.</p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Submission Activity
      </h2>
      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={submissionStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmissionTrendsChart;
