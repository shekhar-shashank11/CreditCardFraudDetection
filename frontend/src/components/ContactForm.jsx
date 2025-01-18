import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${formData.name}!`);
    setFormData({ name: "", email: "", contactNo: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 relative"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,nature')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Form Container */}
      <div
        className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-2xl relative overflow-hidden"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        {/* Floating Decorative Elements */}
        <div className="absolute w-48 h-48 bg-indigo-500 opacity-20 rounded-full -top-16 -left-16 animate-bounce"></div>
        <div className="absolute w-32 h-32 bg-pink-400 opacity-20 rounded-full -bottom-16 right-10 animate-bounce delay-150"></div>
        <div className="absolute w-24 h-24 bg-yellow-400 opacity-20 rounded-full top-20 left-20 animate-pulse"></div>

        {/* Contact Form Content */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Let's Connect
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Fill out the form, and we'll reach out to you soon.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 relative z-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
