import React, { useState } from "react";
import VerticalNavbar from "../components/vertical-nav";
import FilterBox1 from "../components/filter1";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../wrapper/Modal";
import { EditOrder } from "../sections/edit-orders";
import { Link } from "react-router-dom";

// Expanded Broker Data
const brokersData = [
  {
    id: 1,
    brokerName: "LogiCorp Brokers",
    papsEmail: "paps@logicorp.com",
    parsEmail: "pars@logicorp.com",
    contact: "+1-123-456-7890",
  },
  {
    id: 2,
    brokerName: "TransWay Logistics",
    papsEmail: "info@transway.com",
    parsEmail: "entry@transway.com",
    contact: "+1-234-567-8901",
  },
  {
    id: 3,
    brokerName: "NorthBridge Freight",
    papsEmail: "paps@northbridge.com",
    parsEmail: "pars@northbridge.com",
    contact: "+1-345-678-9012",
  },
  {
    id: 4,
    brokerName: "Maple Gate Brokers",
    papsEmail: "border@maplegate.ca",
    parsEmail: "entry@maplegate.ca",
    contact: "+1-456-789-0123",
  },
  {
    id: 5,
    brokerName: "RapidClear Customs",
    papsEmail: "paps@rapidclear.com",
    parsEmail: "pars@rapidclear.com",
    contact: "+1-567-890-1234",
  },
  {
    id: 6,
    brokerName: "Eagle Border Solutions",
    papsEmail: "solutions@eagle.com",
    parsEmail: "info@eagle.com",
    contact: "+1-678-901-2345",
  },
  {
    id: 7,
    brokerName: "BlueHawk Brokers",
    papsEmail: "contact@bluehawk.com",
    parsEmail: "clearance@bluehawk.com",
    contact: "+1-789-012-3456",
  },
  {
    id: 8,
    brokerName: "TrueNorth Trade",
    papsEmail: "support@truenorth.com",
    parsEmail: "customs@truenorth.com",
    contact: "+1-890-123-4567",
  },
  {
    id: 9,
    brokerName: "ExpressLine Customs",
    papsEmail: "express@linecustoms.com",
    parsEmail: "entry@linecustoms.com",
    contact: "+1-901-234-5678",
  },
  {
    id: 10,
    brokerName: "CargoMaster Brokers",
    papsEmail: "cargo@master.com",
    parsEmail: "email@cargomaster.com",
    contact: "+1-012-345-6789",
  },
  {
    id: 11,
    brokerName: "Atlas BorderLine",
    papsEmail: "atlas@borderline.com",
    parsEmail: "pars@borderline.com",
    contact: "+1-135-246-3579",
  },
  {
    id: 12,
    brokerName: "Nova Customs Group",
    papsEmail: "nova@customsgrp.com",
    parsEmail: "pars@novagrp.com",
    contact: "+1-246-357-4680",
  },
  {
    id: 13,
    brokerName: "Guardian Freight Forwarders",
    papsEmail: "guardian@freight.com",
    parsEmail: "entry@guardianfreight.com",
    contact: "+1-357-468-5791",
  },
  {
    id: 14,
    brokerName: "EastBound Logistics",
    papsEmail: "eastbound@logi.com",
    parsEmail: "pars@eastbound.com",
    contact: "+1-468-579-6802",
  },
  {
    id: 15,
    brokerName: "Delta Trade Partners",
    papsEmail: "delta@tradepartners.com",
    parsEmail: "support@delta.com",
    contact: "+1-579-680-7913",
  },
  {
    id: 16,
    brokerName: "Everest Border Services",
    papsEmail: "info@everestborder.com",
    parsEmail: "help@everestborder.com",
    contact: "+1-680-791-8024",
  },
  {
    id: 17,
    brokerName: "Pinnacle Brokerage Co.",
    papsEmail: "pinnacle@brokerage.com",
    parsEmail: "entry@pinnacle.com",
    contact: "+1-791-802-9135",
  },
  {
    id: 18,
    brokerName: "TradeLink Border",
    papsEmail: "tradelink@border.com",
    parsEmail: "info@tradelink.com",
    contact: "+1-802-913-0246",
  },
  {
    id: 19,
    brokerName: "NorthPeak Logistics",
    papsEmail: "northpeak@logistics.com",
    parsEmail: "north@peak.com",
    contact: "+1-913-024-1357",
  },
  {
    id: 20,
    brokerName: "Vanguard Trade Brokers",
    papsEmail: "vanguard@trade.com",
    parsEmail: "vanguard@customs.com",
    contact: "+1-024-135-2468",
  },
];

const BROKERS_PER_PAGE = 10;

const Broker = () => {
  const [filteredBrokers, setFilteredBrokers] = useState(brokersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const totalPages = Math.ceil(filteredBrokers.length / BROKERS_PER_PAGE);
  const navigate = useNavigate();

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = brokersData.filter((broker) =>
      [broker.brokerName, broker.papsEmail, broker.parsEmail, broker.contact]
        .some((field) => field.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredBrokers(filtered);
    setCurrentPage(1);
  };

  const paginatedBrokers = filteredBrokers.slice(
    (currentPage - 1) * BROKERS_PER_PAGE,
    currentPage * BROKERS_PER_PAGE
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
      <div className="w-full h-auto m-6">
        {/* Search & Filter */}
        <div className="flex flex-row justify-between items-center gap-8 mt-4">
          <FilterBox1
            data={brokersData}
            onFilterChange={() => {}}
            onSearchChange={handleSearch}
          />
          <button
            onClick={() => navigate("/add-broker")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Broker
          </button>
        </div>

        {/* Broker Table */}
        <div className="mt-4">
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border p-2">Broker Name</th>
                <th className="border p-2">PAPS Email</th>
                <th className="border p-2">PARS Email</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBrokers.map((broker) => (
                <tr key={broker.id} className="text-center">
                  <td className="border p-2">{broker.brokerName}</td>
                  <td className="border p-2">{broker.papsEmail}</td>
                  <td className="border p-2">{broker.parsEmail}</td>
                  <td className="border p-2">{broker.contact}</td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={handleOpenEdit}
                      >
                        <FaEdit />
                      </button>

                      <Modal isOpen={showEditModal} onClose={handleCloseEdit}>
                        <EditOrder onClose={handleCloseEdit} />
                      </Modal>

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
              {filteredBrokers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No brokers found
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

export default Broker;
