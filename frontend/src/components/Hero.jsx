import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Iridescence from "./Iridescence";
import BlurText from "./BlurText";
import GradientText from './GradientText' 
import ShinyText from './ShinyText'
import { LoopOnce } from "three";
const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
const sentence = "Credit Card Fraud Detection";
const words = sentence.split(" ");
const sentence2 = "Protect your business with our advanced AI-powered solution";
const words2 = sentence2.split(" ");

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

  {/* Optional Faded Overlay */}
  
  {/* Hero Content */}
  <div className="relative z-20 text-center text-white px-5">
    <h1 className="text-5xl font-bold mb-8 text-white text-center">
      <motion.span
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
       
        
   <div className="text-5xl font-bold mb-5 text-center">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)", y: -20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.3,
          }}
          className="inline-block mx-1"
        >
          <GradientText
            colors={[ "#1C1C7C", "#FF0055", "#2B32B2"," #FFD700"]}
            animationSpeed={3}
            showBorder={false}
            className="inline"
          >
            {word}
          </GradientText>
        </motion.span>
      ))}
    </div>
    
         
    <div className="text-3xl font-bold mb-8 text-center">
      {words2.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)", y: -20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.3,
          }}
          className="inline-block mx-1"
        >
          <GradientText
            colors={["#1A1AFF","#1C1C7C","#E0E0E0"]}
            animationSpeed={3}
            showBorder={false}
            className="inline"
          >
            {word}
          </GradientText>
        </motion.span>
      ))}
    </div>
       
      </motion.span>
    </h1>

    {/* Updated Text with BlurText style */}
    
  

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to="/detection"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-fuchsia-900 to-violet-500 rounded-full shadow-md hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-fuchsia-400"

          >
            
            <ShinyText text="Get Started" disabled={false} speed={3} className='custom-class' />
          </Link>
          
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
