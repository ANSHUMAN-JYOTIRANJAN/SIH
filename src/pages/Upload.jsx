import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import HMPIGauge from "../components/HMPIGauge";

function Upload() {
  const [formData, setFormData] = useState({
    iron: "", copper: "", zinc: "", lead: "", cadmium: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = () => {
    const values = Object.values(formData).map(Number);
    if (values.some(val => isNaN(val) || val === "")) {
      alert("⚠️ Please enter valid values for all fields.");
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, rgba(37, 99, 235,0.8), rgba(30, 58, 138,0.8)), 
                     url('https://images.unsplash.com/photo-1582719478141-4a2d3a3e7ef4?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: "950px",
          display: "flex",
          gap: "25px",
          flexWrap: "wrap"
        }}
      >
        {/* Input Form */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1e3a8a" }}>
            HMPI Calculator
          </h2>
          <form>
            {["iron", "copper", "zinc", "lead", "cadmium"].map((metal) => (
              <div style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }} key={metal}>
                <label style={{ fontWeight: "600", color: "#1e3a8a" }}>
                  {metal.charAt(0).toUpperCase() + metal.slice(1)}:
                </label>
                <input
                  type="number"
                  name={metal}
                  value={formData[metal]}
                  onChange={handleChange}
                  placeholder={`Enter ${metal}`}
                  style={{
                    flex: "1",
                    marginLeft: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px"
                  }}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handlePredict}
              style={{
                width: "100%",
                padding: "14px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "16px",
                marginTop: "10px",
                transition: "transform 0.25s ease",
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              CALCULATE
            </button>
          </form>
        </div>

        {/* Results */}
        <div style={{ flex: 1, minWidth: "280px", borderLeft: "1px solid #ddd", paddingLeft: "20px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1e3a8a" }}>
            Results
          </h2>

          {prediction ? (
            <div style={{ background: "#f0f4ff", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <img 
                src="https://images.unsplash.com/photo-1581091215363-12b3e9decd24?auto=format&fit=crop&w=500&q=60" 
                alt="Water Illustration" 
                style={{ width: "100px", marginBottom: "15px", borderRadius: "50%" }}
              />
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold", color: "#1e3a8a" }}>HMPI Value</span>
                <span style={{ display: "block", fontSize: "2.2rem", fontWeight: "bold" }}>{prediction.hmpiValue}</span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold", color: "#1e3a8a" }}>Risk Status</span>
                <span style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold", color: prediction.riskStatus === "Unsafe" ? "red" : prediction.riskStatus === "Moderate Risk" ? "orange" : "green" }}>
                  {prediction.riskStatus}
                </span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold", color: "#1e3a8a" }}>Recommendation</span>
                <p style={{ fontSize: "1rem", color: "#333" }}>{prediction.recommendation}</p>
              </div>
              <HMPIGauge hmpiValue={Number(prediction.hmpiValue)} /> 
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#888", marginTop: "30px" }}>
              <p>Enter values and click Calculate</p>
              
            </div>
          )}

          {/* File Upload */}
          <div style={{ marginTop: "25px", textAlign: "center" }}>
            <input 
              type="file" 
              id="fileInput" 
              style={{ display: "none" }} 
              onChange={handleFileChange} 
            />
            <button 
              onClick={handleUploadClick}
              style={{
                width: "100%",
                padding: "14px",
                background: selectedFile ? "#22c55e" : "#fff",
                color: selectedFile ? "#fff" : "#2563eb",
                border: `2px solid #2563eb`,
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (!selectedFile) { e.target.style.background = "#2563eb"; e.target.style.color = "#fff"; }
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                if (!selectedFile) { e.target.style.background = "#fff"; e.target.style.color = "#2563eb"; }
                e.target.style.transform = "scale(1)";
              }}
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
