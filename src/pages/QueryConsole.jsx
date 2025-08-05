import React, { useState } from 'react';
import './QueryConsole.css';
import { executeQuery } from '../services/api';

const QueryConsole = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const connectionId = localStorage.getItem('connection_id');
            const res = await executeQuery({
                query,
                connection_id: connectionId,
                is_write: false // Always false for SELECT queries
            });


            setResult(res.data);
            console.log(res.data.data[0].user)
        } catch (err) {
            setError('Failed to execute query.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="query-console-container">
            <h2>🧾 Query Console</h2>
            <form className="query-form" onSubmit={handleSubmit}>
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Write your SQL query here..."
                    className="query-textarea"
                ></textarea>
                <button
                    type="submit"
                    className="execute-button"
                    disabled={!query.trim() || loading}
                >
                    {loading ? 'Running...' : 'Execute'}
                </button>
            </form>

            {error && <p className="error-msg">{error}</p>}
            {result?.data && <h1>{result.data.status}</h1>}
            {result && <h3>{result.data[0].user}</h3>}
            {result ? (
                result.data?.data?.length > 0 ? (
                    <div className="result-table-container">
                        <table className="result-table">
                            <thead>
                                <tr>
                                    {result.data.columns.map((col, index) => (
                                        <th key={index}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {result.data.data.map((row, idx) => (
                                    <tr key={idx}>
                                        {result.data.columns.map((col, i) => (
                                            <td key={i}>{row[col]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No results returned.</p>
                )
            ) : null}
        </div>
    );
};

export default QueryConsole;
