import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardData().then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard; 
