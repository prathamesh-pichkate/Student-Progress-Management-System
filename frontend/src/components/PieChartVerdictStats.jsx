import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4CAF50", // OK
  "#F44336", // WRONG_ANSWER
  "#FF9800", // TIME_LIMIT_EXCEEDED
  "#2196F3", // COMPILATION_ERROR
  "#9C27B0", // RUNTIME_ERROR
  "#00BCD4", // MEMORY_LIMIT_EXCEEDED
  "#795548", // OTHER
];

const PieChartVerdictStats = ({ verdictData }) => {
  if (!verdictData || verdictData.length === 0) {
    return <p className="text-sm text-gray-500">No verdict data available.</p>;
  }

  return (
    <div
      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6 w-full"
      style={{ minWidth: 300 }}
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Submission Verdicts
      </h2>
      <div className="h-[26rem] sm:h-[28rem]" style={{ padding: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={verdictData}
              dataKey="count"
              nameKey="verdict"
              cx="50%"
              cy="45%"
              outerRadius={100} // increased chart size
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {verdictData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: "12px" }} // smaller tooltip text
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: "12px" }} // smaller legend text
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartVerdictStats;
