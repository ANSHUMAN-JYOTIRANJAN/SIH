import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ChartExample from "../components/ChartExample";
import SearchPincode from "../components/SearchPincode";
import "./Dashboard.css";

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [location, setLocation] = useState(null);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          🌊 Heavy Metal Pollution Indices (HMPI) Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Track, Analyze, and Predict Water Quality in Your Region
        </p>
      </header>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card high">
          <h2>🔥 High Risk Samples</h2>
          <p></p>
        </div>
        <div className="summary-card medium">
          <h2>⚠️ Medium Risk</h2>
          <p></p>
        </div>
        <div className="summary-card safe">
          <h2>💧 Safe Samples</h2>
          <p></p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* File Upload Section */}
        <div className="card hover-lift">
          <h2 className="card-title">📂 Upload Dataset</h2>
          <FileUpload onDataProcessed={(data) => setChartData(data)} />
        </div>

        {/* Search Section */}
        <div className="card hover-lift">
          <h2 className="card-title">📍 Find Location by Pincode</h2>
          <SearchPincode onResult={(res) => setLocation(res)} />
          {location && (
            <div className="location-box">
              <p>
                <strong>Pincode:</strong> {location.pincode}
              </p>
              <p>
                <strong>City:</strong> {location.city}
              </p>
              <p>
                <strong>State:</strong> {location.state}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <div className="card chart-card hover-lift">
        <h2 className="card-title">📊 Pollution Index Visualization</h2>
        {chartData ? (
          <ChartExample data={chartData} />
        ) : (
          <p className="no-data-text">Upload a dataset to see results.</p>
        )}
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <button className="cta-button">Go to Detailed Visualization ➡️</button>
      </div>
    </div>
  );
};

export default Dashboard;
