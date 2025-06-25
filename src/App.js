import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyProducts from './pages/MyProducts';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import { Authentication } from './service/Authentication';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';



function App() {
  return (
    <>
      <Header isLogedin={Authentication.isAuthenticated()} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </> 
  );
}

export default App;