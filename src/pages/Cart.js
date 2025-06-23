import './../css/cart.css';

function Cart() {
    return (
        <div class="cart-container">
            <h1>Meu Carrinho</h1>
            <div id="cart-items-container">
            </div>
            <div id="cart-summary">
                <h2>Resumo do Pedido</h2>
                <p>Total: <strong id="cart-total">R$ 0.00</strong></p>
                <button id="checkout-button">Finalizar Compra</button>
            </div>
        </div>
    );
}

export default Cart;