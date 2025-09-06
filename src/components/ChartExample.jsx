import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "./ChartExample.css";

const data = [
  { metal: "Lead", hei: 5, cd: 2 },
  { metal: "Cadmium", hei: 7, cd: 3 },
  { metal: "Arsenic", hei: 12, cd: 6 },
];

function ChartExample({ data }) {
  if (!data || !data.length) return <p className="no-data-text">No chart data yet.</p>;
  return (
    <div className="chart-container">
      <h2 className="chart-title">Heavy Metal Pollution Indices</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="metal" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hei" name="HEI" />
          <Line type="monotone" dataKey="cd" name="Cd" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartExample;

