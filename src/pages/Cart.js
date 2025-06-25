import './../css/cart.css';
import React, { useState, useEffect } from 'react';
import CartService from '../service/CartService';

function Cart() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removingItemId, setRemovingItemId] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const cartItems = await CartService.getCartItems();
                setItems(cartItems);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleRemoveItem = async (productId) => {
        setRemovingItemId(productId);

        try {
            await CartService.removeProductFromCart(productId);
            setItems(currentItems => currentItems.filter(item => item.id !== productId));
        } catch (err) {
            alert(err.message);
        } finally {
            setRemovingItemId(null);
        }
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return total + (price * quantity);
        }, 0);
    };

    if (loading) {
        return <div className="cart-container"><h1>Carregando seu carrinho...</h1></div>;
    }

    if (error) {
        return <div className="cart-container"><h1>Erro: {error}</h1></div>;
    }

    return (
        <div className="cart-container">
            <h1>Meu Carrinho</h1>
            <div id="cart-items-container">
                {items.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p>Preço: {parseFloat(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <div className="quantity-control">
                                    <label htmlFor={`quantity-${item.id}`}>Quantidade:</label>
                                    <input
                                        id={`quantity-${item.id}`}
                                        type="number"
                                        className="cart-item-quantity"
                                        value={item.quantity}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <button 
                                className="remove-item-btn"
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={removingItemId === item.id}
                            >
                                {removingItemId === item.id ? 'Removendo...' : 'Remover'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div id="cart-summary">
                <h2>Resumo do Pedido</h2>
                <p>Total: <strong id="cart-total">{calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
                <button id="checkout-button">Finalizar Compra</button>
            </div>
        </div>
    );
}

export default Cart;