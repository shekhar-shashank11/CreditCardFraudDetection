import React, { useState } from "react"
import { motion } from "framer-motion"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Message sent by ${formData.name}!`)
    setFormData({ name: "", email: "", contactNo: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-blue-500"
      >
        <motion.h2
          className="text-4xl font-bold text-blue-300 text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Let's Connect
        </motion.h2>
        <motion.p
          className="text-center text-blue-200 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Fill out the form, and we'll reach out to you soon.
        </motion.p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <label htmlFor="name" className="block text-sm font-medium text-blue-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-lg bg-gray-800 bg-opacity-50 border border-blue-500 text-blue-200 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <label htmlFor="email" className="block text-sm font-medium text-blue-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-lg bg-gray-800 bg-opacity-50 border border-blue-500 text-blue-200 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <label htmlFor="contactNo" className="block text-sm font-medium text-blue-300">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 rounded-lg bg-gray-800 bg-opacity-50 border border-blue-500 text-blue-200 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <label htmlFor="message" className="block text-sm font-medium text-blue-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 rounded-lg bg-gray-800 bg-opacity-50 border border-blue-500 text-blue-200 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default ContactForm

