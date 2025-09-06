import React, { useState } from "react";
import axios from "axios";
import "./SearchPincode.css";

// SearchPincode.js (snippet)
function SearchPincode({ onResult }) {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!pincode) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/search?pincode=${pincode}`);
      setResult(res.data);
      onResult && onResult(res.data);
    } catch (e) {
      alert("Search failed. Verify backend and pincode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Search Groundwater Data</h2>
      <input className="search-input" value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder="Enter Pincode"/>
      <button className="search-button" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {result && (
        <div className="search-result">
          <p><strong>Pincode:</strong> {result.pincode}</p>
          <p><strong>HEI:</strong> {result.hei}</p>
          <p><strong>Cd:</strong> {result.cd}</p>
          <p><strong>Status:</strong> {result.status}</p>
        </div>
      )}
    </div>
  );
}


export default SearchPincode;
