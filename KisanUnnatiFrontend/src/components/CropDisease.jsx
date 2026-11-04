import React, { useState } from "react";
import axios from "axios";

function CropDisease() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Before set result.....")
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Prediction failed. Check backend.");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 pt-28">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          🌱 Crop Disease Prediction
        </h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none mb-4 p-2"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Upload & Predict
        </button>

        {result && (
          <div className="mt-6 p-4 text-left bg-green-50 border border-green-200 rounded-xl shadow-inner">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Prediction Result
            </h3>
            <p>
              <b>Class:</b> {result.clazz}
            </p>
            <p>
              <b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%
            </p>
            <p>
              <b>Risk:</b> {result.risk}
            </p>
            <p>
              <b>Organic Treatment:</b> {result.organic_treatment}
            </p>
            <p>
              <b>Chemical Treatment:</b> {result.chemical_treatment}
            </p>
            <p>
              <b>Estimated Loss:</b> {result.estimated_loss}
            </p>

            {result.resources && result.resources.length > 0 && (
              <div className="mt-3">
                <b>Resources:</b>
                <ul className="list-disc list-inside text-sm text-green-900">
                  {result.resources.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropDisease;
