import React, { useState } from "react";
import VerticalNavbar from "../components/vertical-nav";
import FilterBox from "../components/filter";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../wrapper/Modal";
import { EditOrder } from "../sections/edit-orders";
import { Link } from "react-router-dom";
import { Pagination } from "../components/pagination";

const transportData = [
  {
    id: 1,
    number: "TRK12345",
    make: "Ford",
    model: "F-150",
    VIN: "1FTRX18L78KC45456",
    licensePlate: "AB123CD",
    actions: "View Details",
  },
  {
    id: 2,
    number: "TRK67890",
    make: "Chevrolet",
    model: "Silverado",
    VIN: "3GCPXUE24AG192984",
    licensePlate: "XY987ZT",
    actions: "Track Shipment",
  },
  {
    id: 3,
    number: "TRL11223",
    make: "Freightliner",
    model: "M2 106",
    VIN: "1FVACWDC9EHF73653",
    licensePlate: "LM123NO",
    actions: "Cancel Order",
  },
  {
    id: 4,
    number: "TRK33445",
    make: "Ram",
    model: "2500",
    VIN: "3C6UR5JLXGG249746",
    licensePlate: "FG123HI",
    actions: "View Details",
  },
  {
    id: 5,
    number: "TRL55667",
    make: "Kenworth",
    model: "T680",
    VIN: "1XKAD49X7GJ213738",
    licensePlate: "JK456LM",
    actions: "Track Shipment",
  },
  {
    id: 6,
    number: "TRK77889",
    make: "International",
    model: "LT625",
    VIN: "3HSDJAPR4EN076234",
    licensePlate: "MN789OP",
    actions: "Cancel Order",
  },
  {
    id: 7,
    number: "TRL99001",
    make: "Peterbilt",
    model: "579",
    VIN: "1XPBDP9X7LD286654",
    licensePlate: "QR123ST",
    actions: "View Details",
  },
  {
    id: 8,
    number: "TRK11224",
    make: "Mack",
    model: "Anthem",
    VIN: "1M2AA18C9JM037888",
    licensePlate: "UV456WX",
    actions: "Track Shipment",
  },
  {
    id: 9,
    number: "TRL33446",
    make: "Volvo",
    model: "VNL 760",
    VIN: "4V4NC9EH9FN973295",
    licensePlate: "YZ678AB",
    actions: "Cancel Order",
  },
  {
    id: 10,
    number: "TRK55668",
    make: "Western Star",
    model: "4900",
    VIN: "5KKVNSR5PBPA20676",
    licensePlate: "CD123EF",
    actions: "View Details",
  },
];

const TRANSPORTS_PER_PAGE = 10;

const Transport = () => {
  const [filteredTransports, setFilteredTransports] = useState(transportData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const totalPages = Math.ceil(filteredTransports.length / TRANSPORTS_PER_PAGE);
  const navigate = useNavigate();

  const filterByCategory = (category) => {
    setSelectedCategory(category);

    let filtered = transportData.filter((item) => {
      if (category === "Trucks") return item.number.startsWith("TRK");
      if (category === "Trailers") return item.number.startsWith("TRL");
      return true; // "All" category shows everything
    });

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransports(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (column, value) => {
    let filtered = value
      ? transportData.filter((item) => item[column] === value)
      : transportData;
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
    let filtered = transportData.filter((item) =>
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
        {/* Category Filter Buttons */}
        <div className="border-b-2 border-gray-200 w-full">
          <div className="flex flex-row gap-4 ">
            {["Trucks", "Trailers", "All"].map((category) => (
              <button
                key={category}
                className={`text-md px-4 py-1 r ${
                  selectedCategory === category
                    ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-row justify-between items-center gap-8 mt-4">
          <FilterBox
            data={transportData}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearch}
          />
          <button
            onClick={() => navigate("/add-truck")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Truck
          </button>
        </div>

        {/* Transport Table */}
        <div className="mt-4">
        <table className="border border-gray-300 w-full rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">NUMBER</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">MAKE</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">MODEL</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">VIN</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">LICENSE PLATE</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransports.map((transport) => (
                <tr key={transport.id} className="text-center">
                  <td className="border p-2">{transport.number}</td>
                  <td className="border p-2">{transport.make}</td>
                  <td className="border p-2">{transport.model}</td>
                  <td className="border p-2">{transport.VIN}</td>
                  <td className="border p-2">{transport.licensePlate}</td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-4">
                    <Link to="/transport/edit-truck">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={handleOpenEdit}
                      >
                        <FaEdit/>
                      </button>
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
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
        <Pagination/>
      </div>
    </div>
  );
};

export default Transport;
