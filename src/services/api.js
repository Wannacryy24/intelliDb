import axios from 'axios';

const BASE_URL = 'http://44.202.108.149:8000';

export const connectToDb = (credentials) =>
  axios.post(`${BASE_URL}/api/connect`, credentials);

export const getDashboardData = () =>
  axios.get(`${BASE_URL}/monitor/dashboard`);

export const executeQuery = (data) =>
  axios.post(`${BASE_URL}/api/execute-query`, data);

export const disconnectDb = () =>
  axios.post(`${BASE_URL}/api/v3/compression/disconnect`);
