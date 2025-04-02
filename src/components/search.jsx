import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from "react-icons/fa";

const Search = () => {
    const [searchData, setSearchData] = useState([]); // Correct state type (array)
    const [searchTerm, setSearchTerm] = useState(""); // Search query

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [
                    {
                      id: 1,
                      customerOrderNo: "CUST12345",
                      orderNo: "ORD98765",
                      company: "XYZ Logistics",
                      pickupDate: "2025-04-02",
                      pickupLocation: "New York, NY",
                      deliveryDate: "2025-04-05",
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
                      actions: "Cancel Order",
                    },
                    {
                      id: 4,
                      customerOrderNo: "CUST44556",
                      orderNo: "ORD33445",
                      company: "Swift Haulers",
                      pickupDate: "2025-04-05",
                      pickupLocation: "Houston, TX",
                      deliveryDate: "2025-04-08",
                      actions: "Edit Order",
                    },
                    {
                      id: 5,
                      customerOrderNo: "CUST77889",
                      orderNo: "ORD22119",
                      company: "Express Movers",
                      pickupDate: "2025-04-06",
                      pickupLocation: "Phoenix, AZ",
                      deliveryDate: "2025-04-09",
                      actions: "View Details",
                    },
                    {
                      id: 6,
                      customerOrderNo: "CUST33447",
                      orderNo: "ORD66778",
                      company: "Turbo Transit",
                      pickupDate: "2025-04-07",
                      pickupLocation: "Philadelphia, PA",
                      deliveryDate: "2025-04-10",
                      actions: "Track Shipment",
                    },
                    {
                      id: 7,
                      customerOrderNo: "CUST90123",
                      orderNo: "ORD45612",
                      company: "Urban Couriers",
                      pickupDate: "2025-04-08",
                      pickupLocation: "San Antonio, TX",
                      deliveryDate: "2025-04-11",
                      actions: "Cancel Order",
                    },
                    {
                      id: 8,
                      customerOrderNo: "CUST11289",
                      orderNo: "ORD78534",
                      company: "Metro Freight",
                      pickupDate: "2025-04-09",
                      pickupLocation: "San Diego, CA",
                      deliveryDate: "2025-04-12",
                      actions: "Edit Order",
                    },
                    {
                      id: 9,
                      customerOrderNo: "CUST55667",
                      orderNo: "ORD99876",
                      company: "Alpha Logistics",
                      pickupDate: "2025-04-10",
                      pickupLocation: "Dallas, TX",
                      deliveryDate: "2025-04-13",
                      actions: "View Details",
                    },
                    {
                      id: 10,
                      customerOrderNo: "CUST77880",
                      orderNo: "ORD88991",
                      company: "Delta Shipping",
                      pickupDate: "2025-04-11",
                      pickupLocation: "San Jose, CA",
                      deliveryDate: "2025-04-14",
                      actions: "Track Shipment",
                    },
                  ];                  
                setSearchData(data);
            } catch (error) {
                console.error("Error fetching search data:", error);
            }
        };

        fetchData();
    }, []); // Fetch data only on mount

    // 🔍 Search filter (case-insensitive, across all columns)
    const filteredResults = searchData.filter((order) =>
        Object.values(order)
            .join(" ") // Merge all values into a single string
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            {/* Search Box */}
            <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 w-52 bg-white">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full outline-none bg-transparent text-gray-800"
                />
                {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="text-gray-500 ml-2">
                        <FaTimes />
                    </button>
                )}
            </div>

            Table
            <table className="border-collapse border border-gray-300 w-full mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Customer Order No</th>
                        <th className="border p-2">Order No</th>
                        <th className="border p-2">Company</th>
                        <th className="border p-2">Pickup Date</th>
                        <th className="border p-2">Pickup Location</th>
                        <th className="border p-2">Delivery Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((order) => (
                            <tr key={order.id} className="text-center">
                                <td className="border p-2">{order.customerOrderNo}</td>
                                <td className="border p-2">{order.orderNo}</td>
                                <td className="border p-2">{order.company}</td>
                                <td className="border p-2">{order.pickupDate}</td>
                                <td className="border p-2">{order.pickupLocation}</td>
                                <td className="border p-2">{order.deliveryDate}</td>
                                <td className="border p-2">{order.actions}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-gray-500 p-4">
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Search;
