import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export const AddExpense = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [orderDetails, setOrderDetails] = useState('');
  const [error, setError] = useState('');
  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call
    const dummyTrucks = [
      { id: 1, name: 'Truck 101' },
      { id: 2, name: 'Truck 202' },
      { id: 3, name: 'Truck 303' }
    ];
    setTrucks(dummyTrucks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderDetails.trim()) {
      setError('Please enter complete details.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`orderFiles[${index}]`, file);
      });

      formData.append('orderDetails', orderDetails);
      formData.append('selectedTruck', selectedTruck);

      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/orders', { state: { message: 'Expense added successfully' } });
    } catch (err) {
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl"
    >
      <button
        onClick={() => navigate("/orders")}
        className="text-black mb-4 flex text-lg items-center"
      >
        ← Adding Driver
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block font-medium mb-1">Name</label>
        <input type="text" placeholder="Enter Driver name" className="input w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Truck</label>
        <select
          className="input w-full"
          value={selectedTruck}
          onChange={(e) => setSelectedTruck(e.target.value)}
        >
          <option value="" disabled>Select a truck</option>
          {trucks.map((truck) => (
            <option key={truck.id} value={truck.name}>{truck.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Driver</label>
        <input type="text" placeholder="Enter Driver number" className="input w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Trailer</label>
        <input type="number" placeholder="Enter Trailer number" className="input w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Amount</label>
        <input type="number" placeholder="Enter Amount" className="input w-full" />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className={`py-3 px-4 w-full rounded-lg text-white font-medium transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
};
