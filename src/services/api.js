  import axios from 'axios';

  // const BASE_URL = 'http://44.202.108.149:8000'; 
  // const BASE_URL = '/api';
  // const BASE_URL = import.meta.env.VITE_BASE_URL; 

  const isLocal = import.meta.env.DEV;
  const BASE_URL = isLocal
    ? import.meta.env.VITE_BASE_URL // e.g. http://localhost:8000 or real IP
    : ''; // Netlify handles proxy


  // Connection
  export const connectToDb = (credentials) =>
    axios.post(`${BASE_URL}/api/connect`, credentials);
  // axios.post(`${BASE_URL}/connect`, credentials); 

  export const disconnectDb = () =>

    axios.post(`${BASE_URL}/api/v3/compression/disconnect`);

  // Dashboard
  export const getDashboardData = () =>
    axios.get(`${BASE_URL}/monitor/dashboard`);

  // Query Console
  export const executeQuery = (data) =>
    axios.post(`${BASE_URL}/api/execute-query`, data);

  // AI Assistant
  export const askAiAssistant = (data) =>
    axios.post(`${BASE_URL}/api/ask`, data);  
  //
  export const askAI = (question, connectionId) =>
    axios.post(`${BASE_URL}/api/ask`, {
      question,
      connection_id: connectionId,
    });

  // Compression
  export const getCompressionStats = () =>
    axios.get(`${BASE_URL}/api/v3/compression/stats`);

  export const getCompressionHistory = () =>
    axios.get(`${BASE_URL}/api/v3/compression/history`);

  export const analyzeCompression = () =>
    axios.get(`${BASE_URL}/api/v3/compression/analyze`);

  export const runCompressionNow = () =>
    axios.post(`${BASE_URL}/api/v3/compression/run`);

  // Diagnostics
  export const Tools = () =>
    axios.get(`${BASE_URL}/api/diagnostics/tools`); 
  //
  export const getDiagnosticTools = () =>
    axios.get(`${BASE_URL}/diagnostics/tool-list`);


  export const runDiagnosticTool = (data) =>
    axios.post(`${BASE_URL}/api/diagnostics/run`, data);

  // Tuning Tools
  export const getTuningSuggestions = () =>
    axios.get(`${BASE_URL}/api/tuning/suggestions`);

  // 6. Get available tuning tools
  export const getTuningTools = () =>
    axios.get(`${BASE_URL}/monitor/tuning-tools`);

  // 7. Run selected tuning tool
  export const runTuningTool = (toolId) =>
    axios.post(`${BASE_URL}/monitor/tuning`, {
      tool_id: toolId,});
