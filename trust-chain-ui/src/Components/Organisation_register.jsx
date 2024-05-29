import React, { useState } from 'react';
import '../styles/Landing_page.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Organisation_register = () => {
    const [formData, setFormData] = useState({
            name: "",
            password: "",
            email: "",
            sector: "",
            contact: "",
            country: "",
            confirmPassword:"",
            walletPrivateKey: "private-key-string",
            walletPublicKey: "public-key-string"
      });
    
      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
          
          "name": formData.name,
          "password": formData.password,
          "email": formData.email,
          "sector": formData.sector,
          "contact": formData.contact,
          "country": formData.country,
          "walletPrivateKey": "private-key-string",
          "walletPublicKey": "public-key-string"
        };
        if (formData.password !== formData.confirmPassword){
          alert("Password doesn't match");
        }
        else {
          try {
            axios.post('http://localhost:3000/organizations', data);
            alert('Data created successfully!');
            // Optionally, fetch and update the displayed data
          } catch (error) {
            console.error('Error creating data:', error);
          }
        }
        
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
          <div className='form-org'>
            <form onSubmit={handleSubmit}>              
                <label>Company Name<br></br>
                <input type="text" 
                id="companyName" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                />
                </label><br></br>
                <label>Company Sector<br></br>
                <input type="text" 
                id="companySector" 
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                />
                </label><br></br>
                <label>Country<br></br>
                <input 
                type="text"
                id="country" 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                />
                </label><br></br>
                <label>Email ID<br></br>
                <input 
                type="email"
                id="emailID" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                />
                </label><br></br>
                <label>Contact<br></br>
                <input 
                type="text"
                id="contact" 
                name="contact" 
                value={formData.contact}
                onChange={handleInputChange}
                />
                </label><br></br>
                <label>Password<br></br>
                <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                />
                </label><br></br>
                <label>Confirm Password<br></br>
                <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                /></label><br></br>
                
                <button type="submit" className="login-org-button">Register as Organisation</button>
                
            </form>
                <button className="login-user-button"><Link to="/organisation/login" className="btn btn-primary">Already have an account? Login Here</Link></button>
                <button className="login-org-button">Register as User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organisation_register;
