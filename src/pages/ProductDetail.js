import './../css/product.css'
import cartLogo from './../assets/img/cart-shopping-solid.svg'
import chatLogo from './../assets/img/comments-solid.svg'
import sellerLogo from './../assets/img/user-solid.svg'
import phoneLogo from './../assets/img/phone-solid.svg'
import locationLogo from './../assets/img/location-dot-solid.svg'
import mapLogo from './../assets/img/map-solid.svg'
import ProductService from '../service/ProductService'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../service/UserService'


function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [sellerAddress, setSellerAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                setProduct(null);
                setSeller(null);

                const productData = await ProductService.getProductById(productId);
                setProduct(productData);
                if (productData.creatorId) {
                    const sellerData = await UserService.getUserById(productData.creatorId);
                    setSeller(sellerData);
                }
            } catch (err) {
                setError("Erro ao carregar detalhes do produto ou vendedor.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        } else {
            setError("ID do produto não fornecido.");
            setLoading(false);
        }
    }, [productId]); // Re-busca se o ID do produto na URL mudar

    if (loading) return (
        <div id="home-loading">
          <h4>Carregando dados do produto...</h4>
          <div className="loading-spinner"></div>
        </div>
    );
    if (error) return <div>{error}</div>;
    if (!product) return <div>Produto não encontrado.</div>;

    return (
        <div id="product-page"> 
            <div className="anuncio">  
                <div className="info">
                    <div className="fotos">
                        <img src={product.image} alt="imagem do produto" className="foto-anuncio"/>
                    </div>

                    <div className="descricao">
                        <h1 id='product-name'>{product.name}</h1>
                        <br/>
                        <p id='product-description'>{product.description}</p>
                        <small className="pequeno">Ver descrição completa</small>
                    </div>
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
                        <div>
                            <img id='seller-profile-picture' src={sellerLogo} className="icone" alt='Foto do Vendedor'/>
                            <h3 className="local">{seller.name}</h3>
                        </div>
                        <div>
                            <img src={phoneLogo} className="icone" alt='Icone telefone vendedor'/>
                            <p id="seller-phone-number" className="local">{seller.phoneNumber}</p>
                        </div>
                        <div>
                            <img src={mapLogo} className="icone" alt='Icone endereço vendedor'/>
                            <p id="seller-address" className="local">{seller.address}</p>
                        </div>
                        <div>
                            <img src={locationLogo} className="icone" alt='Icone CEP vendedor'/>
                            <p id="seller-cep" className="local">CEP - {seller.cep}</p>
                        </div>
                    </div>
                    
                </div>

                <div className="card-preco">
                    <h1 id='product-price'>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                    <p id="product-installment">3x sem juros de {(product.price / 3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <small className="pequeno">mais opções de parcelamento</small>
                    <hr/>
                    <p>Calcular o frete</p>
                    <input type="text" className="frete" placeholder="Digite o CEP"/>
                    <small className="pequeno">Não sei meu CEP</small>
                    <hr/>
                    <button className="botao-card laranja"><img src={cartLogo} className="botao-img" alt='Botão de compra'/>Comprar</button>
                    <button className="botao-card branco"><img src={chatLogo} className="botao-img" alt='Botão de chat'/>Chat</button>
                </div>
            </div>
        </div>  

    );
}

export default ProductDetail;