import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';



function App() {
  return (
    <>
      <Header isLogedin={false} user={{image:"", name: "João Artur"}}/>
      

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>Sobre</div>} />
          <Route path="/contact" element={<div>Contato</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Registrar</div>} />
          <Route path="/profile" element={<div>Meu Perfil</div>} />
          <Route path="/my-products" element={<div>Meus Produtos</div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </> 
  );
}

export default App;