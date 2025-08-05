import React from 'react';
import './WaitEventsPieChart.css'; // ✅ Import CSS
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const WaitEventsPieChart = ({ wait_events }) => {
  const waitPieData = wait_events.event_types.map((type, idx) => ({
    name: type,
    value: wait_events.counts[idx],
  }));

  return (
    <div className="wait-events-container">
      <div className="wait-events-card">
        <div className="wait-events-title">Wait Events</div>
        <ResponsiveContainer height={250}>
          <PieChart>
            <Pie
              data={waitPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {waitPieData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaitEventsPieChart;
