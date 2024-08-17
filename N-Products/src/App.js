import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar'; 
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" exact element={HomePage} />
          <Route path="/product/:id" element={ProductPage} />
        </Routes>

    </Router>
  );
};

export default App;
