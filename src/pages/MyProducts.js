import './../css/my-products.css';
import addProductIcon from './../assets/img/add-circle-svgrepo-com.svg';
import { Authentication } from '../service/Authentication';
import { useEffect, useState } from 'react';
import User from '../model/User';
import ProductService from '../service/ProductService';
import OwnedProductCard from '../components/OwnedProductCard'
import Loading from '../components/Loading';

const user = User.fromRTDB(Authentication.getLoggedUser());

function SideMenu() {
    return (
        <div className="side-menu">
            <h2>Menu</h2>
            <ul>
                <li><a onClick={() => window.location.href="/"}>Página Inicial</a></li>
                <li><a onClick={() => window.location.href="/my-products"}>Meus Produtos</a></li>
                <li><a onClick={() => window.location.href="/profile"}>Perfil</a></li>
                <li><a href="#">Loja</a></li>
                <li><a href="#">Mensagens</a></li>
                <li><a href="#">Notificações</a></li>
                <li><a href="#">Meus Pedidos</a></li>
                <li><a href="#">Minhas Vendas</a></li>
                <li><a href="#">Configurações</a></li>
                <li><a onClick={() => {Authentication.logout(); window.location.href="/"}}>Sair</a></li>
            </ul>
        </div>
    );
}



function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const productList = await ProductService.getProductsByOwnerId(user.getId());
            setProducts(productList);
            console.log("Produtos carregados:", productList);
        } catch (err) {
            setError(err.message);
            console.error("Erro no componente My Products:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, []);

    return (
        <div id="my-products-page">
            <SideMenu />
            <div className="my-products-container">
                <div className="sub-header">
                    <h2>Meus Produtos</h2>
                    <button onClick={() => window.location.href="/new-product"}>
                        <div className="add-product">
                            <img src={addProductIcon} alt="Adicionar Produto"/>Produto
                        </div>
                    </button>
                </div>
                <div className="product-list">
                    {!loading ? products.map(product => (
                        <OwnedProductCard key={product.id} product={product} />
                    )) : <Loading msg={"Carregando produtos..."}/>}
                </div>
            </div>
        </div>
    );
}

export default MyProducts;