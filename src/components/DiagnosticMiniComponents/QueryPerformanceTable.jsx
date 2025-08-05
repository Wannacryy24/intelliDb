import React from 'react';
import './QueryPerformanceTable.css';

const QueryPerformanceTable = ({ query_performance }) => {
  const queryPerfTable = query_performance.queries.map((query, idx) => ({
    query: query.slice(0, 60) + '...',
    calls: query_performance.calls[idx],
    total_time: query_performance.total_time[idx].toFixed(2),
    avg_time: query_performance.avg_time[idx].toFixed(2),
    rows: query_performance.rows_affected[idx],
  }));

  return (
    <div className="query-performance-container">
      <div className="query-performance-title">Top Query Performance</div>
      <table className="query-performance-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>Calls</th>
            <th>Total Time (ms)</th>
            <th>Avg Time (ms)</th>
            <th>Rows</th>
          </tr>
        </thead>
        <tbody>
          {queryPerfTable.map((row, idx) => (
            <tr key={idx}>
              <td>{row.query}</td>
              <td>{row.calls}</td>
              <td>{row.total_time}</td>
              <td>{row.avg_time}</td>
              <td>{row.rows}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryPerformanceTable;
