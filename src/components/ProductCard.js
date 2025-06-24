function ProductCard({product}) {
  return (
    <div className="product-card">
      <img className="product-img" src={product.image} alt={product.name} />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <span className="product-price">R$ {parseFloat(product.price).toFixed(2)}</span>
    </div>
  );
}

export default ProductCard;