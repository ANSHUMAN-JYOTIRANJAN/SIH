// src/pages/Upload.jsx
import React, { useState } from "react";

function Upload() {
  const [formData, setFormData] = useState({
    iron: "",
    copper: "",
    zinc: "",
    lead: "",
    cadmium: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Data uploaded successfully!");
    console.log("Form submitted:", formData);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)", // ✅ dark blue gradient
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1e3a8a" }}>
          Upload Sample Data
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Iron (Fe):</label>
            <input type="number" name="iron" value={formData.iron} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Copper (Cu):</label>
            <input type="number" name="copper" value={formData.copper} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Zinc (Zn):</label>
            <input type="number" name="zinc" value={formData.zinc} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Lead (Pb):</label>
            <input type="number" name="lead" value={formData.lead} onChange={handleChange} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Cadmium (Cd):</label>
            <input type="number" name="cadmium" value={formData.cadmium} onChange={handleChange} />
          </div>

          <button type="submit" style={btnStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const fieldStyle = {
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const labelStyle = {
  color: "black", // ✅ makes labels black
  fontWeight: "600",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  marginTop: "10px",
};

export default Upload;
