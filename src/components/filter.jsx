import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FilterBox = ({ data, onFilterChange, onSearchChange = () => {} }) => {
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique values for selected column
  const getUniqueValues = (column) => [...new Set(data.map((item) => item[column]))];

  // Handle filter changes
  const handleFilterChange = (column, value) => {
    setFilterColumn(column);
    setFilterValue(value);
    onFilterChange(column, value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className="flex gap-4 mt-4 items-center">
      {/* Column Selection */}
      <div>
        <label className="block text-gray-600 font-semibold mb-1">Select Column</label>
        <select
          onChange={(e) => handleFilterChange(e.target.value, "")}
          className="border rounded-lg px-3 py-2 bg-white"
        >
          <option value="">None</option>
          <option value="company">Company</option>
          <option value="pickupLocation">Pickup Location</option>
          <option value="deliveryDate">Delivery Date</option>
          <option value="actions">Actions</option>
        </select>
      </div>

      {/* Dynamic Value Selection */}
      {filterColumn && (
        <div>
          <label className="block text-gray-600 font-semibold mb-1">Select Value</label>
          <select
            onChange={(e) => handleFilterChange(filterColumn, e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white"
          >
            <option value="">All</option>
            {getUniqueValues(filterColumn).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search Box */}
      <div className="relative">
        <label className="block text-gray-600 font-semibold mb-1">Search</label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="outline-none w-full"
          />
          {searchTerm && (
            <FaTimes className="text-gray-500 cursor-pointer ml-2" onClick={clearSearch} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
