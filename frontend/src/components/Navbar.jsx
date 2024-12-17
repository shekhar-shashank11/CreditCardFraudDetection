import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-extrabold">Fraud Save</div>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
        <button
          className="md:hidden flex items-center bg-purple-600 px-3 py-2 rounded hover:bg-purple-500"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-3 space-y-2 bg-white text-gray-800 rounded shadow-lg p-4">
          <a href="#home" className="block px-4 py-2 hover:bg-gray-100">Home</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">About</a>
          <a href="#contact" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;