import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";




// FileUpload.js (snippet)
function FileUpload({ onDataProcessed }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a CSV file!");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Call parent with whatever chart data your backend returns
      onDataProcessed && onDataProcessed(res.data); 
      alert("File uploaded successfully!");
    } catch (e) {
      alert("Upload failed. Check server & CSV format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h2 className="file-upload-title">Upload Groundwater Data (CSV)</h2>
      <input type="file" accept=".csv" onChange={(e)=>setFile(e.target.files[0])}/>
      <button onClick={handleUpload} className="file-upload-button" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}


export default FileUpload;