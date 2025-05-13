import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Cylinder, Text, Line, MeshWobbleMaterial } from "@react-three/drei";
import Aurora from "./Aurora";
ChartJS.register(ArcElement, Tooltip, Legend);

const CyberBackground = () => {
  const groupRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time / 4) * 0.2;
    groupRef.current.rotation.x = Math.cos(time / 4) * 0.1;
  });

  const gridSize = 10;
  const lineCount = 5;

  return (
    <group ref={groupRef}>
      {/* Grid */}
      {[...Array(lineCount)].map((_, i) => (
        <React.Fragment key={i}>
          <Line
            points={[
              [-gridSize / 2, -gridSize / 2 + (i * gridSize) / (lineCount - 1), 0],
              [gridSize / 2, -gridSize / 2 + (i * gridSize) / (lineCount - 1), 0],
            ]}
            color="#00ff00"
            lineWidth={1}
            dashed={true}
          />
          <Line
            points={[
              [-gridSize / 2 + (i * gridSize) / (lineCount - 1), -gridSize / 2, 0],
              [-gridSize / 2 + (i * gridSize) / (lineCount - 1), gridSize / 2, 0],
            ]}
            color="#00ff00"
            lineWidth={1}
            dashed={true}
          />
        </React.Fragment>
      ))}

      {/* Floating cubes */}

      

      {/* Floating text */}
     
    </group>
  );
};

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("LogisticRegression");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [modelName, setModelName] = useState("Logistic Regression");

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setResults([]);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setError("");
    console.log(modelName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a file");
      return;
    }


    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", selectedModel);

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/", formData);
      setResults(response.data);
      setError("");
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to process the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats for pie chart and results
  const fraudCount = results.reduce((acc, row) => (row.Fraudulent ? acc + 1 : acc), 0);
  const legitCount = results.length - fraudCount;
  const totalCount = results.length;

  const pieData = {
    labels: ["Legitimate Transactions", "Fraudulent Transactions"],
    datasets: [
      {
        data: [legitCount, fraudCount],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#45A049", "#E53935"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      millisecondsloop: true   
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const percentage = Math.round((tooltipItem.raw / totalCount) * 100);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  console.log(modelName);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
  <Aurora
    colorStops={["#00FFF7", "#5A00FF", "#FF00C8"]}
    blend={2}
    amplitude={2.0}
    speed={1.5}
  />
</div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: animationComplete ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-slate-100 backSdrop-filter backdrop-blur-lg p-10 rounded-2xl shadow-2xl relative overflow-hidden border border-blue-500"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-4xl font-bold text-blue-500 text-center mb-6"
          >
            Credit Card Fraud Detection
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit}
            onClick={() => setModelName(selectedModel === "LogisticRegression" ? "Logistic Regression" : "Random Forest")}
            className="w-full max-w-lg bg-blue-500    p-8 rounded-lg shadow-md mx-auto"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="mb-6">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center px-4 py-6 bg-blue-900 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-800 hover:text-blue-200 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Select a file</span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {file && (
                <p className="mt-2 text-sm text-white text-center">
                  Selected file: {file.name}
                </p>
              )}
            </div>
            <h2 className="text-sm font-bold mb-4 text-white text-center">Choose Model:</h2>
            <div className="flex justify-center gap-4 mb-6">
              {["LogisticRegression", "RandomForestClassifier"].map((model) => (
                <motion.button
                  key={model}
                  type="button"
                  onClick={() => handleModelSelect(model)}
                  className={`px-4 py-2 rounded-full ${
                    selectedModel === model
                      ? "bg-red-600 text-white"
                      : "bg-white text-black"
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {model === "LogisticRegression" ? "Logistic Regression" : "Random Forest"}
                </motion.button>
              ))}
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-900 text-white py-3 px-6 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="ml-2">Processing...</span>
                </motion.div>
              ) : (
                "Upload and Detect"
              )}
            </motion.button>
          </motion.form>
          

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-red-500 mt-4 text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {results.length > 0 && !loading && (
              <div>
              <h2 className="text-3xl text-center pt-5 font-bold underline ">Using {modelName}</h2>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.5 }}
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  className="flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <div className="w-72 h-72">
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                </motion.div>
              
                <div>
                
                
                  <h2 className="text-2xl font-bold text-black mb-4 text-center">
                    Transaction Results
                  </h2>
                  <div className="overflow-y-auto max-h-56 border-black rounded-lg p-4">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-white ">
                          <th className="border border-black px-4 py-2 text-white bg-slate-500">
                            Transaction ID
                          </th>
                          <th className="border border-black px-4 py-2 text-white bg-slate-500">
                            Prediction
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((item, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${
                              item.Fraudulent ? "bg-red-300 " : "bg-green-500 bg-opacity-20"
                            }`}
                          >
                            <td className="border border-black px-4 py-2 text-center text-black">
                              {item.Transaction}
                            </td>
                            <td
                              className={`border border-black px-4 py-2 text-center font-semibold ${
                                item.Fraudulent ? "text-red-400" : "text-green-400"
                              }`}
                            >
                              {item.Fraudulent ? "Fraudulent" : "Legitimate"}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <motion.div
                  className="flex justify-between col-span-2 mt-6 gap-8 text-black font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div>
                    <strong className="text-blue-500">Total Transactions: </strong>
                    <span className="text-bold">{totalCount}</span>
                  </div>
                  <div>
                    <strong className="text-red-500">Fraudulent: </strong>
                    <span className="text-bold">{fraudCount}</span>
                  </div>
                  <div>
                    <strong className="text-green-500">Legitimate: </strong>
                    <span>{legitCount}</span>
                  </div>
                </motion.div>
              </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FileUpload;