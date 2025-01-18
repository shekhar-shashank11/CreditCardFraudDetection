import React from "react";
import Fade from "react-reveal/Fade"; // For animations
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const About = () => {
  return (
    <>



      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white py-12">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Heading */}
          <Fade top>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-10">
              About Credit Card Fraud Detection
            </h2>
          </Fade>

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Side: Text Content */}
            <Zoom>
              <div className="lg:w-1/2">
                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  Credit Card Fraud Detection is the process of identifying unauthorized or fraudulent transactions made using credit cards. It is a critical challenge in the financial industry, as fraudulent activities can result in significant financial losses for businesses and customers.

                  With the increasing number of digital transactions, detecting fraud has become more complex. Machine learning techniques are commonly used to analyze transaction data and identify patterns or anomalies that could indicate fraud. These systems are designed to minimize false positives (legitimate transactions flagged as fraud) while ensuring fraudulent activities are detected in real-time.

                  The goal of fraud detection is to enhance the security of financial systems, protect customer data, and prevent financial losses by proactively identifying and mitigating risks.
                </p>
            
              </div>
            </Zoom>

            {/* Right Side: Image Section */}
            <Bounce>
              <div className="relative lg:w-1/2 flex justify-center">
                <div className=" p-1 shadow-lg w-72 h-72 md:w-96 md:h-96">
                  <img
                    src="https://media.istockphoto.com/id/1497591487/photo/credit-cards-stacked-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=mSJ1oqZNEtFAmJEXUECDBMiAOO2xXENCAdLKfflKtrU="
                    alt="Credit Card Fraud"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </Bounce>
          </div>

          {/* Animation Features */}
          <Fade bottom>
            <div className="mt-16 text-center">
              <h3 className="text-3xl font-semibold mb-4">Key Features</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="w-80 p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h4 className="text-xl font-bold mb-3">Machine Learning Algorithms</h4>
                  <p className="text-gray-400">
              

Utilizes advanced algorithms (e.g., Random Forest, Logistic Regression, Neural Networks) to detect patterns and anomalies in transaction data.
                    
                  </p>
                </div>
                <div className="w-80 p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h4 className="text-xl font-bold mb-3"> High Accuracy and Scalability</h4>
                  <p className="text-gray-400">
                 

Provides high detection accuracy while maintaining the ability to handle large volumes of transaction data.
                  </p>
                </div>
                <div className="w-80 p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h4 className="text-xl font-bold mb-3"> Data Analysis and Insights</h4>
                  <p className="text-gray-400">
                 

Analyzes historical transaction data to improve fraud detection accuracy and generate actionable insights.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default About;
