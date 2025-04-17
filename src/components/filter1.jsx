import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FilterBox1 = ({ data, onFilterChange, onSearchChange = () => {} }) => {
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getUniqueValues = (column) => [...new Set(data.map((item) => item[column]))];

  const handleFilterChange = (column, value = "") => {
    setFilterColumn(column);
    setFilterValue(value);
    onFilterChange(column, value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className="flex gap-4 mt-4 items-center flex-wrap">
      {/* Column Selector */}
      <div>
        <label className="block text-gray-600 font-semibold mb-1">Filter By</label>
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white"
        >
          <option value="">None</option>
          <option value="brokerName">Broker Name</option>
          <option value="papsEmail">PAPS Email</option>
          <option value="parsEmail">PARS Email</option>
          <option value="contact">Contact</option>
        </select>
      </div>

      {/* Value Selector */}
      {filterColumn && (
        <div>
          <label className="block text-gray-600 font-semibold mb-1">Select Value</label>
          <select
            onChange={(e) => handleFilterChange(filterColumn, e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white"
            value={filterValue}
          >
            <option value="">All</option>
            {getUniqueValues(filterColumn).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <label className="block text-gray-600 font-semibold mb-1">Search</label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search brokers..."
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

export default FilterBox1;
