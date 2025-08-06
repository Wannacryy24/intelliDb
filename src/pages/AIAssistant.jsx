import React, { useState } from 'react';
import './AIAssistant.css';
import { askAI } from '../services/api';

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    const conId = localStorage.getItem('connection_id');
    console.log('🧠 Using connection_id:', conId);

    try {
      const res = await askAI(prompt, conId);
      const newEntry = {
        question: prompt,
        answer: res.data.response,
      };

      setResponses((prev) => [...prev, newEntry]);
      setPrompt('');
    } catch (err) {
      console.error('❌ AI request failed:', err);
      setError('Failed to fetch AI response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <h2 className="ai-heading">🧠 AI Assistant</h2>

      <div className="ai-output">
        {error && <p className="error-msg">{error}</p>}

        {responses.map((entry, index) => (
          <div key={index} className="ai-response">
            <h4>❓ You:</h4>
            <pre>{entry.question}</pre>
            <h4>🧠 AI:</h4>
            <pre>{entry.answer}</pre>
          </div>
        ))}
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
