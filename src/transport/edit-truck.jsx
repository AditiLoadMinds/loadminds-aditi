import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import MultiEmailInput from '../components/multiemail'

export const EditTruck = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [orderDetails, setOrderDetails] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [papsEmails, setPapsEmails] = useState([]);
  const [parsEmails, setParsEmails] = useState([]);

  const [contactNumbers, setContactNumbers] = useState([""]);

  const handleContactChange = (index, value) => {
    const updated = [...contactNumbers];
    updated[index] = value;
    setContactNumbers(updated);
  };

  const addContactField = () => {
    setContactNumbers([...contactNumbers, ""]);
  };
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

      if (orderDetails) {
        formData.append('orderDetails', orderDetails);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/orders', { state: { message: 'Broker added successfully' } });
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
        ← Editing Truck
      </button>
      

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block font-medium mb-1">Number</label>
        <input type="number" placeholder="Enter Truck name" className="input w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Make</label>
        <input type="number" placeholder="Enter Truck make" className="input w-full" />
      </div>
      <div>
        <label className="block font-medium mb-1">Model</label>
        <input type="text" placeholder="Enter Truck model" className="input w-full" />
      </div>
      <div>
        <label className="block font-medium mb-1">VIN</label>
        <input type="number" placeholder="Enter Truck VIN number" className="input w-full" />
      </div>
      <div>
        <label className="block font-medium mb-1">License Plate</label>
        <input type="number" placeholder="Enter License Plate number" className="input w-full" />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className={`py-3 px-4 w-full rounded-lg text-white font-medium transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};
