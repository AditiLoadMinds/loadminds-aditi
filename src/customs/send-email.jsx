import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiEmailInput from '../components/multiemail'

export const SendEmail = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [orderDetails, setOrderDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [brokerEmial,setBrokerEmails]=useState([]);
  const [To,setTo]=useState([]);
  const [cc,setCC]=useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    validateAndSetFiles(selectedFiles);
  };


  const validateAndSetFiles = (selectedFiles) => {
    if (!selectedFiles.length) return;
    
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
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
    
    // Validation
    if (files.length === 0 && !orderDetails.trim()) {
      setError('Please either upload files or enter order details.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Create form data for API submission
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`orderFiles[${index}]`, file);
      });
      
      if (orderDetails) {
        formData.append('orderDetails', orderDetails);
      }
      
      // Simulate API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - redirect to orders list or confirmation page
      navigate('/orders', { state: { message: 'Order added successfully' } });
    } catch (err) {
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle "Browse files" button click
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Handle "Fill up the order form" link click
  const handleFillFormClick = (e) => {
    e.preventDefault();
    navigate('/order-form');
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate('/orders');
  };

  // Handle file download/view
  const handleViewFile = (file) => {
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  // Handle file download
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
    <div className="max-w-3xl mx-auto p-4 sm:p-6 font-sans">
      <header className="mb-6">
        <button 
          className="flex items-center text-lg font-medium hover:text-blue-600 transition-colors"
          onClick={handleBackClick}
          aria-label="Go back"
        >
          <span className="mr-2">←</span> Adding Customs
        </button>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <section>
            <div className='flex flex-col '>
                <div className='font-medium mb-2 max-w-xl'>
                    <MultiEmailInput label="To" emails={To} setEmails={setTo}/>
                </div>
                
                <div className='font-medium mb-2 max-w-xl'>
                    <MultiEmailInput label="CC" emails={cc} setEmails={setCC}/>
                </div>
                <label className='font-medium mb-2'>Subject</label>
                <input type="text" className='w-full max-w-xl p-2 rounded-lg border border-gray-200 mb-2 text-gray-400'/>
                <div className='w-full max-w-xl p-2 rounded-lg  mb-2 text-black bg-white'>
                  <MultiEmailInput label="Email" emails={brokerEmial} setEmails={setBrokerEmails} />
                </div>
                
                
            </div>
            <h2 className="text-base font-medium mb-2">Upload file</h2>
            <div 
              className={`border border-gray-300 rounded-lg p-6 transition-all text-center
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="cursor-pointer" onClick={handleBrowseClick}>
                <p className="text-base mb-1">Choose a file or drag & drop it here</p>
                <p className="text-sm text-gray-500 mb-4">PDF, DOC, JPG or IMG files upto 15MB</p>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  aria-label="Upload files"
                />
                <button 
                  type="button" 
                  className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded text-sm transition-colors"
                >
                  Browse files
                </button>
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <span className="mr-2">📎</span>
                      <span className="text-sm">Load confirmation file.pdf</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleViewFile(file)}
                        className="text-sm text-blue-600 mr-3 hover:underline"
                      >
                        View file
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadFile(file)}
                        className="text-gray-600"
                        aria-label="Download file"
                      >
                        ⬇️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm" role="alert">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`py-3 px-4 rounded-lg text-white font-medium transition-colors
              ${isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generating PDF' : 'Generate PDF'}
          </button>
        </form>
      </main>
    </div>
  );
};

