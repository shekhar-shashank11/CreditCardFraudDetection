import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-indigo-600 to-blue-500 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Section */}
        <div>
          <h3 className="m-auto text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>Address: No. XXXXXX Street</li>
            <li>Mars City, Country</li>
            <li>Mobile: (123) 456-7890</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: example@email.com</li>
          </ul>
        </div>

        {/* Modules Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Modules</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#credit-dataset" className="hover:underline">Credit Dataset Module</a></li>
            <li><a href="#user-module" className="hover:underline">User Module</a></li>
            <li><a href="#fraud-detection" className="hover:underline">Fraud Detection Module</a></li>
            <li><a href="#login-module" className="hover:underline">Login Module</a></li>
            <li><a href="#order-module" className="hover:underline">Order Module</a></li>
          </ul>
        </div>

        {/* About Project Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Project</h3>
          <p className="text-sm leading-relaxed">
            The importance of Machine Learning and Data Science cannot be overstated. By studying past trends and training machines, we aim to define scenarios, predict future outcomes, and solve real-world problems efficiently.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm">
        © 2025 Project Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;