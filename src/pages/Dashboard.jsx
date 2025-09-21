import React, { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import Alerts from "../components/Alerts";
import BarChart from "../components/BarChart";
import Footer from "../components/Footer";

// Recharts imports for Pollution Trends
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";

const Dashboard = ({ sidebarOpen }) => {
  // ✅ Filters
  const [filters, setFilters] = useState({
    metalType: "pH",
    year: "",
    location: "",
  });

  const [chartData, setChartData] = useState(null);

  // ✅ Example Water Quality Data
  const waterQualityData = [
    {
      LOCATION: "Delhi",
      Year: 2022,
      LATITUDE: 28.7041,
      LONGITUDE: 77.1025,
      pH: 7.2,
      TDS: 1200,
      EC: 400,
    },
    {
      LOCATION: "Mumbai",
      Year: 2021,
      LATITUDE: 19.076,
      LONGITUDE: 72.8777,
      pH: 6.4,
      TDS: 1800,
      EC: 600,
    },
    {
      LOCATION: "Ranchi",
      Year: 2022,
      LATITUDE: 23.3441,
      LONGITUDE: 85.3096,
      pH: 8.6,
      TDS: 900,
      EC: 300,
    },
  ];

  // ✅ Initialize & Update Map
  useEffect(() => {
    const map = L.map("map").setView([20.5937, 78.9629], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const filtered = waterQualityData.filter(
      (item) =>
        (!filters.year || item.Year === parseInt(filters.year)) &&
        (!filters.location ||
          item.LOCATION.toLowerCase().includes(filters.location.toLowerCase()))
    );

    filtered.forEach((point) => {
      let color = "#3388ff";

      if (filters.metalType === "pH") {
        if (point.pH < 6.5) color = "red";
        else if (point.pH <= 8.5) color = "yellow";
        else color = "blue";
      } else if (filters.metalType === "TDS") {
        color = point.TDS > 1500 ? "red" : "green";
      } else if (filters.metalType === "EC") {
        color = point.EC > 500 ? "red" : "green";
      }

      L.circleMarker([point.LATITUDE, point.LONGITUDE], {
        radius: 6,
        fillColor: color,
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8,
      })
        .addTo(map)
        .bindPopup(
          `<b>${point.LOCATION}</b><br/>${filters.metalType}: ${point[filters.metalType]}`
        );
    });

    return () => {
      map.remove();

    };
  }, [filters]);

  //
  const timeSeriesData = [
    { year: 2018, Pb: 25, Cd: 15, As: 12, Hg: 10 },
    { year: 2019, Pb: 30, Cd: 18, As: 20, Hg: 15 },
    { year: 2020, Pb: 35, Cd: 20, As: 25, Hg: 18 },
    { year: 2021, Pb: 28, Cd: 22, As: 18, Hg: 12 },
    { year: 2022, Pb: 40, Cd: 25, As: 30, Hg: 20 },
    { year: 2023, Pb: 38, Cd: 28, As: 27, Hg: 17 },
  ];

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          Heavy Metal Pollution Indices (HMPI) Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Track, Analyze, and Predict Water Quality in Your Region
        </p>
      </header>

      {/* Summary Cards */}
      <SummaryCards
        totalSamples={1230}
        highRiskAreas={15}
        safePercent={72}
        lastUpdated="2 hrs ago"
      />

      {/* ✅ Filters Section */}
      <div className="filters-container">
        <div className="filter-item">
          <label>Parameter</label>
          <select
            value={filters.metalType}
            onChange={(e) =>
              setFilters({ ...filters, metalType: e.target.value })
            }
          >
            <option value="HMPI">HMPI</option>
            <option value="PH">PH</option>
            <option value="TDS">TDS</option>
            <option value="EC">EC</option>
            
          </select>
        </div>

        <div className="filter-item">
          <label>Year</label>
          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">All</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Location</label>
          <input
            type="text"
            placeholder="Search location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Top Row: Map */}
        <div className="card map-card">
          <h2 className="card-title">🗺️ Geographic Spread</h2>
          <div
            id="map"
            style={{ height: "500px", width: "100%", borderRadius: "10px" }}
          ></div>
        </div>

        {/* ✅ New Heavy Metal Info Section
        <div className="card metal-info-card">
          <h2 className="card-title">⚠️ Heavy Metal Information</h2>
          <ul className="metal-info-list">
            <li>
              <strong>Pb (Lead):</strong> Damages nervous system, dangerous for
              children.
            </li>
            <li>
              <strong>Cd (Cadmium):</strong> Causes kidney damage, brittle
              bones.
            </li>
            <li>
              <strong>Hg (Mercury):</strong> Affects brain & kidneys,
              bioaccumulative.
            </li>
            <li>
              <strong>As (Arsenic):</strong> Carcinogenic, affects skin and
              organs.
            </li>
          </ul>
        </div> */}

        {/* Bottom Row: Trends, Bar Chart, Alerts */}
        <div className="dashboard-row">
          {/* Pollution Trends Line Chart */}
          <div className="card trend-card">
            <h2 className="card-title">📊 Pollution Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={timeSeriesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  stroke="rgba(255,255,255,0.2)"
                  strokeDasharray="3 3"
                />
                <XAxis dataKey="year" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1b33",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="Pb" stroke="#8884d8" />
                <Line type="monotone" dataKey="Cd" stroke="#82ca9d" />
                <Line type="monotone" dataKey="As" stroke="#ffc658" />
                <Line type="monotone" dataKey="Hg" stroke="#ff7f7f" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pollution Comparison Bar Chart */}
          <div className="card bar-card">
            <h2 className="card-title">📈 Pollution Comparison</h2>
            <BarChart filters={filters} data={chartData} />
          </div>

          {/* Alerts */}
          <div className="card alert-card">
            <h2 className="card-title">🚨 Recent Alerts</h2>
            <Alerts />
          </div>
        </div>
      </div>

      {/* Footer */}
     
    </div>
  );
};

export default Dashboard;
