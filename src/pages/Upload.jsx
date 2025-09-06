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

    // ✅ Set limits
    const limits = {
      iron: 100,
      copper: 50,
      zinc: 70,
      lead: 10,
      cadmium: 5,
    };

    // ✅ Validation with specific alerts
    for (const key in formData) {
      const value = Number(formData[key]);
      if (value < 0) {
        alert(`${key.toUpperCase()} cannot be negative!`);
        return;
      }
      if (value > limits[key]) {
        alert(
          `⚠️ ${key.toUpperCase()} value (${value}) exceeds the safe limit of ${limits[key]} mg/L`
        );
        return;
      }
    }

    console.log("Form submitted:", formData);
    alert("✅ Data uploaded successfully!");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Upload Sample Data</h2>
      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label>Iron (Fe):</label>
          <input
            type="number"
            name="iron"
            value={formData.iron}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        <div style={fieldStyle}>
          <label>Copper (Cu):</label>
          <input
            type="number"
            name="copper"
            value={formData.copper}
            onChange={handleChange}
            min="0"
            max="50"
          />
        </div>

        <div style={fieldStyle}>
          <label>Zinc (Zn):</label>
          <input
            type="number"
            name="zinc"
            value={formData.zinc}
            onChange={handleChange}
            min="0"
            max="70"
          />
        </div>

        <div style={fieldStyle}>
          <label>Lead (Pb):</label>
          <input
            type="number"
            name="lead"
            value={formData.lead}
            onChange={handleChange}
            min="0"
            max="10"
          />
        </div>

        <div style={fieldStyle}>
          <label>Cadmium (Cd):</label>
          <input
            type="number"
            name="cadmium"
            value={formData.cadmium}
            onChange={handleChange}
            min="0"
            max="5"
          />
        </div>

        <button type="submit" style={btnStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

const fieldStyle = {
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const btnStyle = {
  padding: "10px 20px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Upload;
