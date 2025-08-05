import React, { useEffect, useState } from 'react';
import '../pages/TuningTools.css';
import { getTuningTools, runTuningTool } from '../services/api';

const TuningTool = () => {
  const [tools, setTools] = useState([]);
  const [loadingTools, setLoadingTools] = useState(true);
  const [executingToolId, setExecutingToolId] = useState(null);
  const [toolResult, setToolResult] = useState(null);
  const [activeToolName, setActiveToolName] = useState('');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await getTuningTools();
        setTools(res.data.tools);
      } catch (err) {
        console.error('Error fetching tools:', err);
      } finally {
        setLoadingTools(false);
      }
    };

    fetchTools();
  }, []);

  const handleExecute = async (toolId, toolName) => {
    try {
      setExecutingToolId(toolId);
      setActiveToolName(toolName);
      const res = await runTuningTool(toolId);
      setToolResult(res.data.results[0]);
    } catch (error) {
      console.error('Execution failed:', error);
      alert(`Failed to execute tool "${toolId}"`);
    } finally {
      setExecutingToolId(null);
    }
  };

  const handleBack = () => {
    setToolResult(null);
    setActiveToolName('');
  };

  return (
    <div className="tool-container">
      <h2 className="tool-heading">Tuning Tools</h2>

      {toolResult ? (
        <div>
          <h3>Result for: {activeToolName}</h3>
          <button onClick={handleBack} className="back-btn">
            ⬅ Back to Tools
          </button>
          <div className="table-wrapper">
            <table className="tool-table">
              <thead>
                <tr>
                  {toolResult.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {toolResult.data.map((row, idx) => (
                  <tr key={idx}>
                    {toolResult.columns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : loadingTools ? (
        <p>Loading tools...</p>
      ) : (
        <ul className="tool-list">
          {tools.map((tool) => (
            <li key={tool.id} className="tool-item">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <button
                className="run-btn"
                onClick={() => handleExecute(tool.id, tool.name)}
                disabled={executingToolId === tool.id}
              >
                {executingToolId === tool.id ? 'Running...' : 'Run Tool'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TuningTool;
