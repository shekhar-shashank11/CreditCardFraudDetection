import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setResults([]);
  };

  // Handle form submission
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

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-6">
        Credit Card Fraud Detection
      </h1>

      {/* File Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? "Processing..." : "Upload and Detect"}
        </button>
      </form>

      {/* Display Errors */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display Results */}
      {results.length  > 0 && !loading && (
        <div className="flex flex-col items-center justify-center p-6 mt-6 bg-white w-full rounded-lg shadow-lg">
          <div className="pt-4 text-3xl font-semibold">Result</div>
          <div className="flex justify-around w-full my-3">
            <div className="text-gray-600 text-xl font-semibold">
              Total Transactions: <span className="text-blue-500">{results.length}</span>
            </div>
            <div className="text-gray-600 text-xl font-semibold">
              Legitimate Transaction: <span className="text-green-600">{results.reduce((acc,row) => {
                if(!row.Fraudulent) return acc+1;
                return acc;
              },0)}</span>
            </div>
            <div className="text-gray-600 text-xl font-semibold">
              Fraud Transaction: <span className="text-red-600 ">{results.reduce((acc,row) => {
                if(row.Fraudulent) return acc+1;
                return acc;
              },0)}</span>
            </div>
          </div>
          <div>
            <p className="text-3xl text-gray-700 font-semibold">Fraud Transactions</p>
          <div className="flex flex-col gap-2 items-center text-lg mt-2">
            {results.filter((result) => {return result.Fraudulent===true}).map((item,index) => {
              return <span className="text-red-700">Transaction Id: {item.Transaction}</span>
            })}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;