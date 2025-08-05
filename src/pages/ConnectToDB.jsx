import React, { useState } from 'react';
import './ConnectToDB.css';
import { connectToDb } from '../services/api';

const ConnectToDB = () => {
  const [formData, setFormData] = useState({
    host: '127.0.0.1',
    port: '5555',
    database: 'intellidb',
    user: 'intellidb',
    password: 'IDBE@2025',
  });

  const [connectionId, setConnectionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 

  const handleConnect = async () => {
    setLoading(true);
    setStatus('');
    console.log("click")
    try {
      const res = await connectToDb({
        host: '127.0.0.1',
        port: '5555',
        user: 'intellidb',
        password: 'IDBE@2025',
        database: 'intellidb'
      });
      console.log("running")
      console.log(res.data)
      const id = res.data.connection_id;
      localStorage.setItem('connection_id', id);
      setConnectionId(id);
      setStatus(res.data.status);
    } catch (err) {
      console.log(err)
      setStatus('❌ Connection failed.');
    }
  }

  return (
    <div className="connect-container">
      <h2>🖧 Connect to Database</h2>
      <div className="connect-form"> 
        <label>Host</label>
        <input type="text" name="host" value={formData.host} onChange={handleChange} required />

        <label>Port</label>
        <input type="text" name="port" value={formData.port} onChange={handleChange} required />

        <label>Database</label>
        <input type="text" name="database" value={formData.database} onChange={handleChange} required />

        <label>User</label>
        <input type="text" name="user" value={formData.user} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" onClick={ handleConnect}>
          {status === 'connecting' ? 'Connecting...' : 'Connect'} 
        </button>

        {status === 'success' && <p className="success-msg">✅ Connected Successfully</p>} 
        {status === 'error' && <p className="error-msg">❌ Connection Failed</p>}
      </div>
    </div>
  );
};

export default ConnectToDB;



// import React, { useState } from 'react';

// const ConnectToDB = () => {
//   const [formData, setFormData] = useState({
//     host: '127.0.0.1',
//     port: '5555',
//     database: 'intellidb',
//     user: 'intellidb',
//     password: 'IDBE@2025',
//   });

//   const [status, setStatus] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Connecting to DB with:', formData);
//     // Dummy connect logic
//     setStatus('connecting');
//     setTimeout(() => {
//       setStatus('success'); // or 'error'
//     }, 1500);
//   };

//   return (
//     <div>
//       <h2>🖧 Connect to Database</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Host</label>
//         <input type="text" name="host" value={formData.host} onChange={handleChange} required />

//         <label>Port</label>
//         <input type="text" name="port" value={formData.port} onChange={handleChange} required />

//         <label>Database</label>
//         <input type="text" name="database" value={formData.database} onChange={handleChange} required />

//         <label>User</label>
//         <input type="text" name="user" value={formData.user} onChange={handleChange} required />

//         <label>Password</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />

//         <button type="submit">
//           {status === 'connecting' ? 'Connecting...' : 'Connect'}
//         </button>

//         {status === 'success' && <p style={{ color: 'green' }}>✅ Connected Successfully</p>}
//         {status === 'error' && <p style={{ color: 'red' }}>❌ Connection Failed</p>}
//       </form>
//     </div>
//   );
// };

// export default ConnectToDB;
