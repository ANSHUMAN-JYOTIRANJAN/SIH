import React from "react";

/**
 * Expects `data` to be an array of objects with numeric fields:
 * { Sample, Pb, Cd, As, Hg, Lat, Lng } (or similar).
 */
export default function SummaryCards({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="summary-row">
        <div className="summary-card placeholder">Upload a dataset to see summary cards.</div>
      </div>
    );
  }

  const totalSamples = data.length;

  // Safe parse helper
  const n = (v) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : 0;
  };

  // Aggregate per metal and totals
  let sumPb = 0, sumCd = 0, sumAs = 0, sumHg = 0, sumTotal = 0;
  data.forEach((r) => {
    const pb = n(r.Pb ?? r.Pb_m ?? r.Pb_ppm ?? r["Pb"]);
    const cd = n(r.Cd ?? r.Cd_m ?? r.Cd_ppm ?? r["Cd"]);
    const as_ = n(r.As ?? r.As_m ?? r.As_ppm ?? r["As"]);
    const hg = n(r.Hg ?? r.Hg_m ?? r.Hg_ppm ?? r["Hg"]);
    sumPb += pb;
    sumCd += cd;
    sumAs += as_;
    sumHg += hg;
    sumTotal += pb + cd + as_ + hg;
  });

  const avgPb = (sumPb / totalSamples).toFixed(2);
  const avgCd = (sumCd / totalSamples).toFixed(2);
  const avgAs = (sumAs / totalSamples).toFixed(2);
  const avgHg = (sumHg / totalSamples).toFixed(2);
  const avgTotal = (sumTotal / totalSamples).toFixed(2);

  // Count very-high samples (thresholds; change if you want)
  const veryHigh = data.filter(r => {
    const total = n(r.Pb) + n(r.Cd) + n(r.As) + n(r.Hg);
    return total > 90;
  }).length;

  return (
    <div className="summary-row">
      <div className="summary-card gradient-blue">
        <div className="card-icon">📁</div>
        <div className="card-title">Total Samples</div>
        <div className="card-value">{totalSamples}</div>
        <div className="card-sub">Datasets / rows processed</div>
      </div>

      <div className="summary-card gradient-indigo">
        <div className="card-icon">⚠️</div>
        <div className="card-title">Very High Risk</div>
        <div className="card-value">{veryHigh}</div>
        <div className="card-sub">Samples over threshold</div>
      </div>

      <div className="summary-card gradient-teal">
        <div className="card-icon">📊</div>
        <div className="card-title">Avg Pollution (total)</div>
        <div className="card-value">{avgTotal} ppm</div>
        <div className="card-sub">Average sum of metals</div>
      </div>

      <div className="summary-card gradient-sky">
        <div className="card-icon">🔬</div>
        <div className="card-title">Avg Pb / Cd / As / Hg</div>
        <div className="card-value">{avgPb} / {avgCd} / {avgAs} / {avgHg}</div>
        <div className="card-sub">ppm (per metal)</div>
      </div>
    </div>
  );
}
