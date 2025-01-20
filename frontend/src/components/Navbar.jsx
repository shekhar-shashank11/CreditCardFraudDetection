import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-blue-300 px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold"
        >
          Fraud Save
        </motion.div>
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Detection", "Contact"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.button
          className="md:hidden flex items-center bg-blue-800 px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
          onClick={toggleMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </motion.button>
      </div>
      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
        className={`md:hidden mt-3 space-y-2 bg-gray-800 text-blue-300 rounded shadow-lg p-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {["Home", "About", "Detection", "Contact"].map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="block px-4 py-2 hover:bg-blue-800 transition-colors duration-300"
            onClick={toggleMenu}
          >
            {item}
          </Link>
        ))}
      </motion.div>
    </nav>
  )
}

export default Navbar

