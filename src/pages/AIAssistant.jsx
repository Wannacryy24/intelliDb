// src/screens/AIAssistant.jsx
import React, { useState } from 'react';
import './AIAssistant.css';
import { askAI } from '../services/api';

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    const conId = localStorage.getItem('connection_id');
    console.log('🧠 Using connection_id:', conId);

    try {
      const res = await askAI(prompt, conId);
      console.log('✅ AI Response:', res.data.response);
      setResponse(res.data.response);
    } catch (err) {
      console.error('❌ AI request failed:', err);
      setError('Failed to fetch AI response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <div className="ai-output">
        {error && <p className="error-msg">{error}</p>}
        {response && (
          <div className="ai-response">
            <h4>📝 Response</h4>
            <pre>{response}</pre>
          </div>
        )}
      </div>

      <form className="ai-form" onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything related to your database or query..."
        />
        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
