import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import './Reports.css';

// Sample data for the Line Chart
const lineChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

// Sample data for the Pie Chart
const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Reports = () => {
  const [filters, setFilters] = useState({
    timeRange: '',
    location: '',
    metalType: '',
    riskCategory: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      timeRange: '',
      location: '',
      metalType: '',
      riskCategory: '',
    });
  };

  const generateReport = () => {
    console.log('Generating report with filters:', filters);
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <h1>Reports Dashboard</h1>
        <span className="report-date">{new Date().toLocaleDateString()}</span>
      </div>

      <div className="reports-content">
        {/* Filters */}
        <div className="reports-filters">
          <h2>Filters</h2>
          {['timeRange', 'location', 'metalType', 'riskCategory'].map((field) => (
            <div className="filter-group" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <select
                name={field}
                id={field}
                value={filters[field]}
                onChange={handleFilterChange}
              >
                <option value="">Select</option>
                <option value="option1">Option A</option>
                <option value="option2">Option B</option>
              </select>
            </div>
          ))}
          <button className="btn generate-btn" onClick={generateReport}>
            Generate
          </button>
          <button className="btn reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>

        {/* Main Section */}
        <div className="reports-main">
          {/* Filters Summary Section */}
          <div className="filters-summary card">
            <h3>Active Filters</h3>
            <div className="filters-tags">
              {filters.timeRange && (
                <span className="filter-tag">⏳ Time Range: {filters.timeRange}</span>
              )}
              {filters.location && (
                <span className="filter-tag">📍 Location: {filters.location}</span>
              )}
              {filters.metalType && (
                <span className="filter-tag">⚙️ Metal Type: {filters.metalType}</span>
              )}
              {filters.riskCategory && (
                <span className="filter-tag">⚠️ Risk: {filters.riskCategory}</span>
              )}
              {!filters.timeRange &&
                !filters.location &&
                !filters.metalType &&
                !filters.riskCategory && (
                  <span className="no-filters">No filters applied</span>
                )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="summary-report card">
            <h2>Summary Report</h2>
            <div className="summary-charts">
              <div className="chart-card">
                <h3>Monthly Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(val) => `${val} units`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table */}
            <div className="summary-table">
              <h3>Location-wise Status</h3>
              <table>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>HMPI</th>
                    <th>Risk Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>City A</td>
                    <td>72</td>
                    <td>
                      <span className="badge high-risk">High</span>
                    </td>
                  </tr>
                  <tr>
                    <td>City B</td>
                    <td>45</td>
                    <td>
                      <span className="badge medium-risk">Medium</span>
                    </td>
                  </tr>
                  <tr>
                    <td>City C</td>
                    <td>20</td>
                    <td>
                      <span className="badge low-risk">Low</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Individual Reports */}
          <div className="individual-reports">
            <h2>Generated Reports</h2>
            <div className="report-list">
              <div className="report-item card">
                <span>Sample Report 1</span>
                <div className="report-actions">
                  <button className="btn pdf-btn">📄 PDF</button>
                  <button className="btn excel-btn">📊 Excel</button>
                </div>
              </div>
              <div className="report-item card">
                <span>Sample Report 2</span>
                <div className="report-actions">
                  <button className="btn pdf-btn">📄 PDF</button>
                  <button className="btn excel-btn">📊 Excel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
