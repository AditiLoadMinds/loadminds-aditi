import React, { useState } from "react";
import VerticalNavbar from "../components/vertical-nav";
import FilterBox from "../components/filter";
import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../wrapper/Modal";
import { EditOrder } from "../sections/edit-orders";
import { EditPOD } from "../sections/edit-pod";
import { Link } from "react-router-dom";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { FaEdit, FaTrash } from "react-icons/fa";
import Edit from "@mui/icons-material/Edit";

const ordersData = [
  {
    id: 1,
    customerOrderNo: "CUST12345",
    orderNo: "ORD98765",
    company: "XYZ Logistics",
    pickupDate: "2025-04-02",
    pickupLocation: "New York, NY",
    deliveryDate: "2025-04-05",
    status: "Delivered",
    actions: "View Details",
  },
  {
    id: 2,
    customerOrderNo: "CUST67890",
    orderNo: "ORD54321",
    company: "ABC Transport",
    pickupDate: "2025-04-03",
    pickupLocation: "Los Angeles, CA",
    deliveryDate: "2025-04-06",
    status: "In Transit",
    actions: "Track Shipment",
  },
  {
    id: 3,
    customerOrderNo: "CUST11223",
    orderNo: "ORD99887",
    company: "LMN Freight",
    pickupDate: "2025-04-04",
    pickupLocation: "Chicago, IL",
    deliveryDate: "2025-04-07",
    status: "Delivered",
    actions: "Cancel Order",
  },
  {
    id: 4,
    customerOrderNo: "CUST33445",
    orderNo: "ORD77665",
    company: "Global Movers",
    pickupDate: "2025-04-05",
    pickupLocation: "Houston, TX",
    deliveryDate: "2025-04-08",
    status: "In Transit",
    actions: "View Details",
  },
  {
    id: 5,
    customerOrderNo: "CUST55667",
    orderNo: "ORD11223",
    company: "FastTrack Inc.",
    pickupDate: "2025-04-06",
    pickupLocation: "Miami, FL",
    deliveryDate: "2025-04-09",
    status: "Delivered",
    actions: "Track Shipment",
  },
  {
    id: 6,
    customerOrderNo: "CUST77889",
    orderNo: "ORD33445",
    company: "Speedy Delivery",
    pickupDate: "2025-04-07",
    pickupLocation: "Seattle, WA",
    deliveryDate: "2025-04-10",
    status: "In Transit",
    actions: "Cancel Order",
  },
  {
    id: 7,
    customerOrderNo: "CUST99001",
    orderNo: "ORD55667",
    company: "QuickShip Ltd.",
    pickupDate: "2025-04-08",
    pickupLocation: "Denver, CO",
    deliveryDate: "2025-04-11",
    status: "Delivered",
    actions: "View Details",
  },
  {
    id: 8,
    customerOrderNo: "CUST11224",
    orderNo: "ORD77889",
    company: "Express Haul",
    pickupDate: "2025-04-09",
    pickupLocation: "Boston, MA",
    deliveryDate: "2025-04-12",
    status: "In Transit",
    actions: "Track Shipment",
  },
  {
    id: 9,
    customerOrderNo: "CUST33446",
    orderNo: "ORD99001",
    company: "National Freight",
    pickupDate: "2025-04-10",
    pickupLocation: "Atlanta, GA",
    deliveryDate: "2025-04-13",
    status: "Delivered",
    actions: "Cancel Order",
  },
  {
    id: 10,
    customerOrderNo: "CUST55668",
    orderNo: "ORD11224",
    company: "CargoMaster",
    pickupDate: "2025-04-11",
    pickupLocation: "Dallas, TX",
    deliveryDate: "2025-04-14",
    status: "In Transit",
    actions: "View Details",
  },
];

const ORDERS_PER_PAGE = 10;

const Order = () => {
  const [filteredOrders, setFilteredOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
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

  const filterByStatus = (status) => {
    setSelectedStatus(status);
    let filtered =
      status === "All"
        ? ordersData
        : ordersData.filter((order) => order.status === status);
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        Object.values(order).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (column, value) => {
    let filtered = value
      ? ordersData.filter((item) => item[column] === value)
      : ordersData;
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        Object.values(order).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    let filtered = ordersData.filter((order) =>
      Object.values(order).join(" ").toLowerCase().includes(term.toLowerCase())
    );
    if (selectedStatus !== "All") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
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
        {/* Status Filter Buttons */}
        <div className="border-b-2 border-gray-200 w-full">
          <div className="flex flex-row gap-4 ">
            {["Delivered", "In Transit", "All"].map((status) => (
              <button
                key={status}
                className={`text-md px-4 py-1 r ${
                  selectedStatus === status
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => filterByStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-row justify-between items-center gap-8 mt-4">
          <FilterBox
            data={ordersData}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearch}
          />
          <button
            onClick={() => navigate("/add-order")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <AddIcon/>
            Add Order
          </button>
        </div>

        {/* Order Table */}
        <div className="mt-4">
        <table className=" border-2 border-gray-600 w-full rounded-2xl overflow-hidden">
        <thead className="m-4">
          <tr className="bg-gray-200 ">
            <th className="border p-4 font-medium text-[12px] leading-[16px] tracking-wide font-sans">
              CUSTOMER ORDER NO.
            </th>
            <th className="border p-4 font-medium text-[12px] leading-[16px] tracking-wide font-sans">
              ORDER NO.
            </th>
            <th className="border p-4 font-medium text-[12px] leading-[16px] tracking-wide font-sans">
              COMPANY
            </th>
            <th className="border p-4 font-medium text-[12px] leading-[16px] tracking-wide font-sans">
              PICKUP LOCATION
            </th>
            <th className="border p-4 font-medium text-[12px] leading-[16px] tracking-wide font-sans">
              DELIVERY DATE
            </th>
            <th className="border p-4 font-medium text-[12px] leading-[16px] tracking-wide font-sans">
              ACTIONS
            </th>
          </tr>
        </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.customerOrderNo}</td>
                  <td className="border p-2">{order.orderNo}</td>
                  <td className="border p-2">{order.company}</td>
                  <td className="border p-2">{order.pickupLocation}</td>
                  <td className="border p-2">{order.deliveryDate}</td>
                  <td className="border p-2">
                <div className="flex justify-center gap-4">
                  {order.status === "Delivered" ? (
                    <>

                      <Link to="/add-pod">
                      <button className="  py-1 rounded text-blue-600 text-sm flex items-center justify-center">
                        <Edit  />
                      </button>
                    </Link>
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={handleOpenEdit}
                      >
                        <FaEdit  />
                      </button>
                      <Modal isOpen={showEditModal} onClose={handleCloseEdit}>
                        <EditPOD onClose={handleCloseEdit} />
                      </Modal>
                      
                  </>
                  ) : (
                    <>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={handleOpenEdit}
                      >
                        <FaEdit  />
                      </button>

                      <Modal isOpen={showEditModal} onClose={handleCloseEdit}>
                        <EditOrder onClose={handleCloseEdit} />
                      </Modal>

                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash  />
                      </button>
                    </>
                  )}
                </div>
              </td>

                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
                className={`px-3 py-1 rounded-full text-lg ${
                  page === currentPage
                    ? "bg-blue-300 text-white"
                    : " hover:bg-gray-400"
                }`}
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
        >
          {entriesPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Order;
