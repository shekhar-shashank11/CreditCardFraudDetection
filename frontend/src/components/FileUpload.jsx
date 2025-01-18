import { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering chart elements and components
ChartJS.register(ArcElement, Tooltip, Legend);

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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

  const fraudCount = results.reduce(
    (acc, row) => (row.Fraudulent ? acc + 1 : acc),
    0
  );
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
      loop: true, // Enables continuous animation
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const percentage = Math.round((tooltipItem.raw / totalCount) * 100);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 relative"
      style={{
                 backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20230702/pngtree-d-illustration-of-black-concrete-background-with-blue-credit-card-design-image_3739414.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center', }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div
        className="max-w-4xl w-full bg-white p-10 rounded-2xl shadow-2xl relative overflow-hidden"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        {/* Floating Decorative Elements */}
        <div className="absolute w-48 h-48 bg-blue-500 opacity-20 rounded-full -top-16 -left-16 animate-bounce"></div>
        <div className="absolute w-32 h-32 bg-pink-400 opacity-20 rounded-full -bottom-16 right-10 animate-bounce delay-150"></div>
        <div className="absolute w-24 h-24 bg-yellow-400 opacity-20 rounded-full top-20 left-20 animate-pulse"></div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Credit Card Fraud Detection
        </h1>

        {/* File Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-100 p-8 rounded-lg shadow-md mx-auto"
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? "Processing..." : "Upload and Detect"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Results */}
        {results.length > 0 && !loading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="flex justify-center">
              <div className="w-72 h-72">
                <Pie data={pieData} options={pieOptions} />
              </div>
              
            </div>
            


            {/* Table */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Results
              </h2>
              <div className="overflow-y-auto max-h-56">
                <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                      <th className="border border-gray-300 px-4 py-2">Prediction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-100 ${
                          item.Fraudulent ? "bg-red-200" : "bg-green-200"
                        }`}
                      >
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {item.Transaction}
                        </td>
                        <td
                          className={`border border-gray-300 px-4 py-2 text-center font-semibold ${
                            item.Fraudulent ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {item.Fraudulent ? "Fraudulent" : "Legitimate"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
            </div>

    {/* Total Transactions, Fraud, and Legitimate Counts */}
    <div className="flex  items-center justify-center mt-6 gap-8">
  <div className="text-sm text-gray-600">
    <strong className="text-blue-600 text-lg">Total Transactions:</strong> 
    <span className="text-gray-800 text-xl text-semibold">{totalCount}</span>
  </div>

  <div className="text-sm text-gray-600 py-5">
    <strong className="text-red-600 text-lg">Fraudulent :</strong> 
    <span className="text-red-800 text-xl">{fraudCount}</span>
  </div>

  <div className="text-sm text-gray-600">
    <strong className="text-green-600 text-lg">Legitimate :</strong> 
    <span className="text-green-800 text-xl">{legitCount}</span>
  </div>
</div>


          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
