import React, { useState } from "react";
import VerticalNavbar from "../components/vertical-nav";
import FilterBox from "../components/filter";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import PayCalculatorModal from "../wrapper/paycalc";
import { Pagination } from "../components/pagination";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const TRANSPORTS_PER_PAGE = 10;

const driverExpenses = [
  { id: 1, expenseName: "Fuel Refill", truck: "TRK001", driver: "John Doe", currency: "USD", price: 150, date: "2024-04-01" },
  { id: 2, expenseName: "Toll", truck: "TRK002", driver: "Jane Smith", currency: "USD", price: 50, date: "2024-04-03" },
  { id: 3, expenseName: "Maintenance", truck: "TRK003", driver: "Ravi Kumar", currency: "USD", price: 300, date: "2024-04-04" },
  { id: 4, expenseName: "Parking", truck: "TRK004", driver: "Alex King", currency: "USD", price: 25, date: "2024-04-04" },
  { id: 5, expenseName: "Tyre Change", truck: "TRK005", driver: "Mohammed Ali", currency: "USD", price: 400, date: "2024-04-05" },
  { id: 6, expenseName: "Fuel", truck: "TRK006", driver: "Ritu Sharma", currency: "USD", price: 180, date: "2024-04-06" },
  { id: 7, expenseName: "Cleaning", truck: "TRK007", driver: "Tom Hardy", currency: "USD", price: 60, date: "2024-04-07" },
  { id: 8, expenseName: "Oil Change", truck: "TRK008", driver: "Steve Brown", currency: "USD", price: 220, date: "2024-04-08" },
  { id: 9, expenseName: "Toll", truck: "TRK009", driver: "Salma Hayek", currency: "USD", price: 35, date: "2024-04-09" },
  { id: 10, expenseName: "AC Repair", truck: "TRK010", driver: "Leon Kennedy", currency: "USD", price: 280, date: "2024-04-10" },
];

const orderExpenses = [
  {
    id: 101,
    orderId: "ORD001",
    truck: "TRK001",
    currency: "USD",
    price: 1200,
    pickupDate: "2024-04-02",
    pickupLocation: "New York",
    deliveryDate: "2024-04-04",
  },
  {
    id: 102,
    orderId: "ORD002",
    truck: "TRK003",
    currency: "USD",
    price: 850,
    pickupDate: "2024-04-05",
    pickupLocation: "Chicago",
    deliveryDate: "2024-04-07",
  },
  {
    id: 103,
    orderId: "ORD003",
    truck: "TRK002",
    currency: "USD",
    price: 1300,
    pickupDate: "2024-04-08",
    pickupLocation: "Houston",
    deliveryDate: "2024-04-10",
  },
  {
    id: 104,
    orderId: "ORD004",
    truck: "TRK004",
    currency: "USD",
    price: 950,
    pickupDate: "2024-04-11",
    pickupLocation: "Atlanta",
    deliveryDate: "2024-04-13",
  },
  {
    id: 105,
    orderId: "ORD005",
    truck: "TRK005",
    currency: "USD",
    price: 1100,
    pickupDate: "2024-04-14",
    pickupLocation: "Denver",
    deliveryDate: "2024-04-16",
  },
  {
    id: 106,
    orderId: "ORD006",
    truck: "TRK006",
    currency: "USD",
    price: 770,
    pickupDate: "2024-04-17",
    pickupLocation: "Seattle",
    deliveryDate: "2024-04-19",
  },
];

const Expense = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("Expenses"); // "Expenses" or "Orders"
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(driverExpenses);
  
    const data = category === "Expenses" ? driverExpenses : orderExpenses;
  
    // Filter function that works for both categories
    const filterData = (data) => {
      return data.filter((item) =>
        Object.values(item).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
  
    const filteredPaginatedData = filterData(data)
      .slice((currentPage - 1) * TRANSPORTS_PER_PAGE, currentPage * TRANSPORTS_PER_PAGE);
  
    const totalPages = Math.ceil(filterData(data).length / TRANSPORTS_PER_PAGE);
  
    const handleSearch = (term) => {
      setSearchTerm(term);
      setCurrentPage(1);
    };
  
    const handleCategoryChange = (cat) => {
      setCategory(cat);
      setSearchTerm(""); // Reset search when category changes
      setCurrentPage(1); // Reset pagination
      setFilteredData(cat === "Expenses" ? driverExpenses : orderExpenses);
    };
  
    return (
      <div className="h-screen flex">
        <VerticalNavbar />
        <div className="w-full h-auto m-10">
          {/* Category Filter Buttons */}
          <div className="border-b-2 border-gray-200 w-full mb-4">
            <div className="flex flex-row gap-4">
              {["Expenses", "Orders"].map((cat) => (
                <button
                  key={cat}
                  className={`text-md px-4 py-1 ${
                    category === cat
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
  
          <div className="flex flex-row justify-between items-center gap-8 mt-4">
            <FilterBox
              data={category === "Expenses" ? driverExpenses : orderExpenses}
              onSearchChange={handleSearch}
            />
            <div className="flex flex-row gap-2">
              {category === "Expenses" && (
                <>
                <button
                  onClick={() => setIsPayModalOpen(true)}
                  className="bg-white hover:bg-blue-600 hover:text-white border border-gray-200 text-black px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <AttachMoneyIcon />
                  Pay Calculator
                </button>
          
                <PayCalculatorModal
                  isOpen={isPayModalOpen}
                  onClose={() => setIsPayModalOpen(false)}
                />
              </>
              )}
              <button
                onClick={() => navigate("/transport/add-expense")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Add Expense
              </button>
            </div>
          </div>
  
          <div className="overflow-x-auto mt-4">
            <table className="border-collapse border border-gray-300 w-full">
              <thead>
                <tr className="bg-gray-200 text-center">
                  {category === "Expenses" ? (
                    <>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Truck</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Expense Name</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Driver</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Currency</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Price</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Date</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Actions</th>
                    </>
                  ) : (
                    <>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Order ID</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Truck</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Currency</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Price</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Pickup Date</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Pickup Location</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Delivery Date</th>
                      <th className="border p-4 font-medium text-sm leading-[16px] tracking-wide font-sans">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredPaginatedData.map((item) => (
                  <tr key={item.id} className="text-center">
                    {category === "Expenses" ? (
                      <>
                        <td className="border p-2">{item.expenseName}</td>
                        <td className="border p-2">{item.truck}</td>
                        <td className="border p-2">{item.driver}</td>
                        <td className="border p-2">{item.currency}</td>
                        <td className="border p-2">{item.price}</td>
                        <td className="border p-2">{item.date}</td>
                      </>
                    ) : (
                      <>
                        <td className="border p-2">{item.orderId}</td>
                        <td className="border p-2">{item.truck}</td>
                        <td className="border p-2">{item.currency}</td>
                        <td className="border p-2">{item.price}</td>
                        <td className="border p-2">{item.pickupDate}</td>
                        <td className="border p-2">{item.pickupLocation}</td>
                        <td className="border p-2">{item.deliveryDate}</td>
                      </>
                    )}
                    <td className="border p-2">
                      <div className="flex justify-center gap-4">
                        <Link to="/edit-entry">
                          <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                        </Link>
                        <FaTrash className="text-red-600 hover:text-red-800 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPaginatedData.length === 0 && (
                  <tr>
                    <td colSpan={category === "Expenses" ? 7 : 8} className="text-center p-4 text-gray-500">
                      No entries found
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
  
  export default Expense;
  
