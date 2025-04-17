import React, { useState } from "react";
import VerticalNavbar from "../components/vertical-nav";
import FilterBox from "../components/filter";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";

const driverData = [
    {
      id: 1,
      name: "John Doe",
      dob: "1990-05-14",
      licenseNumber: "D123456789",
      address: "123 Main St, Cityville",
      phone: "123-456-7890",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      dob: "1985-08-22",
      licenseNumber: "D987654321",
      address: "456 Elm St, Townsville",
      phone: "987-654-3210",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Mike Johnson",
      dob: "1975-03-10",
      licenseNumber: "D111222333",
      address: "789 Oak St, Villageville",
      phone: "555-123-4567",
      email: "mike@example.com",
    },
    {
      id: 4,
      name: "Alice Brown",
      dob: "1992-11-30",
      licenseNumber: "D444555666",
      address: "321 Pine St, Hamletown",
      phone: "666-777-8888",
      email: "alice@example.com",
    },
    {
      id: 5,
      name: "Chris Evans",
      dob: "1988-02-17",
      licenseNumber: "D789456123",
      address: "159 Maple Ave, Springdale",
      phone: "222-333-4444",
      email: "chris.evans@example.com",
    },
    {
      id: 6,
      name: "Natalie Portman",
      dob: "1993-06-25",
      licenseNumber: "D654321987",
      address: "852 Birch Rd, Laketown",
      phone: "333-444-5555",
      email: "natalie@example.com",
    },
    {
      id: 7,
      name: "Tom Holland",
      dob: "1996-11-01",
      licenseNumber: "D147258369",
      address: "951 Cedar Blvd, Rockhill",
      phone: "777-888-9999",
      email: "tom.h@example.com",
    },
    {
      id: 8,
      name: "Emma Watson",
      dob: "1990-04-15",
      licenseNumber: "D369258147",
      address: "357 Poplar St, Greenfield",
      phone: "111-222-3333",
      email: "emma.watson@example.com",
    },
    {
      id: 9,
      name: "David Beckham",
      dob: "1977-05-02",
      licenseNumber: "D852963741",
      address: "753 Willow Way, Riverdale",
      phone: "888-999-0000",
      email: "david.b@example.com",
    },
    {
      id: 10,
      name: "Scarlett Johansson",
      dob: "1984-11-22",
      licenseNumber: "D963741258",
      address: "468 Aspen Lane, Newtown",
      phone: "999-000-1111",
      email: "scarlett@example.com",
    },
  ];
const TRANSPORTS_PER_PAGE = 10;

const Driver = () => {
  const [filteredTransports, setFilteredTransports] = useState(driverData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const totalPages = Math.ceil(filteredTransports.length / TRANSPORTS_PER_PAGE);
  const navigate = useNavigate();


  const handleFilterChange = (column, value) => {
    let filtered = value
      ? driverData.filter((item) => item[column] === value)
      : driverData;
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTransports(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    let filtered = driverData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(term.toLowerCase())
    );
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => {
        if (selectedCategory === "Trucks") return item.number.startsWith("TRK");
        if (selectedCategory === "Trailers") return item.number.startsWith("TRL");
        return true;
      });
    }
    setFilteredTransports(filtered);
    setCurrentPage(1);
  };

  const paginatedTransports = filteredTransports.slice(
    (currentPage - 1) * TRANSPORTS_PER_PAGE,
    currentPage * TRANSPORTS_PER_PAGE
  );

  const handleOpenEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="h-screen flex">
      <VerticalNavbar />
      <div className="w-full h-auto m-10">
        
        
        {/* Search & Filter */}
        <div className="flex flex-row justify-between items-center gap-8 mt-4">
          <FilterBox
            data={driverData}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearch}
          />
          <button
            onClick={() => navigate("/transport/add-driver")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + Add Driver
          </button>
        </div>

        {/* Transport Table */}
        <div className="mt-4">
          <table className="border-collapse border border-gray-300 w-full">
          <thead>
  <tr className="bg-gray-200">
    <th className="border p-2">Name</th>
    <th className="border p-2">Date of Birth</th>
    <th className="border p-2">License Number</th>
    <th className="border p-2">Address</th>
    <th className="border p-2">Phone</th>
    <th className="border p-2">Email</th>
    <th className="border p-2">Actions</th>
  </tr>
</thead>
<tbody>
  {paginatedTransports.map((driver) => (
    <tr key={driver.id} className="text-center">
      <td className="border p-2">{driver.name}</td>
      <td className="border p-2">{driver.dob}</td>
      <td className="border p-2">{driver.licenseNumber}</td>
      <td className="border p-2">{driver.address}</td>
      <td className="border p-2">{driver.phone}</td>
      <td className="border p-2">{driver.email}</td>
      <td className="border p-2">
        <div className="flex justify-center gap-4">
          <Link to="/edit-driver">
            <button className="text-blue-600 hover:underline" onClick={handleOpenEdit}>
              <FaEdit />
            </button>
          </Link>
          <button className="text-red-600 hover:text-red-800" title="Delete">
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  ))}

              {filteredTransports.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No transports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white rounded-lg ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Driver;
