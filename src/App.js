import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./sections/dashboard";
import Order from "./sections/orders";  // The component that you want to show when the user clicks "Orders"

// Your Orders page

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Order/>} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default App;
