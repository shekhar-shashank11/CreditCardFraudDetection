import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
import Contact from './components/Contact';




function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FileUpload />
      <Contact/>
      <Footer />
    </div>
  );
}

export default App;