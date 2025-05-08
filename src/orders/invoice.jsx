import React, { useState } from "react";
import VerticalNavbar from "../components/vertical-nav";
import FilterBox from "../components/filter";
import { useNavigate } from "react-router-dom";
import paymentModal from "../wrapper/paymentModal"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Paid from '@mui/icons-material/Paid';
import AddIcon from '@mui/icons-material/Add';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ordersData = [
  {
    id: 1,
    invoiceId: "INV12345",
    orderId: "ORD98765",
    invoiceDate: "2025-04-02",
    paymentDate: "2025-04-03",
    company: "XYZ Logistics",
    pickupLocation: "New York, NY",
    status: "Paid",
    amount: 1500,
  },
  {
    id: 2,
    invoiceId: "INV67890",
    orderId: "ORD54321",
    invoiceDate: "2025-04-03",
    paymentDate: "2025-04-04",
    company: "ABC Transport",
    pickupLocation: "Los Angeles, CA",
    status: "Unpaid",
    amount: 1200,
  },
];

const ORDERS_PER_PAGE = 10;

const Invoice = () => {
  const [filteredOrders, setFilteredOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState("");
  //const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Unpaid");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  //const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  //const navigate = useNavigate();
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
    const filtered =
      status === "Unpaid"
        ? ordersData.filter((order) => order.status === status)
        : ordersData.filter((order) => order.status === "Paid");
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = ordersData.filter((order) =>
      Object.values(order).join(" ").toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleMarkAsPaid = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    setSelectedOrder(null);
  };

  const handlePaymentSubmit = (amount, paymentDate) => {
    setFilteredOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "Paid", amount, paymentDate }
          : order
      )
    );
    setShowPaymentModal(false);
    setSelectedOrder(null);
  };

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return (
    <div className="h-screen flex">
      <VerticalNavbar />
      <div className="w-full h-auto m-10">
      <div className="border-b-2 border-gray-200 w-full">
        <div className="flex flex-row gap-4 ">
          <button
            className={`text-md px-4 py-1 ${
              selectedStatus === "Unpaid"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => filterByStatus("Unpaid")}
          >
            Unpaid
          </button>
          <button
            className={`text-md px-4 py-1 ${
              selectedStatus === "Paid"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => filterByStatus("Paid")}
          >
            Paid
          </button>
        </div>
      </div>
        <div className="flex flex-row justify-between items-center gap-8 mt-4">
          <FilterBox
            data={ordersData}
            onSearchChange={handleSearch}
          />
          <button
            onClick={() => navigate("/add-order")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <AddIcon/> Add Invoice
          </button>
        </div>

        <div className="mt-4">
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">ORDER ID</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">COMPANY</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">PICKUP LOCATION</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">INVOICE ID</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">INVOICE DATE</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">PAYMENT DATE</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.invoiceId}</td>
                  <td className="border p-2">{order.orderId}</td>
                  <td className="border p-2">{order.company}</td>
                  <td className="border p-2">{order.pickupLocation}</td>
                  <td className="border p-2">{order.invoiceDate}</td>
                  <td className="border p-2">{order.paymentDate || "N/A"}</td>
                  {selectedStatus === "Unpaid" && (
                    <td className="border p-2">
                    <div className="flex gap-4 justify-center items-center text-xl">
                      <button onClick={() => handleMarkAsPaid(order)}>
                        <Paid style={{ color: 'blue', fontSize: 18 }} />
                      </button>
                      <Link to="/customs/edit-customs">
                      <button >
                        <FaEdit style={{ color: 'blue', fontSize: 16 }} />
                      </button>
                      </Link>
                      <button onClick={() => handleMarkAsPaid(order)}>
                        <FaTrash style={{ color: 'red', fontSize: 16 }} />
                      </button>
                    </div>
                  </td>
                  
                  )}
                  {/* Actions for Paid Orders */}
                  {selectedStatus === "Paid" && (
                    <td className="border p-2">
                    <div className="flex gap-4 justify-center items-center text-xl">
                    <Link to="/customs/edit-customs">
                      <button >
                        <FaEdit style={{ color: 'blue', fontSize: 16 }} />
                      </button>
                      </Link>
                      <Link>
                      <button onClick={() => handleMarkAsPaid(order)}>
                        <FaTrash style={{ color: 'red', fontSize: 16 }} />
                      </button>
                      </Link>
                    </div>
                  </td>
                  
                  )}
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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

      {showPaymentModal && (
  <paymentModal onClose={handlePaymentModalClose}>
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        {/* Close button */}
        <button
          onClick={handlePaymentModalClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Enter Payment Details</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const amount = e.target.amount.value;
            const paymentDate = e.target.paymentDate.value;
            handlePaymentSubmit(amount, paymentDate);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              defaultValue={selectedOrder?.amount}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </paymentModal>
)}
    </div>
  );
};

export default Invoice;
