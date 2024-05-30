import React from 'react';
import '../styles/Login_page.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleUserRegistration = () => {
        navigate('/user/register');
    };

  return (
    <div className="app">
      <div className="slider-container">
        <div className="slider">
          <h2>Slider Component</h2>
        </div>
      </div>
      <div className="form-container">
        <div className="login-form">
          <div className="login-header-text">
            <p className="login-welcome-text">Welcome to</p>
            <h1 className="login-title">TrustChain</h1>
            <p className="login-description">Issue and Verify Credentials with trust of Blockchain</p>
          </div>
          <div className="login-form-section">
            <label className="login-form-label" htmlFor="email">Email ID</label>
            <input type="email" id="email" placeholder="Enter Your Email ID" className="login-form-input" />
            <label className="login-form-label" htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password" className="login-form-input" />
            <div className="login-form-options">
              <div className="login-remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <Link to="/forgot-password" className="login-forgot-password">Forgot Password?</Link>
            </div>
            <div className="login-login-buttons">
              <button className="login-login-user-button">Login as User</button>
              <button className="login-login-org-button">Login as Organisation</button>
            </div>
            <div className="login-register-section">
              <button className="login-register-button" onClick={handleUserRegistration}>
                 Don't have an account? Register here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
