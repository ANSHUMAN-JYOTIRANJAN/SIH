import React, { useState } from "react";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import PollutionMap from "../components/PollutionMap";
import Alerts from "../components/Alerts";
import BarChart from "../components/BarChart";
import Footer from "../components/Footer"; // Import Footer

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

import "./Dashboard.css";

const Dashboard = ({ sidebarOpen }) => {
  const [filters, setFilters] = useState({});
  const [chartData, setChartData] = useState(null);

  // Yearly trends data
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
          🌊 Heavy Metal Pollution Indices (HMPI) Dashboard
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

      {/* Filters */}
      <Filters onFilterChange={(f) => setFilters(f)} />

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Top Row: Map */}
        <div className="card map-card">
          <h2 className="card-title">🗺️ Geographic Spread</h2>
          <PollutionMap filters={filters} />
        </div>

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
                <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
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
