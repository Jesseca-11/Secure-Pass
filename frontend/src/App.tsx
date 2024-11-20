import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup/Signup';
import CustomerSignup from './Signup/CustomerSignup';
import BusinessSignup from './Signup/BusinessSignup';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={  <Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Customer-Signup' element={<CustomerSignup />} />
          <Route path='/Business-Signup' element={<BusinessSignup />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
