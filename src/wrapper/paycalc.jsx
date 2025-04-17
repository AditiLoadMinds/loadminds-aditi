import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const PayCalculatorModal = ({ isOpen, onClose }) => {
  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');
  const [driverName, setDriverName] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [netPayCAD, setNetPayCAD] = useState(null);
  const [netPayUSD, setNetPayUSD] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const dummyTrucks = [
      { id: 1, name: 'Truck 101' },
      { id: 2, name: 'Truck 202' },
      { id: 3, name: 'Truck 303' },
    ];
    setTrucks(dummyTrucks);
  }, []);

  const calculatePay = () => {
    // Dummy calculation logic
    const cad = Math.floor(Math.random() * 10000) + 1000;
    const usd = cad * 0.74;
    setNetPayCAD(cad);
    setNetPayUSD(usd.toFixed(2));
    setIsCalculated(true);
  };

  const downloadPDF = () => {
    alert('Downloading PDF (mock)');
    // Integrate jsPDF or backend download here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl relative shadow-lg">
        
        {/* Close (X) icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <FaTimes size={18} />
        </button>

        {/* Download PDF button (conditionally shown) */}
        {isCalculated && (
          <button
            onClick={downloadPDF}
            className="absolute top-3 left-3 text-sm text-blue-600 underline"
          >
            Download PDF
          </button>
        )}

        <h2 className="text-2xl font-semibold mb-4 text-left">Pay Calculator</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Truck</label>
            <select
              className="input w-full"
              value={selectedTruck}
              onChange={(e) => setSelectedTruck(e.target.value)}
            >
              <option value="" disabled>Select a truck</option>
              {trucks.map(truck => (
                <option key={truck.id} value={truck.name}>{truck.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Driver Name</label>
            <input
              type="text"
              className="input w-full"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="Enter driver name"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">From Date</label>
              <input
                type="date"
                className="input w-full"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">To Date</label>
              <input
                type="date"
                className="input w-full"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={calculatePay}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Calculate
          </button>

          {netPayCAD && (
            <div className="text-center mt-4">
              <p className="text-lg font-medium">Net Pay:</p>
              <p className="text-green-600">CAD ${netPayCAD}</p>
              <p className="text-indigo-600">USD ${netPayUSD}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayCalculatorModal;
