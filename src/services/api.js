import axios from 'axios';

const isLocal = import.meta.env.DEV;
const BASE_URL = isLocal
  ? import.meta.env.VITE_BASE_URL // e.g. http://localhost:8000
  : '/api'; // Netlify proxy

// Connection
export const connectToDb = (credentials) =>
  axios.post(`${BASE_URL}/api/connect`, credentials);

export const disconnectDb = () =>
  axios.post(`${BASE_URL}/v3/compression/disconnect`);

// Dashboard
export const getDashboardData = () =>
  axios.get(`${BASE_URL}/monitor/dashboard`);

// Query Console
export const executeQuery = (data) =>
  axios.post(`${BASE_URL}/api/execute-query`, data);

// AI Assistant
export const askAiAssistant = (data) =>
  axios.post(`${BASE_URL}/ask`, data);

export const askAI = (question, connectionId) =>
  axios.post(`${BASE_URL}/api/ask`, {
    question,
    connection_id: connectionId,
  });

// Compression
export const getCompressionStats = () =>
  axios.get(`${BASE_URL}/v3/compression/stats`);

export const getCompressionHistory = () =>
  axios.get(`${BASE_URL}/v3/compression/history`);

export const analyzeCompression = () =>
  axios.get(`${BASE_URL}/v3/compression/analyze`);

export const runCompressionNow = () =>
  axios.post(`${BASE_URL}/v3/compression/run`);

// Diagnostics
export const Tools = () =>
  axios.get(`${BASE_URL}/diagnostics/tools`);

export const getDiagnosticTools = () =>
  axios.get(`${BASE_URL}/diagnostics/tool-list`);

export const runDiagnosticTool = (data) =>
  axios.post(`${BASE_URL}/diagnostics/run`, data);

// Tuning Tools
export const getTuningSuggestions = () =>
  axios.get(`${BASE_URL}/tuning/suggestions`);

export const getTuningTools = () =>
  axios.get(`${BASE_URL}/monitor/tuning-tools`);

export const runTuningTool = (toolId) =>
  axios.post(`${BASE_URL}/monitor/tuning`, {
    tool_id: toolId,
  });
