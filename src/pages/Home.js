import "./../css/home.css";
import Product from "../model/Product";
import ProductCard from "../components/ProductCard";
import ProductService from "../service/ProductService";
import React, { useRef, useEffect, useState } from 'react';

function HomeGreeting() {
  return (
    <div className="home-container">
        <div className="home-content">
            <h1 id="greeting">Bem-vindo ao Usados+</h1>
            <p>Compre e venda produtos usados com facilidade!</p>
            <form className="searchbar d-flex" role="search" id="searchForm" onsubmit="return false;">
                <input className="form-control me-2" type="search" id="searchInput" placeholder="Pesquisar produtos..." aria-label="Search"/>
                <button className="btn" type="submit">Buscar</button>
            </form>
        </div>
    </div>
  );
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
        const productByCat = {};
        productList.forEach(product => {
          const cat = product.category || "Outros";
          if (!productByCat[cat]) productByCat[cat] = [];
          productByCat[cat].push(product);
        });
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
      <div>Carregando produtos...</div>
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
        <HomeGreeting />
        <div className="home">
            <div className="home-products">
                <h2>Produtos Disponíveis</h2>
                <div className="product-grid">
                    {Object.keys(productsByCat).map(categoria => (
                      <div key={categoria} className="product-category">
                          <h3>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h3>
                          <div className="product-list">
                              {productsByCat[categoria].map( produto => (
                                  <ProductCard key={produto.id} product={produto} />
                              ))}
                          </div>
                      </div>
                      ))}
                </div>
            </div>
        </div>
    </>
  );
}

export default Home;