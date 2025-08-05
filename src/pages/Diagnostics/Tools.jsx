import React, { useEffect, useState } from 'react';
import './Tools.css';
import { getDiagnosticTools } from '../../services/api';

const Tools = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTools = async () => {
            setLoading(true);
            try {
                const res = await getDiagnosticTools();
                setTools(res.data?.tools || []);
            } catch (err) {
                setError('Failed to fetch tools.');
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, []);

    return (
        <div className="tools-container">
            <h2>🧰 Diagnostics Tools</h2>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="tools-list">
                {tools.map((tool, idx) => (
                    <div className="tool-card" key={idx}>
                        <h3>{tool.name}</h3>
                        <p>{tool.description}</p>
                        <button className="run-button">Run Tool</button>
                    </div>
                ))}
                {!loading && tools.length === 0 && <p>No tools found.</p>}
            </div>
        </div>
    );
};

export default Tools;
