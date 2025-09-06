import React from "react";

/**
 * Shows counts per risk category and a horizontal visual bar.
 * Uses thresholds:
 *   Very High: total > 90
 *   High: 70 < total <= 90
 *   Medium: 50 < total <= 70
 *   Low: total <= 50
 */
export default function RiskPanel({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="risk-panel">
        <h4>Risk Categories</h4>
        <p className="muted">Upload dataset to see risk distribution</p>
      </div>
    );
  }

  const n = (v) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : 0;
  };

  let counts = { "Very High": 0, "High": 0, "Medium": 0, "Low": 0 };
  data.forEach(r => {
    const total = n(r.Pb) + n(r.Cd) + n(r.As) + n(r.Hg);
    if (total > 90) counts["Very High"]++;
    else if (total > 70) counts["High"]++;
    else if (total > 50) counts["Medium"]++;
    else counts["Low"]++;
  });

  const total = data.length;
  const pct = (c) => ((c / Math.max(1, total)) * 100).toFixed(0);

  return (
    <div className="risk-panel">
      <h4>Risk Categories</h4>

      <div className="risk-bar">
        <div className="risk-segment very-high" style={{ width: `${pct(counts["Very High"])}%` }}>
          {counts["Very High"] > 0 && <span className="risk-label">🔴 {counts["Very High"]}</span>}
        </div>
        <div className="risk-segment high" style={{ width: `${pct(counts["High"])}%` }}>
          {counts["High"] > 0 && <span className="risk-label">⚠️ {counts["High"]}</span>}
        </div>
        <div className="risk-segment medium" style={{ width: `${pct(counts["Medium"])}%` }}>
          {counts["Medium"] > 0 && <span className="risk-label">🟡 {counts["Medium"]}</span>}
        </div>
        <div className="risk-segment low" style={{ width: `${pct(counts["Low"])}%` }}>
          {counts["Low"] > 0 && <span className="risk-label">🟢 {counts["Low"]}</span>}
        </div>
      </div>

      <div className="risk-legend">
        <div><span className="legend-dot very-high" /> Very High: {counts["Very High"]}</div>
        <div><span className="legend-dot high" /> High: {counts["High"]}</div>
        <div><span className="legend-dot medium" /> Medium: {counts["Medium"]}</div>
        <div><span className="legend-dot low" /> Low: {counts["Low"]}</div>
      </div>
    </div>
  );
}
