import React, { useState } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Signin from './/pages/Signin.js';
import Signup from './pages/Signup.js';
import Home from './/pages/Home.js';
import RefreshHandler from './RefreshHandler.js';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element}) =>{
    return isAuthenticated ? element : <Navigate to="/signin" />; 
  };
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
     <Routes>
      <Route path="/" element={<Navigate to="/signup"/>} />
      <Route path="/home" element={<PrivateRoute element={<Home />}/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />


     </Routes>
    </div>
  );
}

export default App;
