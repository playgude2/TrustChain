import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Component for Organisation login.
function Organisation_login() {
    // setting form data and use states for future use. 
    const [formData, setFormData] = useState({
        email:"",
        password: ""
  });

   // To be called when there is change to a data.
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Called when form is submitted.  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "email":formData.email,
      "password":formData.password
    };
    try {
        axios.post('http://localhost:3000/organizations/login', data);
        alert('Organisation Logged in');
        // Optionally, fetch and update the displayed data
      } catch (error) {
        console.error('Error creating data:', error);
      }
  };

  // Returning the body of the page.  
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
        </div>
        <div><br></br>
        <div className='form-org'>
        <form onSubmit={handleSubmit}>              
                <label>Email ID<br></br>
                <input type="email" 
                id="emailID" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                />
                </label><br></br>

                <label>Password<br></br>
                <input type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                />
                </label><br></br>
                <button type="submit" className="login-org-button">Login as Organisation</button>
                
        </form>
        </div>
        <button className="login-user-button">Already have an account? Login Here</button>
                <button className="login-org-button"><Link to="/organisation/register" className="btn btn-primary">Don't have an account yet? Register Here</Link></button>
        
        </div>
      </div>
    </div>
  )
}

export default Organisation_login