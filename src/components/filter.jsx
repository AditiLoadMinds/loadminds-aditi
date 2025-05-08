import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import FilterListIcon from '@mui/icons-material/FilterList';

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
      {/* Search Box */}
      <div className="relative">
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

      {/* Filter Dropdown with Icon */}
      <div className="relative">
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <FilterListIcon style={{ fontSize: 16, marginRight: 8 , color: "gray"}} />
          <select
            onChange={(e) => handleFilterChange(e.target.value, "")}
            className="outline-none bg-transparent w-full text-gray-500"
          >
            <option value="">Filters (0)</option>
            <option value="company">Company</option>
            <option value="pickupLocation">Pickup Location</option>
            <option value="deliveryDate">Delivery Date</option>
            <option value="actions">Actions</option>
          </select>
        </div>
      </div>

      {/* Dynamic Value Selection */}
      {filterColumn && (
        <div className="text-gray-500">
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
    </div>
  );
};

export default FilterBox;
