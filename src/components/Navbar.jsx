// components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-purple-600">Lume</div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>{" "}
        {/* Profile Pic */}
      </div>
    </nav>
  );
};

export default Navbar;
