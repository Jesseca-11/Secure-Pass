import React from 'react';
import './App.css';
import { Routes, Route, Navigate, Outlet, BrowserRouter } from "react-router-dom";
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
import { useAuth } from './context/AuthContex';

function App() {
  const { token } = useAuth();
  console.log(token);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route
            element={!token? <Outlet /> : <Navigate to={`/dashboard`} />}
            path=""
          >
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/Customer-Signup' element={<CustomerSignup />} />
            <Route path='/Business-Signup' element={<BusinessSignup />} />
            <Route path='/optverification' element={ <OTPVerification /> } />
            {/* <Route path='/resendotp' element={  } /> */}
            <Route path='/create-password' element={ <CreatePassword /> } />
          </Route>

          <Route path='/dispute-success' element={ <DisputeSuccess /> } />

          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
          <Route path="/profile" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
          <Route path="/profile" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />

          <Route path='/dispute-resolution' element={ <ProtectedRoute> <DisputeResolution /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
