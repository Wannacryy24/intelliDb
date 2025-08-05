import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Page imports
import ConnectToDB from './pages/ConnectToDB';
import Overview from './pages/Dashboard/Overview';
import RealTimeStats from './pages/Dashboard/RealTimeStats';
import AIAssistant from './pages/AIAssistant';
import QueryConsole from './pages/QueryConsole';
import Tools from './pages/Diagnostics/Tools';
import RunTool from './pages/Diagnostics/RunTool';
import TuningTools from './pages/TuningTools';
import Stats from './pages/Compression/Stats';
import Analyze from './pages/Compression/Analyze';
import History from './pages/Compression/History';
import CompressNow from './pages/Compression/CompressNow';
import DiagnosticPage from './pages/Diagnostics/DiagnosticPage';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ConnectToDB />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/real-time" element={<RealTimeStats />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/query-console" element={<QueryConsole />} />
          <Route path="/diagnostics/tools" element={<Tools />} />
          <Route path="/diagnostics/run-tool" element={<RunTool />} />
          <Route path="/tuning-tools" element={<TuningTools />} />
          <Route path="/compression/stats" element={<Stats />} />
          <Route path="/compression/analyze" element={<Analyze />} />
          <Route path="/compression/history" element={<History />} />
          <Route path="/compression/compress-now" element={<CompressNow />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} /> 

        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
