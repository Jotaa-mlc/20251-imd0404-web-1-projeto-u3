import { useState, useEffect } from 'react';
import Product from '../model/Product';

function ProductForm({productToEdit, onSubmitForm}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const getImageBase64 = file => new Promise((resolve, reject) => {
        if (!file) return resolve("");
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name || "");
            setDescription(productToEdit.description || "");
            setPrice(productToEdit.price || "");
            setQuantity(productToEdit.quantity || "");
            setCategory(productToEdit.category || "");
            setCondition(productToEdit.condition || "");
            setImageUrl(productToEdit.image || "");
        } else {
            setName("");
            setDescription("");
            setPrice("");
            setQuantity("");
            setCategory("");
            setCondition("");
            setImageUrl("");
        }

    }, [productToEdit]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleQuantityChange = (e) => setQuantity(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleConditionChange = (e) => setCondition(e.target.value);
    const handleImageUrlChange = (e) => setImageUrl(e.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById("product-name").value;
        const description = document.getElementById("product-description").value;
        const price = document.getElementById("product-price").value;
        const quantity = document.getElementById("product-quantity").value;
        const category = document.getElementById("product-category").value;
        const condition = document.getElementById("product-condition").value;
        
        const imageFile = document.getElementById("product-image").files[0];
        const imageBase64 = await getImageBase64(imageFile);
        const productImage = imageBase64 ? imageBase64 : "https://placehold.co/300x300/png?text=" + name.replace(" ", "+");

        const productId = productToEdit.id ? productToEdit.id : "";

        const product = new Product(productId, name, description, price, category, "", productImage, quantity, condition);

        onSubmitForm(product);
    }

    return(
        <div id='new-product-page'>
            <div className="new-product-container">
                <h1>{productToEdit ? "Editar" : "Cadastrar Novo"} Produto</h1>
                <form id="new-product-form">
                    <div className="form-group">
                        <label htmlFor="product-name">Nome do Produto</label>
                        <input type="text" className="form-control" id="product-name" onChange={handleNameChange} value={name} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product-description">Descrição do Produto</label>
                        <textarea className="form-control" id="product-description" rows="3" onChange={handleDescriptionChange} value={description} required></textarea>
                    </div>
                    <div className="form-group d-inline-label-input">
                        <label htmlFor="product-price">Preço (R$)</label>
                        <input type="number" className="form-control" id="product-price" min="0" step="0.01" onChange={handlePriceChange} value={price} required/>
                    </div>
                    <div className="form-group d-inline-label-input">
                        <label htmlFor="product-quantity">Quantidade</label>
                        <input type="number" className="form-control" id="product-quantity" min="1" max="999" onChange={handleQuantityChange} value={quantity} required/>
                    </div>
                    <div className="form-group">
                        <div className="d-flex justify-content-between" style={{gap: '20px'}}>
                            <div className="form-group md-4" style={{flex: 1}}>
                                <label htmlFor="product-category">Categoria do Produto</label>
                                <select className="form-control" id="product-category" onChange={handleCategoryChange} value={category} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="eletronicos">Eletrônicos</option>
                                    <option value="moveis">Móveis</option>
                                    <option value="roupas">Roupas</option>
                                    <option value="livros">Livros</option>
                                    <option value="esportes">Esportes</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>
                            <div className="form-group md-4" style={{flex: 1}}>
                                <label htmlFor="product-condition">Condição do Produto</label>
                                <select className="form-control" id="product-condition" onChange={handleConditionChange} value={condition} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="novo">Novo</option>
                                    <option value="usado">Usado</option>
                                    <option value="reformado">Reformado</option>
                                    <option value="defeituoso">Defeituoso</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="product-image" className='mb-2'>Imagem do Produto</label>
                        <input type="file" className="form-control-file" id="product-image" accept="image/*" onChange={handleImageUrlChange}/>
                    </div>
                    <button id="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Salvar Produto</button>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;