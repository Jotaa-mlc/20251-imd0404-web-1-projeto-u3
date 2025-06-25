import './../css/new-product.css';
import Product from '../model/Product';
import User from '../model/User';
import { Authentication } from '../service/Authentication';
import ProductService from '../service/ProductService';

function NewProduct() {
    const getImageBase64 = file => new Promise((resolve, reject) => {
        if (!file) return resolve("");
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      

    const handleNewProductSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById("product-name").value;
        const description = document.getElementById("product-description").value;
        const price = document.getElementById("product-price").value;
        const quantity = document.getElementById("product-quantity").value;
        const category = document.getElementById("product-category").value;
        const condition = document.getElementById("product-condition").value;
        const imageFile = document.getElementById("product-image").files[0];
        
        const imageBase64 = await getImageBase64(imageFile);

        const creator = User.fromRTDB(Authentication.getLoggedUser());
        console.log(creator);
        const creatorId = creator.getId();

        const product = new Product("", name, description, price, category, creatorId, imageBase64, quantity, condition);

        try{
            await ProductService.addProduct(product);
        } catch (error) {
            alert(error);
        } finally {
            alert("Produto cadastrado com sucesso.", product);
            //window.location.href="/my-products";
        }
    }

    return (
        <div id='new-product-page'>
            <div className="new-product-container">
                <h1>Cadastrar Novo Produto</h1>
                <form id="new-product-form">
                    <div className="form-group">
                        <label htmlFor="product-name">Nome do Produto</label>
                        <input type="text" className="form-control" id="product-name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product-description">Descrição do Produto</label>
                        <textarea className="form-control" id="product-description" rows="3" required></textarea>
                    </div>
                    <div className="form-group d-inline-label-input">
                        <label htmlFor="product-price">Preço (R$)</label>
                        <input type="number" className="form-control" id="product-price" min="0" step="0.01" required/>
                    </div>
                    <div className="form-group d-inline-label-input">
                        <label htmlFor="product-quantity">Quantidade</label>
                        <input type="number" className="form-control" id="product-quantity" min="1" max="999" required/>
                    </div>
                    <div className="form-group">
                        <div className="d-flex justify-content-between" style={{gap: '20px'}}>
                            <div className="form-group md-4" style={{flex: 1}}>
                                <label htmlFor="product-category">Categoria do Produto</label>
                                <select className="form-control" id="product-category" defaultValue="" required>
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
                                <select className="form-control" id="product-condition" required>
                                    <option value="" disabled selected>Selecione</option>
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
                        <input type="file" className="form-control-file" id="product-image" accept="image/*"/>
                    </div>
                    <button id="submit" className="btn btn-primary btn-block" onClick={handleNewProductSubmit}>Salvar Produto</button>
                </form>
            </div>
        </div>
    );
}

export default NewProduct;