import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // 👈 add navigation
import HMPIGauge from "../components/HMPIGauge";
import "./Upload.css";

function Upload() {
  const navigate = useNavigate();

  const locations = [
    { city: "Ranchi", state: "Jharkhand", country: "India" },
    { city: "Delhi", state: "Delhi", country: "India" },
    { city: "Bhubaneswar", state: "Odisha", country: "India" }
  ];

  const [formData, setFormData] = useState({
    city: "",
    state: "",
    country: "",
    iron: "",
    copper: "",
    zinc: "",
    lead: "",
    cadmium: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLocationChange = (e) => {
    const location = locations.find((loc) => loc.city === e.target.value);
    if (location) {
      setFormData((prev) => ({
        ...prev,
        city: location.city,
        state: location.state,
        country: location.country
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePredict = () => {
    if (!formData.city || !formData.state || !formData.country) {
      alert("⚠️ Please select your location.");
      return;
    }

    const values = ["iron", "copper", "zinc", "lead", "cadmium"].map((m) =>
      Number(formData[m])
    );
    if (values.some((val) => isNaN(val) || val === "")) {
      alert("⚠️ Please enter valid values for all metal fields.");
      return;
    }

    const hmpiValue = (
      Number(formData.lead) * 20 +
      Number(formData.cadmium) * 15 +
      Number(formData.iron) * 5 +
      Number(formData.copper) * 3 +
      Number(formData.zinc) * 2
    ).toFixed(2);

    let riskStatus = "Safe";
    let recommendation = "✅ Water is safe to drink.";
    if (hmpiValue > 100) {
      riskStatus = "Unsafe";
      recommendation = "❌ Avoid drinking, water treatment required.";
    } else if (hmpiValue > 50) {
      riskStatus = "Moderate Risk";
      recommendation = "⚠️ Use with caution. Further testing recommended.";
    }

    setPrediction({ hmpiValue, riskStatus, recommendation });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  // 👇 Navigate to Visualization page
  const handleVisualize = () => {
    navigate("/visualization", { state: { formData, prediction } });
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-card">
        {/* Input Form */}
        <div className="form-section">
          <h2>Location & HMPI Calculator</h2>

          <form>
            {/* Location Section */}
            <h3>🌍 Location Details</h3>
            <div className="input-row">
              <label>Select Location:</label>
              <select onChange={handleLocationChange} value={formData.city}>
                <option value="">-- Choose a location --</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc.city}>
                    {loc.city}, {loc.state}
                  </option>
                ))}
              </select>
            </div>

            {formData.city && (
              <div className="input-row">
                <p>
                  <strong>Selected:</strong> {formData.city}, {formData.state},{" "}
                  {formData.country}
                </p>
              </div>
            )}

            {/* Metals Section */}
            <h3>⚗️ Metal Concentrations</h3>
            {["iron", "copper", "zinc", "lead", "cadmium"].map((metal) => (
              <div className="input-row" key={metal}>
                <label>{metal.charAt(0).toUpperCase() + metal.slice(1)}:</label>
                <input
                  type="number"
                  name={metal}
                  value={formData[metal]}
                  onChange={handleChange}
                  placeholder={`Enter ${metal} (mg/L)`}
                />
              </div>
            ))}

            <button type="button" onClick={handlePredict} className="calc-btn">
              CALCULATE
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="results-section">
          <h2>Results</h2>

          {prediction ? (
            <div className="results-box">
              <div>
                <span className="label">📍 Location</span>
                <p>
                  {formData.city}, {formData.state}, {formData.country}
                </p>
              </div>

              <div>
                <span className="label">HMPI Value</span>
                <span className="value">{prediction.hmpiValue}</span>
              </div>
              <div>
                <span className="label">Risk Status</span>
                <span
                  className="value"
                  style={{
                    color:
                      prediction.riskStatus === "Unsafe"
                        ? "red"
                        : prediction.riskStatus === "Moderate Risk"
                        ? "orange"
                        : "green",
                  }}
                >
                  {prediction.riskStatus}
                </span>
              </div>
              <div>
                <span className="label">Recommendation</span>
                <p>{prediction.recommendation}</p>
              </div>
              <HMPIGauge hmpiValue={Number(prediction.hmpiValue)} />

              {/* 👇 New Visualize Button */}
              <button onClick={handleVisualize} className="calc-btn" style={{ marginTop: "15px", background: "#22c55e" }}>
                📊 Visualize Data
              </button>
            </div>
          ) : (
            <div className="empty-results">
              <p>Select location + enter values and click Calculate</p>
            </div>
          )}

          {/* File Upload */}
          <div className="file-upload">
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              onClick={handleUploadClick}
              className={`upload-btn ${selectedFile ? "uploaded" : ""}`}
            >
              <FaCloudUploadAlt style={{ marginRight: "8px" }} />
              {selectedFile ? selectedFile.name : "CHOOSE FILE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
