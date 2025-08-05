import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Box, CircularProgress, Button, Card, CardContent } from '@mui/material';
import { getDashboardData, executeQuery } from '../../services/api';
import DbActivityBarChart from '../../components/DiagnosticMiniComponents/DbActivityBarChart';
import WaitEventsPieChart from '../../components/DiagnosticMiniComponents/WaitEventsPieChart';
import IndexUsageBarChart from '../../components/DiagnosticMiniComponents/IndexUsageBarChart';
import QueryPerformanceTable from '../../components/DiagnosticMiniComponents/QueryPerformanceTable';

const DiagnosticPage = () => {
  const [loading, setLoading] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getDashboardData();
      setDiagnosticData(res.data?.data?.graphs);
      setLoading(false);
    } catch (err) {
      setError('Failed to load diagnostics');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runDiagnosticQuery = async () => {
    try {
      await executeQuery({ query: 'SELECT * FROM users;' });
      fetchData();
    } catch (err) {
      setError('Query execution failed');
    }
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!diagnosticData) return null;

  const { db_activity, wait_events, index_usage, query_performance } = diagnosticData;

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Diagnostics</Typography>
        <Button variant="contained" onClick={runDiagnosticQuery}>Run Diagnostic Query</Button>
      </Box>


      <Typography variant="h6" gutterBottom>Database Activity</Typography>
      <DbActivityBarChart db_activity={db_activity} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          gap: '20px',
          height: '40vh',
        }}
      >
        <WaitEventsPieChart wait_events={wait_events} />
        <IndexUsageBarChart index_usage={index_usage} />
      </div>

      <Grid item xs={12}>
        <QueryPerformanceTable query_performance={query_performance} />
      </Grid>
    </Box>
  );
};

export default DiagnosticPage;