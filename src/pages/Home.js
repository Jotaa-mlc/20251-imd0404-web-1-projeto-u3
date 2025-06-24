import "./../css/home.css";
import Product from "../model/Product";
import ProductCard from "../components/ProductCard";
import ProductService from "../service/ProductService";
import { renderToStaticMarkup } from "react-dom/server"
import React, { useRef, useEffect, useState } from 'react';

function HomeGreeting(products) {

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    const productGridDiv = document.querySelector('.product-grid');
    if (searchInput) {
      console.log(`Buscando por: ${searchInput}`);
      var searchResult = searchProducts(products.products, searchInput);
      if (searchResult.length > 0) {
        const productByCat = Product.categorizeProducts(searchResult);
        console.log("Resultado da busca:", productByCat);
        productGridDiv.innerHTML = renderToStaticMarkup(RenderProducts(productByCat));
      } else {
        document.querySelector('.product-grid').innerHTML = "<p>Nenhum produto encontrado.</p>";
        console.log("Nenhum produto encontrado para a busca.");
      }
    } else {
      console.log("Campo de busca vazio.");
      const productByCat = Product.categorizeProducts(products.products);
      productGridDiv.innerHTML = renderToStaticMarkup(RenderProducts(productByCat));
    }
  }
    
  return (
    <div className="home-container">
        <div className="home-content">
            <h1 id="greeting">Bem-vindo ao Usados+</h1>
            <p>Compre e venda produtos usados com facilidade!</p>
            <form className="searchbar d-flex" role="search" id="searchForm" onSubmit={handleSearchSubmit} >
                <input className="form-control me-2" type="search" id="searchInput" placeholder="Pesquisar produtos..." aria-label="Search"/>
                <button className="btn" type="submit">Buscar</button>
            </form>
        </div>
    </div>
  );
}

function searchProducts(products, searchTerm) {
  const searchTermLower = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTermLower) ||
    product.description.toLowerCase().includes(searchTermLower) ||
    product.category.toLowerCase().includes(searchTermLower)
  );
}

function RenderProducts(productByCat) {
  return Object.keys(productByCat).map(categoria => (
    <div key={categoria} className="product-category">
      <h3>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h3>
      <div className="product-list">
        {productByCat[categoria].map(produto => (
          <ProductCard key={produto.id} product={produto} />
        ))}
      </div>
    </div>
  ));
}



function Home() {
  const [products, setProducts] = useState([]);
  const [productsByCat, setProductsByCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await ProductService.getAllProducts();
        setProducts(productList);
        console.log("Produtos carregados:", productList);
        const productByCat = Product.categorizeProducts(productList);
        setProductsByCat(productByCat);
      } catch (err) {
        setError(err.message);
        console.error("Erro no componente Home:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <HomeGreeting />
        <div id="home-loading">
          <h4>Carregando produtos...</h4>
          <div className="loading-spinner"></div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>Erro ao carregar produtos: {error}</div>;
  }

  if (products.length === 0) {
    return <div>Nenhum produto encontrado.</div>;
  }

  return (
    <>  
        <HomeGreeting products={products}/>
        <div className="home">
            <div className="home-products">
                <h2>Produtos Disponíveis</h2>
                <div className="product-grid">
                    {RenderProducts(productsByCat)}
                </div>
            </div>
        </div>
    </>
  );
}

export default Home;