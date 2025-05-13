import React from "react";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lottie from "react-lottie";
import AboutAni from "../assets/about.json";
import SpotLightCard from "../components/SpotLightCard";

const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AboutAni,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
     

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-6">
        <div className="container mx-auto px-6 lg:px-20 text-white">
          {/* Heading */}
          <Fade top>
            <h2 className="text-4xl md:text-6xl text-white text-center mb-10">
              About Credit Card Fraud Detection
            </h2>
          </Fade>

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Side: Text Content */}
            <Zoom>
              <div className="lg:w-1/2">
                <p className="text-lg leading-relaxed text-white mb-6 font-semibold">
                  Credit Card Fraud Detection is the process of identifying
                  unauthorized or fraudulent transactions made using credit
                  cards. It is a critical challenge in the financial industry,
                  as fraudulent activities can result in significant financial
                  losses for businesses and customers. The goal of fraud
                  detection is to enhance the security of financial systems,
                  protect customer data, and prevent financial losses by
                  proactively identifying and mitigating risks.
                </p>
              </div>
            </Zoom>

            {/* Right Side: Animation */}
            <Bounce>
              <div className="relative lg:w-1/2 flex justify-center">
                <div className="p-1 shadow-[0_25px_30px_-12px] w-72 h-36 md:w-96 md:h-96">
                  <Lottie options={defaultOptions} height={400} width={400} />
                </div>
              </div>
            </Bounce>
          </div>

          {/* Key Features Section */}
          <Fade bottom>
            <div className="mt-16 text-center bg-opacity-50">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Key Features
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  {
                    title: "Machine Learning Algorithms",
                    desc: "Utilizes advanced algorithms (e.g., Random Forest, Logistic Regression, Neural Networks) to detect patterns and anomalies in transaction data.",
                  },
                  {
                    title: "High Accuracy and Scalability",
                    desc: "Provides high detection accuracy while maintaining the ability to handle large volumes of transaction data.",
                  },
                  {
                    title: "Data Analysis and Insights",
                    desc: "Analyzes historical transaction data to improve fraud detection accuracy and generate actionable insights.",
                  },
                ].map((feature, i) => (
                  <SpotLightCard key={i}>
                    <div className="w-80 p-6  rounded-lg shadow-lg">
                      <h4 className="text-xl font-bold mb-3 text-white">
                        {feature.title}
                      </h4>
                      <p className="text-white">{feature.desc}</p>
                    </div>
                  </SpotLightCard>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
