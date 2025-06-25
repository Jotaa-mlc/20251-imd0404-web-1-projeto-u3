import './../css/cart.css';
import { useState, useEffect } from 'react';
import CartService from '../service/CartService';
import CartProductCard from '../components/CartProductCard';
import { Authentication } from '../service/Authentication';
import User from '../model/User';
import Purchase from '../model/Purchase'
import PurchaseService from '../service/PurchaseService';
import Loading from '../components/Loading';

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

    const handleCheckOut = async (event) => {
        const user = User.fromRTDB(Authentication.getLoggedUser());
        const purchase = new Purchase("", user.getId(), items, "Crédito Loja");

        try {
            await PurchaseService.addPurchase(purchase);
            alert("Compra realizada com sucesso. Obrigado!");
        } catch (error) {
            alert(error);
        } finally {
            CartService.removeCart();
            window.location.href="/purchases";
        }
    }

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return total + (price * quantity);
        }, 0);
    };

    if (loading) {
        return <div className="cart-container"><Loading msg={"Carregando seu carrinho..."} /></div>;
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
                        <CartProductCard key={item.id} item={item} removingItemId={removingItemId} handleRemoveItem={handleRemoveItem} />
                    ))
                )}
            </div>

            <div id="cart-summary">
                <h2>Resumo do Pedido</h2>
                <p>Total: <strong id="cart-total">{calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
                <button id="checkout-button" onClick={handleCheckOut}>Finalizar Compra</button>
            </div>
        </div>
    );
}

export default Cart;