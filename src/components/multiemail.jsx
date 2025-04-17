// components/MultiEmailInput.jsx

import React, { useState } from 'react';

const MultiEmailInput = ({ label, emails, setEmails }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addEmail(inputValue.trim());
    }
  };

  const addEmail = (email) => {
    if (validateEmail(email) && !emails.includes(email)) {
      setEmails([...emails, email]);
    }
    setInputValue('');
  };

  const removeEmail = (index) => {
    const updated = [...emails];
    updated.splice(index, 1);
    setEmails(updated);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 items-center border border-gray-300 rounded px-2 py-2 min-h-[48px]">
        {emails.map((email, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-2"
          >
            {email}
            <button
              type="button"
              className="text-sm font-bold hover:text-red-600"
              onClick={() => removeEmail(index)}
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          className="outline-none flex-grow"
          placeholder="Type and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default MultiEmailInput;
