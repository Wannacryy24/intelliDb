// src/pages/Overview.jsx
import React, { useEffect, useState } from 'react';
import './Overview.css';
import { getDashboardData } from '../../services/api';

import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer,
} from 'recharts';

import MemoryIcon from '@mui/icons-material/Memory';
import TableChartIcon from '@mui/icons-material/TableChart';
import SpeedIcon from '@mui/icons-material/Speed';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardData()
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('❌ Failed to fetch dashboard data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">🔄 Loading dashboard...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  const { metrics, graphs, last_updated } = data;

  const connectionPie = [
    { name: 'Active', value: graphs.connections_timeline.active_connections[0] },
    { name: 'Idle', value: graphs.connections_timeline.idle_connections[0] },
    { name: 'Waiting', value: graphs.connections_timeline.waiting_connections[0] },
  ];

  const queryBarData = graphs.query_performance.queries.map((q, i) => ({
    name: `Q${i + 1}`,
    calls: graphs.query_performance.calls[i],
  }));

  const throughputLineData = graphs.query_throughput_timeline.timestamps.map((t, i) => ({
    time: t,
    queries: graphs.query_throughput_timeline.queries_executed[i],
  }));

  return (
    <div className="overview-container">
      <h2 className="dashboard-title">📊 Dashboard Overview</h2>

      <div className="overview-cards">
        <div className="card">
          <MemoryIcon className="card-icon" />
          <h4>Database Size</h4>
          <p>{metrics.db_size}</p>
        </div>
        <div className="card">
          <TableChartIcon className="card-icon" />
          <h4>Total Tables</h4>
          <p>{metrics.tables_count}</p>
        </div>
        <div className="card">
          <SpeedIcon className="card-icon" />
          <h4>Txn Rate</h4>
          <p>{metrics.transaction_rate}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h3>🔁 Connection Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={connectionPie} dataKey="value" nameKey="name" outerRadius={80}>
                {connectionPie.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>📈 Query Calls</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={queryBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calls" fill="#4c5fd5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box full-width">
          <h3>⏱️ Throughput Timeline</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={throughputLineData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="queries" stroke="#00C49F" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="last-updated">📅 Last Updated: {last_updated}</p>
    </div>
  );
};

export default Overview;
