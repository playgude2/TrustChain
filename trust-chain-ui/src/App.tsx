import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './Components/Landing_page';
import Organisation_register from './Components/Organisation_register';
import Organisation_login from './Components/Organisation_login';
import LoginPage from './Components/Login_user';
import DashboardPage from './Components/Dasboard';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/organisation/register" element={<Organisation_register/>} />
        <Route path="/organisation/login" element={<Organisation_login/>} />
        <Route path="/user/login" element={<LoginPage/>} />
        <Route path="/user/dashboard" element={<DashboardPage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
