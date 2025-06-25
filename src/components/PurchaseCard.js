const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

function PurchaseCard({ purchase }) {
  if (!purchase) {
    return null; 
  }

  return (
    <div className="purchase-card">
      <div className="purchase-header">
        <h2>Compra #{purchase.id.substring(1, 9)}</h2> 
        <p className="purchase-date">
          Data: {formatDate(purchase.date)}
        </p>
      </div>

      <div className="purchase-details">
        <p>
          Pagamento: {purchase.payment}
        </p>
      </div>

      <div className="purchase-products">
        <h3>Produtos:</h3>
        {purchase.products && purchase.products.length > 0 ? (
          <ul className="product-list">
            {purchase.products.map((product, index) => (
              <li key={product.id || index} className="product-item">
                <div className="product-item-info">
                  <img src={product.image} alt={product.name} className="product-item-img" />
                  <p>
                    {product.name} ({product.quantity}x) - {formatCurrency(product.price)} cada
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum produto nesta compra.</p>
        )}
      </div>

      <div className="purchase-footer">
        <p className="purchase-total">
          Total da Compra: {formatCurrency(purchase.total)}
        </p>
      </div>
    </div>
  );
}

export default PurchaseCard;