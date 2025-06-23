import "./../css/home.css";
import ProductCard from "../components/ProductCard";

function HomeGreeting() {
  return (
    <div className="home-container">
        <div class="home-content">
            <h1 id="greeting">Bem-vindo ao Usados+</h1>
            <p>Compre e venda produtos usados com facilidade!</p>
            <form class="searchbar d-flex" role="search" id="searchForm" onsubmit="return false;">
                <input class="form-control me-2" type="search" id="searchInput" placeholder="Pesquisar produtos..." aria-label="Search"/>
                <button class="btn" type="submit">Buscar</button>
            </form>
        </div>
    </div>
  );
}

function Home() {
    const placeholderProducts = [
        {
          name: "Smartphone Usado",
          description: "Modelo antigo, mas funcionando",
          price: 250,
          category: "eletronicos",
          creator: "Admin",
          image: "https://placehold.co/150x150/png?text=Smartphone",
          quantity: 1,
          type: "Venda",
          condition: "usado"
        },
        {
          name: "Cadeira de Madeira",
          description: "Bem conservada",
          price: 150,
          category: "moveis",
          creator: "Admin",
          image: "https://placehold.co/150x150/png?text=Cadeira",
          quantity: 2,
          type: "Venda",
          condition: "usado"
        },
        {
          name: "Camisa Azul",
          description: "Tamanho M, pouco usada",
          price: 40,
          category: "roupas",
          creator: "Admin",
          image: "https://placehold.co/150x150/png?text=Camisa",
          quantity: 3,
          type: "Venda",
          condition: "usado"
        },
        {
          name: "Livro - Aventura",
          description: "Leitura envolvente",
          price: 30,
          category: "livros",
          creator: "Admin",
          image: "https://placehold.co/150x150/png?text=Livro",
          quantity: 5,
          type: "Venda",
          condition: "usado"
        },
        {
          name: "Tênis de Corrida",
          description: "Quase novo",
          price: 120,
          category: "esportes",
          creator: "Admin",
          image: "https://placehold.co/150x150/png?text=T%C3%AAnis",
          quantity: 1,
          type: "Venda",
          condition: "usado"
        },
        {
          name: "Fone de Ouvido",
          description: "Bom estado",
          price: 70,
          category: "eletronicos",
          creator: "Admin",
          image: "https://placehold.co/150x150/png?text=Fone",
          quantity: 4,
          type: "Venda",
          condition: "usado"
        }
    ];

    const produtosPorCategoria = placeholderProducts.reduce((acc, produto) => {
        const categoria = produto.category || "Outros";
        if (!acc[categoria]) {
            acc[categoria] = [];
        }
        acc[categoria].push(produto);
        return acc;
    }, {});

  return (
    <>  
        <HomeGreeting />
        <div className="home">
            <div className="home-products">
                <h2>Produtos Disponíveis</h2>
                <div className="product-grid">
                    {Object.keys(produtosPorCategoria).map(categoria => (
                        <div key={categoria} className="product-category">
                            <h3>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h3>
                            <div className="product-list">
                                {produtosPorCategoria[categoria].map((produto, index) => (
                                    <ProductCard key={index} product={produto} />
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