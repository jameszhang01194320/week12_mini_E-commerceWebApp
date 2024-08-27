import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Register from './components/Register';
import CustomerList from './components/CustomerList';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Login from './components/Login'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
