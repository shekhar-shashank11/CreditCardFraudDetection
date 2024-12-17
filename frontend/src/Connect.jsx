import React, { useEffect, useState } from "react";
import axios from "axios";

function Connect() {
  const [data, setData] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    // Fetch data from the Flask backend
    axios.get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = () => {
    // Send data to the Flask backend
    axios.post("http://localhost:5000/api/submit", { name: "React User" })
      .then((response) => {
        setSubmittedData(response.data.received_data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>React + Python Backend</h1>
      <p>Message from backend: {data}</p>
      <button onClick={handleSubmit}>Send Data to Backend</button>
      {submittedData && <p>Submitted data: {JSON.stringify(submittedData)}</p>}
    </div>
  );
}

export default Connect;
