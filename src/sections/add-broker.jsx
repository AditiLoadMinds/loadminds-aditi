import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import MultiEmailInput from '../components/multiemail'

export const AddBroker = () => {
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
        ← Add Order
      </button>
      

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Order form fields */}
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input type="text" placeholder="Name" className="input w-full" />
      </div>

      <div>
      <MultiEmailInput label="PAPS Email(s)" emails={papsEmails} setEmails={setPapsEmails} />
      </div>

      <div>
      <MultiEmailInput label="PARS Email(s)" emails={parsEmails} setEmails={setParsEmails} />
      </div>

      

      <div>
      <label className=" font-medium mb-1 flex justify-between items-center">
          Contact
          <button
            type="button"
            onClick={addContactField}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <FaPlus className="text-xs" />
            Add Contact
          </button>
        </label>

        <div className="space-y-2">
          {contactNumbers.map((number, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Contact Number ${index + 1}`}
              className="input w-full"
              value={number}
              onChange={(e) => handleContactChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>

      
      <div className="pt-4">
        <button
          type="submit"
          className={`py-3 px-4 w-full rounded-lg text-white font-medium transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Broker...' : 'Add Broker'}
        </button>
      </div>
    </form>
  );
};
