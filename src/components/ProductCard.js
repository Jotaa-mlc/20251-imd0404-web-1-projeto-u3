import { useNavigate } from 'react-router-dom';

function ProductCard({product}) {
  const navigate = useNavigate(); 

  if (!product) {
    return null;
  }

  const handleCardClick = () => {
    console.log("Produto clicado: ", product);
    const productUrl = `/product/${product.id}`;
    window.open(productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img className="product-img" src={product.image} alt={product.name} />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <span className="product-price">R$ {parseFloat(product.price).toFixed(2)}</span>
    </div>
  );
}

export default ProductCard;