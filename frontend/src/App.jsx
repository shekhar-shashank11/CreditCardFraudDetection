import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
import Contact from './components/ContactForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detection from './pages/Detection';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar /> {/* Navbar added here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Detection" element={<Detection />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
