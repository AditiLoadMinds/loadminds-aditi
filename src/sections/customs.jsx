import React, { useState } from "react";
import VerticalNavbar from "../components/vertical-nav";
import FilterBox1 from "../components/filter";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../wrapper/Modal";
import { EditOrder } from "./edit-orders";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination } from "../components/pagination";
import Add from "@mui/icons-material/Add";

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

const Customs = () => {
  const [filteredOrders, setFilteredOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const updatedOrders = filteredOrders.filter((order) => order.id !== id);
    setFilteredOrders(updatedOrders);
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
            {["PAPS", "PARS"].map((status) => (
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
          <FilterBox1
            data={ordersData}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearch}
          />
          <button
            onClick={() => navigate("/new-customs")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors"
          >
            <Add size="small"/> New
          </button>
        </div>

        {/* Order Table */}
        <div className="mt-4">
          <table className="border-collapse border border-gray-300 w-full overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">CUSTOMER NO.</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">ORDER NO.</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">COMPANY</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">PICKUP LOCATION</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">DELIVERY DATE</th>
                <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">ACTIONS</th>
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
      <div className="flex justify-center align-middle items-center gap-4">
        <button
          className="text-blue-600 hover:underline"
          onClick={handleOpenEdit}
        >
          <FaEdit  />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          title="Delete"
          onClick={() => handleDelete(order.id)} // Assuming handleDelete will delete the order
        >
          <FaTrash  />
        </button>
      </div>
    ) : (
      <>
        <button
          className="text-blue-600 hover:underline"
          onClick={handleOpenEdit}
        >
          <EditIcon fontSize="small" />
        </button>

        <Modal isOpen={showEditModal} onClose={handleCloseEdit}>
          <EditOrder onClose={handleCloseEdit} />
        </Modal>

        <button
          className="text-red-600 hover:text-red-800"
          title="Delete"
          onClick={() => handleDelete(order.id)} // Assuming handleDelete will delete the order
        >
          <DeleteIcon fontSize="small" />
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
        <Pagination/>
      </div>
    </div>
  );
};

export default Customs;
