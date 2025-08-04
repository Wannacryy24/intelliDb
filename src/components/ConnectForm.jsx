import React, { useState } from 'react';
import { connectToDb } from '../services/api';

const ConnectForm = () => {
  const [status, setStatus] = useState('');

  const handleConnect = async () => {
    try {
      const res = await connectToDb({
        host: '127.0.0.1',
        port: '5555',
        user: 'intellidb',
        password: 'IDBE@2025',
        database: 'intellidb'
      });
      setStatus('Connected!');
    } catch (err) {
      setStatus('Failed to connect');
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect to DB</button>
      <p>{status}</p>
    </div>
  );
};

export default ConnectForm;
