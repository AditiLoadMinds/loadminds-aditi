import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VerticalNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  useEffect(() => {
    if (!expanded) {
      setShowUserMenu(false); // auto-close user menu on collapse
    }
  }, [expanded]);
  const [dropdowns, setDropdowns] = useState({
    orders: false,
    customs: false,
    transport: false,
  });

  const toggleDropdown = (key) => (e) => {
    e.preventDefault();
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={`${expanded ? 'w-64' : 'w-20'} transition-width duration-300 min-h-screen bg-[#171717] text-white flex flex-col p-4 overflow-y-auto`}

      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false);
        setDropdowns({
          orders: false,
          customs: false,
          transport: false,
        });
      }}
    >
      <ul className="flex flex-col h-full space-y-4">
        <li>
          <div className="flex items-center">
            <img src="/images/logo1.png" className='h-10 w-14' alt="logo" />
            {expanded && <img src='/images/main.png' className='w-28 h-6 m-auto' alt="main" />}
          </div>
        </li>
        
        <li>
          <a href="#" onClick={toggleDropdown('orders')} className="hover:bg-[#2771D1] p-2 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/hamburger1.png" alt="orders" className="w-8 h-8" />
              {expanded && <span className="ml-3">Orders</span>}
            </div>
            {expanded && (
              <span className="text-sm">
                {dropdowns.orders ? '▲' : '▼'}
              </span>
            )}
          </a>
          {expanded && dropdowns.orders && (
            <div className="ml-10 mt-2 space-y-2">
              <Link to="/orders" className="block py-1 px-2 hover:bg-gray-700 rounded">Overview</Link>
              <Link to="/orders/invoice" className="block py-1 px-2 hover:bg-gray-700 rounded">Invoice</Link>
            </div>
          )}
        </li>
        
        <li>
          <a href="#" onClick={toggleDropdown('customs')} className="hover:bg-[#2771D1] p-2 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/doc1.png" alt="customs" className="w-8 h-8" />
              {expanded && <span className="ml-3">Customs</span>}
            </div>
            {expanded && (
              <span className="text-sm">
                {dropdowns.customs ? '▲' : '▼'}
              </span>
            )}
          </a>
          {expanded && dropdowns.customs && (
            <div className="ml-10 mt-2 space-y-2">
              <Link to="/customs/overview" className="block py-1 px-2 hover:bg-gray-700 rounded">Overview</Link>
              <Link to="/customs/broker" className="block py-1 px-2 hover:bg-gray-700 rounded">Broker</Link>
            </div>
          )}
        </li>
        
        <li>
          <a href="#" onClick={toggleDropdown('transport')} className="hover:bg-[#2771D1] p-2 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/truck1.png" alt="transport" className="w-8 h-8" />
              {expanded && <span className="ml-3">Transport</span>}
            </div>
            {expanded && (
              <span className="text-sm">
                {dropdowns.transport ? '▲' : '▼'}
              </span>
            )}
          </a>
          {expanded && dropdowns.transport && (
            <div className="ml-10 mt-2 space-y-2">
              <Link to="/transport/overview" className="block py-1 px-2 hover:bg-gray-700 rounded">Overview</Link>
              <Link to="/transport/driver" className="block py-1 px-2 hover:bg-gray-700 rounded">Driver</Link>
              <Link to="/transport/expense" className="block py-1 px-2 hover:bg-gray-700 rounded">Payment</Link>
            </div>
          )}
        </li>
        
        <li>
          <Link to="/ai-tool" className="hover:bg-[#2771D1] p-2 rounded-lg flex items-center">
            <img src="/images/icon1.png" alt="contact" className="w-6 h-6" />
            {expanded && <span className="ml-3">LOADMINDS AI</span>}
          </Link>
        </li>
        
        <li>
          <Link to="/contact" className="hover:bg-[#2771D1] p-2 rounded-lg flex items-center">
            <img src="/images/pdf1.png" alt="pdf" className="w-6 h-6" />
            {expanded && <span className="ml-3">PDF Editor</span>}
          </Link>
        </li>
      </ul>
      
      <div className="mt-auto relative flex flex-col items-center">
  {/* Dropdown Menu */}
  {showUserMenu && (
    <div className="absolute bottom-14 w-40 bg-[#171717] rounded-lg shadow-lg z-10 text-sm">
      <Link to="/settings" className="block px-4 py-2 hover:bg-[#171717] rounded-t-lg">
        Settings
      </Link>
      <Link to="/profile/userprofile" className="block px-4 py-2 hover:bg-[#171717] rounded-t-lg">
        Profile
      </Link>
      <button
        onClick={() => {
          console.log("Logging out...");
          // add logout logic here
        }}
        className="block w-full text-left px-4 py-2 hover:text-red-600 rounded-b-lg"
      >
        Logout
      </button>
    </div>
  )}

  {/* User Button */}
  <button
    onClick={() => setShowUserMenu(prev => !prev)}
    className="w-full flex items-center justify-center gap-2 text-white py-2 hover:bg-[#2771D1] rounded-lg"
  >
    <div className="border-white border-2 h-10 w-10 rounded-full flex items-center justify-center font-bold">
      S
    </div>

    {expanded && (
      <div className="flex items-center justify-between w-full pr-4">
        <span className="ml-2 text-sm font-medium">Saarim Warsi</span>
        <span className="text-xs">{showUserMenu ? '▲' : '▼'}</span>
      </div>
    )}
  </button>
</div>

    </div>
  );
};

export default VerticalNavbar;
