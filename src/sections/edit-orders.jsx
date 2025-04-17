import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

export const EditOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [orderDetails, setOrderDetails] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    validateAndSetFiles(selectedFiles);
  };

  const validateAndSetFiles = (selectedFiles) => {
    if (!selectedFiles.length) return;

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    const maxSize = 15 * 1024 * 1024;

    let errorMessage = '';

    for (const file of selectedFiles) {
      if (!validTypes.includes(file.type)) {
        errorMessage = `"${file.name}" has an invalid file type. Please upload only PDF, DOC, JPG or PNG files.`;
        break;
      }

      if (file.size > maxSize) {
        errorMessage = `"${file.name}" exceeds the 15MB size limit.`;
        break;
      }
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError('');
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndSetFiles(droppedFiles);
  }, []);

  const handleOrderDetailsChange = (e) => {
    setOrderDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0 && !orderDetails.trim()) {
      setError('Please either upload files or enter order details.');
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
      navigate('/orders', { state: { message: 'Order added successfully' } });
    } catch (err) {
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleViewFile = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const handleDownloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        ← Editing Order
      </button>

      {/* Upload button and heading row */}
      <div className="flex justify-end items-start flex-col sm:flex-row mb-4">
        
        <div className="flex  items-center gap-2">
          <button
            type="button"
            onClick={handleBrowseClick}
            className="border text-black py-2 px-4 rounded font-medium"
          >
            Upload New File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            multiple
          />
        </div>
      </div>

      {/* Uploaded files preview */}
      {files.length > 0 && (
        <div className="mt-2">
          <p className="font-medium mb-2">Uploaded Files:</p>
          <ul className="list-disc ml-5 text-sm">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center mb-1">
                <span>{file.name}</span>
                <div className="flex gap-2 text-sm">
                  <button type="button" onClick={() => handleViewFile(file)} className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button type="button" onClick={() => handleDownloadFile(file)} className="text-green-600 hover:underline">
                    Download
                  </button>
                  <button type="button" onClick={() => removeFile(index)} className="text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Order form fields */}
      <div>
        <label className="block font-medium mb-1">Order Number</label>
        <input type="text" placeholder="Order number" className="input w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Company Name</label>
        <input type="text" placeholder="Company name" className="input w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Contact Emails</label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="email" placeholder="Email 1" className="input w-full" />
          <input type="email" placeholder="Email 2" className="input w-full" />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Company Address</label>
        <input type="text" placeholder="Address" className="input w-full mb-4" />
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input type="text" placeholder="State" className="input w-full" />
          <input type="text" placeholder="Country" className="input w-full" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="number" placeholder="Pincode" className="input w-full" />
          <input type="number" placeholder="Phone Number" className="input w-full" />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1 text-left">Phone Numbers</label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="tel" placeholder="Phone Number 1" className="input w-full" />
          <input type="tel" placeholder="Phone Number 2" className="input w-full" />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Pickup Date</label>
        <input type="date" placeholder="Pickup Date" className="input w-full" />
      </div>

      <div>
        <label className="block font-medium mb-1">Pickup Address</label>
        <input type="text" placeholder="Address" className="input w-full mb-4" />
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" placeholder="State" className="input w-full" />
          <input type="text" placeholder="Country" className="input w-full" />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className={`py-3 px-4 w-full rounded-lg text-white font-medium transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
