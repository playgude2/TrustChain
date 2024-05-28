import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './Components/Landing_page';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
