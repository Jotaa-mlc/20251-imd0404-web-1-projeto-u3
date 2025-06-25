import './../css/product.css';
import cartLogo from './../assets/img/cart-shopping-solid.svg';
import chatLogo from './../assets/img/comments-solid.svg';
import sellerLogo from './../assets/img/user-solid.svg';
import phoneLogo from './../assets/img/phone-solid.svg';
import locationLogo from './../assets/img/location-dot-solid.svg';
import mapLogo from './../assets/img/map-solid.svg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../service/ProductService';
import UserService from '../service/UserService';
import CartService from '../service/CartService';
import { Authentication } from '../service/Authentication';
import Loading from '../components/Loading';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const productData = await ProductService.getProductById(productId);
                setProduct(productData);
                if (productData && productData.creatorId) {
                    const sellerData = await UserService.getUserById(productData.creatorId);
                    setSeller(sellerData);
                }
            } catch (err) {
                setError("Erro ao carregar os detalhes.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    const handleAddToCart = async () => {
        const user = Authentication.getLoggedUser();
        if (!user) {
            alert("Você precisa fazer login para adicionar produtos ao carrinho.");
            return;
        }
        
        setIsAddingToCart(true);
        setFeedbackMessage('');
        try {
            await CartService.addProductToCart(product);
            setFeedbackMessage('Produto adicionado com sucesso!');
        } catch (error) {
            setFeedbackMessage(error.message);
            console.error(error);
        } finally {
            setIsAddingToCart(false);
            setTimeout(() => setFeedbackMessage(''), 3000);
        }
    };
    
    if (loading) return <Loading msg={"Carregando informações do produto"} />;
    if (error) return <div>{error}</div>;
    if (!product || !seller) return <div>Produto ou vendedor não encontrado.</div>;

    return (
        <div id="product-page">
            <div className="anuncio">
                <div className="info">
                    <div className="fotos"><img src={product.image} alt={product.name} className="foto-anuncio"/></div>
                    <div className="descricao"><h1>{product.name}</h1><br/><p>{product.description}</p><small className="pequeno">Ver descrição completa</small></div>
                    <hr/>
                    <h2>Detalhes</h2>
                    <div className="detalhes d-flex">
                        <div className='d-flex flex-column'>
                            <p><strong>Categoria</strong></p>
                            <span id="product-category">{product.category}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <p><strong>Condição</strong></p>
                            <span id="product-condition">{product.condition}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="info-vendedor">
                        <div><img src={sellerLogo} className="icone" alt='Vendedor'/><h3 className="local">{seller.name}</h3></div>
                        <div><img src={phoneLogo} className="icone" alt='Telefone'/><p className="local">{seller.phoneNumber}</p></div>
                        <div><img src={mapLogo} className="icone" alt='Endereço'/><p className="local">{seller.address}</p></div>
                        <div><img src={locationLogo} className="icone" alt='CEP'/><p className="local">CEP - {seller.cep}</p></div>
                    </div>
                </div>
                <div className="card-preco">
                    <h1>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                    <p>3x sem juros de {(product.price / 3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <small className="pequeno">mais opções de parcelamento</small>
                    <hr/>
                    <p>Calcular o frete</p>
                    <input type="text" className="frete" placeholder="Digite o CEP"/>
                    <small className="pequeno">Não sei meu CEP</small>
                    <hr/>
                    <button className="botao-card laranja" onClick={handleAddToCart} disabled={isAddingToCart}>
                        <img src={cartLogo} className="botao-img" alt='Ícone Carrinho'/>
                        {isAddingToCart ? 'Adicionando...' : 'Comprar'}
                    </button>
                    {feedbackMessage && <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>{feedbackMessage}</p>}
                    <button className="botao-card branco"><img src={chatLogo} className="botao-img" alt='Ícone Chat'/>Chat</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;