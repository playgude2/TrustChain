import React, { useState } from 'react';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase()}`);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-center">
          <div className={`nav-tab ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => handleTabClick('Dashboard')}>Dashboard</div>
          <div className={`nav-tab ${activeTab === 'Credentials' ? 'active' : ''}`} onClick={() => handleTabClick('Credentials')}>Credentials</div>
          <div className={`nav-tab ${activeTab === 'Organisations' ? 'active' : ''}`} onClick={() => handleTabClick('Organisations')}>Organisations</div>
          <div className={`nav-tab ${activeTab === 'Wallet' ? 'active' : ''}`} onClick={() => handleTabClick('Wallet')}>Wallet</div>
        </div>
        <div className="navbar-right">
          <button className="nav-button green" onClick={() => navigate('/organisation/login')}>Login as Organisation</button>
          <div className="profile-button">U</div>
        </div>
      </nav>
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-boxes">
          <div className="box">Credentials Issued</div>
          <div className="box">Credentials Verified</div>
          <div className="box">Organisations Connected</div>
          <div className="vertical-box">Wallet</div>
        </div>
        <div className="log-box">Previous Transcript</div>
      </div>
    </div>
  );
};

export default DashboardPage;
