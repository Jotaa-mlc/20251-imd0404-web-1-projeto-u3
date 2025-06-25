import editIcon from '../assets/img/edit-ui-svgrepo-com.svg'
import deleteIcon from '../assets/img/delete-2-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom';
import ProductService from '../service/ProductService';

function OwnedProductCard ({product, handleRemoveItem}) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        console.log("Produto clicado: ", product);
        const productUrl = `/product/${product.id}`;
        window.open(productUrl, '_blank', 'noopener,noreferrer');
    };

    const handleEditProduct = (event) => {
        event.stopPropagation()
        console.log("Editando produto: ", product);
        navigate(`/edit-product/${product.id}`);
    }

    const handleDeleteProduct = (event) => {
        event.stopPropagation();
        ProductService.removeProduct(product.id);
        handleRemoveItem(product.id)
    }

    return (
        <div className="product-card" onClick={handleCardClick}>
            <img src={product.image} alt={product.name} className='product-img'/>
            <div className="product-detail">
                <h3>{product.name}</h3>
                <p className="product-price">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p className="product-quantity">{product.quantity} <b>Unidades</b></p>
                <img src={editIcon} alt="Editar" className="product-opt edit-btn" onClick={handleEditProduct}/>
                <img src={deleteIcon} alt="Excluir" className="product-opt delete-btn" onClick={handleDeleteProduct}/>
            </div>
        </div>
    );
}

export default OwnedProductCard;