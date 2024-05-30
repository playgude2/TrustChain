import React from 'react';
import '../styles/Landing_page.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleOrgLogin = () => {
    navigate('/organisation/login');
  };

  const handleUserLogin = () => {
    navigate('/user/login');
  };

  const handleOrgRegister = () => {
    navigate('/organisation/register');
  };

  return (
    <div className="app">
      <div className="slider-container">
        <div className="slider">
          <h2>Slider Component</h2>
        </div>
      </div>
      <div className="form-container">
        <div className="login-register">
          <div className="header-text">
            <p className="welcome-text">Welcome to</p>
            <h1 className="title">TrustChain</h1>
            <p className="description">Issue and Verify Credentials with trust of Blockchain</p>
          </div>
          <div className="login-section">
            <p className="login-text">Login to your Account</p>
            <div className="login-buttons">
              <button className="login-org-button" onClick={handleOrgLogin}>Login as Organisation</button>
              <button className="login-user-button" onClick={handleUserLogin}>Login as User</button>
            </div>
          </div>
          <p className="or-text">OR</p>
          <div className="register-section">
            <p className="register-text">Do not have an Account</p>
            <div className="register-buttons">
              <button className="register-org-button" onClick={handleOrgRegister}>Register as Organisation</button>
              <button className="register-user-button">Register as User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
