import './../css/my-products.css';
import addProductIcon from './../assets/img/add-circle-svgrepo-com.svg';
import { Authentication } from '../service/Authentication';
import { useEffect, useState } from 'react';
import User from '../model/User';
import ProductService from '../service/ProductService';
import OwnedProductCard from '../components/OwnedProductCard'
import Loading from '../components/Loading';

function MyProducts() {
    const user = User.fromRTDB(Authentication.getLoggedUser());
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

    if (error) {
        return <h1>Ocorreu um erro {error}</h1>;
    }

    const handleRemoveItem = (itemToRemove) => {
        const updatedProducts = products.filter(item => item.id != itemToRemove);
        setProducts(updatedProducts);
    }

    return (
        <div id="my-products-page">
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
                        <OwnedProductCard key={product.id} product={product} handleRemoveItem={handleRemoveItem} />
                    )) : <Loading msg={"Carregando produtos..."}/>}
                </div>
            </div>
        </div>
    );
}

export default MyProducts;