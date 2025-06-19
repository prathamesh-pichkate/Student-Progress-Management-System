import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const ContestHistoryTable = ({ contests }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  if (!contests || contests.length === 0) {
    return <p className="text-sm text-gray-500">No contest data available.</p>;
  }

  // Calculate current page items
  const offset = currentPage * itemsPerPage;
  const currentItems = contests.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(contests.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Correctly get selected page from event.selected
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md mb-6 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Contest History
      </h2>

      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-4 py-2">Contest</th>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Old Rating</th>
            <th className="px-4 py-2">New Rating</th>
            <th className="px-4 py-2">Change</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((contest, idx) => (
            <tr
              key={offset + idx}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="px-4 py-2">{contest.name}</td>
              <td className="px-4 py-2">{contest.rank}</td>
              <td className="px-4 py-2">{contest.oldRating}</td>
              <td className="px-4 py-2">{contest.newRating}</td>
              <td
                className={`px-4 py-2 ${
                  contest.ratingChange >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {contest.ratingChange >= 0 ? "+" : ""}
                {contest.ratingChange}
              </td>
              <td className="px-4 py-2">{contest.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex space-x-2 text-gray-700 dark:text-gray-300 select-none"
          pageClassName="cursor-pointer px-3 py-1 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          activeClassName="bg-blue-600 text-white"
          previousClassName="cursor-pointer px-3 py-1 border rounded-l-md hover:bg-gray-200 dark:hover:bg-gray-700"
          nextClassName="cursor-pointer px-3 py-1 border rounded-r-md hover:bg-gray-200 dark:hover:bg-gray-700"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakLabel={"..."}
          breakClassName="px-3 py-1"
          forcePage={currentPage} // keep UI in sync with state
        />
      </div>
    </div>
  );
};

export default ContestHistoryTable;
