import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Iridescence from "./Iridescence";
import BlurText from "./BlurText";
import GradientText from './GradientText' // adjust path as necessary
const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
function Hero() {
  return (
    <div
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Iridescence Background */}
      <div className="absolute inset-0 z-0">
        <Iridescence color={[1.0, 1.0, 1.0]} speed={1.5} amplitude={0.15} />
      </div>

      {/* Optional Faded Overlay (if needed) */}
      <motion.div
        className="absolute inset-0 bg-black z-10"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-5">
    <h1 className="text-5xl font-bold mb-8 text-white text-center">

  <motion.span
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <GradientText
      colors={["#FFF685", "#2E64FE"]}
      animationSpeed={3}
      showBorder={false}
      className="inline"
    >
      Credit Card Fraud Detection
    </GradientText>
  </motion.span>
</h1>


        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Protect your business with our advanced AI-powered solution
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to="/detection"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
