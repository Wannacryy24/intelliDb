import React, { useEffect, useState } from 'react';
import './RealTimeStats.css';
import { getDashboardData } from '../../services/api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';

const RealTimeStats = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    getDashboardData()
      .then((res) => {
        setData(res.data.data.graphs);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch real-time data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="loading">Loading real-time stats...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  const { connections_timeline, query_throughput_timeline } = data;

  const connectionData = connections_timeline.timestamps.map((time, i) => ({
    time,
    total: connections_timeline.total_connections[i],
    active: connections_timeline.active_connections[i],
    idle: connections_timeline.idle_connections[i],
  }));

  const queryData = query_throughput_timeline.timestamps.map((time, i) => ({
    time,
    queries: query_throughput_timeline.queries_executed[i],
  }));

  return (
    <div className="realtime-container hide-scroll">
      <h2>⚡ Real-Time Stats</h2>

      <div className="chart-section">
        <h3>🔌 Connections Over Time</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={connectionData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorTotal)" />
              <Area type="monotone" dataKey="active" stroke="#82ca9d" fillOpacity={0.6} fill="#82ca9d" />
              <Area type="monotone" dataKey="idle" stroke="#ffc658" fillOpacity={0.6} fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h3>📈 Query Throughput</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={queryData}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="queries" stroke="#4c5fd5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStats;
