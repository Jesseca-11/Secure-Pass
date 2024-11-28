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
import CreatePassword from './Signup/PasswordCreation';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoutes';
import DisputeSuccess from './DisputeSuccess';

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
          {/* <Route path='/resendotp' element={  } /> */}
          <Route path='/create-password' element={ <CreatePassword /> } />
          <Route path='/dispute-success' element={ <DisputeSuccess /> } />

          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />

          <Route path='/dispute-resolution' element={ <ProtectedRoute> <DisputeResolution /> </ProtectedRoute>} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
