import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup/Signup';
import CustomerSignup from './Signup/CustomerSignup';
import BusinessSignup from './Signup/BusinessSignup';
import Login from './Login';
import DisputeResolution from './DisputeResoultion';
import OTPVerification from './Signup/OPTVerification';

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
          <Route path='/optverification' element={ <OTPVerification /> } />

          <Route path='/dispute-resolution' element={<DisputeResolution />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
