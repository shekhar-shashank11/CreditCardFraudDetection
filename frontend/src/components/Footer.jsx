import React from "react"
import { motion } from "framer-motion"

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-blue-300 py-12">
      <motion.div
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4 text-blue-200">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>Address:Sonarpur,near Future Institute Of Engineering and Management</li>
            <li>West Bengal,India</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: abc@gmail.com</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4 text-blue-200">Modules</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#credit-dataset" className="hover:text-blue-400 transition-colors duration-300">
                Credit Dataset Module
              </a>
            </li>
            <li>
              <a href="#user-module" className="hover:text-blue-400 transition-colors duration-300">
                User Module
              </a>
            </li>
            <li>
              <a href="#fraud-detection" className="hover:text-blue-400 transition-colors duration-300">
                Fraud Detection Module
              </a>
            </li>
            <li>
              <a href="#login-module" className="hover:text-blue-400 transition-colors duration-300">
                Login Module
              </a>
            </li>
            <li>
              <a href="#order-module" className="hover:text-blue-400 transition-colors duration-300">
                Order Module
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4 text-blue-200">About Project</h3>
          <p className="text-sm leading-relaxed">
            Leveraging cutting-edge Machine Learning and Data Science, our project aims to revolutionize credit card
            fraud detection. By analyzing past trends and training our AI models, we're defining new scenarios,
            predicting potential fraud, and solving real-world problems with unprecedented efficiency.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 border-t border-blue-800 pt-8 text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © 2025 Fraud Save. All rights reserved.
      </motion.div>
    </footer>
  )
}

export default Footer

