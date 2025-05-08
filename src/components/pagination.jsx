import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Pagination=()=>{
    // const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const navigate = useNavigate();
  //const entriesPerPage = 20;
  const totalEntries = 200;
  const entriesPerPageOptions = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

  // Initialize states
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  // Handle "Go to Page" input
  const handleGoToPage = (e) => {
    const page = Math.min(Math.max(parseInt(e.target.value), 1), totalPages);
    setCurrentPage(page);
  };

  // Handle Entries per page change
  const handleEntriesPerPageChange = (e) => {
    const newEntriesPerPage = parseInt(e.target.value);
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1); // Reset to page 1 when entries per page change
  };
  return (
    <div className="flex justify-center items-center mt-4 gap-4">
      {/* Showing Entries Text */}
      <div className="flex gap-4 items-center">
        <span className="text-gray-700">
          Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries
        </span>

        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-black rounded-lg ${
            currentPage === 1
              ? "cursor-not-allowed"
              : ""
          }`}
        >
          {"<"}
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }, (_, index) => {
            const page = Math.min(currentPage - (currentPage % 5) + index + 1, totalPages);
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-full text-lg ${
                  page === currentPage
                    ? "bg-blue-300 text-white"
                    : "hover:bg-gray-400"
                }`}
                style={{
                  boxSizing: "border-box", // Ensures padding/border are included in the width/height
                  minWidth: "40px", // Ensures the button is wide enough
                }}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-black rounded-lg ${
            currentPage === totalPages
              ? " cursor-not-allowed"
              : ""
          }`}
        >
          {">"}
        </button>
      </div>

      {/* "Go to Page" Input */}
      <div className="flex items-center gap-4">
        <label htmlFor="goToPage" className="text-gray-700">Go to page:</label>
        <input
          type="number"
          id="goToPage"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={handleGoToPage}
          className="px-3 py-1 border rounded"
          style={{
            boxSizing: "border-box",
            minWidth: "60px", // Adjusts input box size
          }}
        />
      </div>

      {/* Entries Per Page Dropdown */}
      <div className="flex items-center gap-4">
        <label htmlFor="entriesPerPage" className="text-gray-700">Entries per page:</label>
        <select
          id="entriesPerPage"
          value={entriesPerPage}
          onChange={handleEntriesPerPageChange}
          className="px-3 py-1 border rounded"
          style={{
            boxSizing: "border-box",
            minWidth: "120px", // Adjusts dropdown width
          }}
        >
          {entriesPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};