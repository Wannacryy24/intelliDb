import React from 'react';
import './IndexUsageBarChart.css';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const IndexUsageBarChart = ({ index_usage }) => {
  const indexBarData = index_usage.index_names.map((name, idx) => ({
    name,
    Scans: index_usage.scans[idx],
    'Tuples Read': index_usage.tuples_read[idx],
    'Tuples Fetched': index_usage.tuples_fetched[idx],
  }));

  return (
    <div className="index-usage-wrapper">
      <div className="index-usage-container">
        <div className="index-usage-title">Index Usage</div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={indexBarData}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Scans" fill="#8884d8" />
            <Bar dataKey="Tuples Read" fill="#82ca9d" />
            <Bar dataKey="Tuples Fetched" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IndexUsageBarChart;
