import React from 'react';
import './MainLayout.css';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className='app-container-inner-div'>
        {children}
      </div>
    </div>
  );
};

export default MainLayout; 
