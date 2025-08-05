import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expand, setExpand] = useState({
    dashboard: false,
    diagnostics: false,
    compression: false,
  });

  const toggleSection = (section) => {
    setExpand((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <div className='logo-div'><img src='https://intellidbenterprise.com/wp-content/uploads/2024/09/IntelliDB-Logo-Design-Final-Render-removebg-preview.png'></img><span>IntelliDB</span></div>}
        <button className="collapse-toggle" onClick={toggleCollapse}>
          {collapsed ? <h2>⇨</h2> : <h2>⇦</h2>}
        </button>
      </div>

      <nav>
        <ul>
          <li><NavLink to="/">{collapsed ? '🖧' : '🖧 Connect to DB'}</NavLink></li>

          <li onClick={() => toggleSection('dashboard')} className={`expandable ${expand.dashboard ? 'expanded' : ''}`}>
            <span>{collapsed ? '📊' : '📊 Dashboard'}</span>
            {!collapsed && <span className={`arrow ${expand.dashboard ? 'open' : ''}`}>▶</span>}
          </li>
          {expand.dashboard && !collapsed && (
            <div className='nav-left-inner-li'>
              <li ><NavLink to="/dashboard/overview"> Overview</NavLink></li>
              <li><NavLink to="/dashboard/real-time"> Real-time Stats</NavLink></li>
            </div>
          )}

          <li><NavLink to="/ai-assistant">{collapsed ? '🧠' : '🧠 AI Assistant'}</NavLink></li>
          <li><NavLink to="/query-console">{collapsed ? '🧾' : '🧾 Query Console'}</NavLink></li>


          <li>
            <NavLink to="/diagnostic">
              {collapsed ? '🔍' : '🔍 Diagnostics'}
            </NavLink>
          </li>



          <li><NavLink to="/tuning-tools">{collapsed ? '🎛️' : '🎛️ Tuning Tools'}</NavLink></li>

          <li onClick={() => toggleSection('compression')} className="expandable">
            {collapsed ? '📦' : '📦 Compression'}
          </li>
          {expand.compression && !collapsed && (
            <div className='nav-left-inner-li'>
              <li><NavLink to="/compression/stats">Stats</NavLink></li>
              <li><NavLink to="/compression/analyze">Analyze</NavLink></li>
              <li><NavLink to="/compression/history">History</NavLink></li>
              <li><NavLink to="/compression/compress-now">Compress Now</NavLink></li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
