import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Account from './pages/Account';
import Borrow from './pages/Borrow';
import Return from './pages/Return';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/create" element={<Account />} />
          <Route path="/return" element={<Return />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;