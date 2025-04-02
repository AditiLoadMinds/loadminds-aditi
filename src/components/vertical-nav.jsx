import React from 'react';
import { Link } from 'react-router-dom';

const VerticalNavbar = () => {
  return (
    <div className="w-20 h-screen bg-[#171717] text-white flex flex-col p-4 overflow-y-hidden">
      <ul className="flex flex-col  h-full space-y-4">
        <li>
          <img src="/images/logo1.png" className='h-14 w-14 mt-auto'></img>
        </li>
        <li>
          <Link to="/" className="hover:bg-gray-600 p-2 rounded-lg block">
            <img src="/images/hamburger1.png" alt="home" className="w-8 h-8" />
          </Link>
        </li>
        <li>
          <Link to="/orders" className="hover:bg-[#2771D1] p-2 rounded-lg block">
          <img src="/images/doc1.png" alt="home" className="w-8 h-8" />
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:bg-[#2771D1] p-2 rounded-lg block">
          <img src="/images/truck1.png" alt="home" className="w-8 h-8" />
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:bg-[#2771D1] p-2 rounded-lg block">
          <img src="/images/icon1.png" alt="home" className="w-8 h-8" />
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:bg-[#2771D1] p-2 rounded-lg block">
          <img src="/images/pdf1.png" alt="home" className="w-8 h-8" />
          </Link>
        </li>
        
      </ul>
      <li className="flex justify-end">
          <Link to="/" className="border-white border-2 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
            S
          </Link>
        </li>
    </div>
  );
};

export default VerticalNavbar;
