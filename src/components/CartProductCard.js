function CartProductCard ({item, removingItemId, handleRemoveItem}) {
    return (
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
    );
}

export default CartProductCard;