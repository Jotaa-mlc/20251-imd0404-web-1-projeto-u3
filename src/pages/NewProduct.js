import './../css/new-product.css';

function NewProduct() {
    return (
        <div id='new-product-page'>
            <div className="new-product-container">
                <h1>Cadastrar Novo Produto</h1>
                <form id="new-product-form">
                    <div class="form-group">
                        <label for="product-name">Nome do Produto</label>
                        <input type="text" class="form-control" id="product-name" required/>
                    </div>
                    <div class="form-group">
                        <label for="product-description">Descrição do Produto</label>
                        <textarea class="form-control" id="product-description" rows="3" required></textarea>
                    </div>
                    <div class="form-group d-inline-label-input">
                        <label for="product-price">Preço (R$)</label>
                        <input type="number" class="form-control" id="product-price" min="0" step="0.01" required/>
                    </div>
                    <div class="form-group d-inline-label-input">
                        <label for="product-quantity">Quantidade</label>
                        <input type="number" class="form-control" id="product-quantity" min="1" max="999" required/>
                    </div>
                    <div class="form-group">
                        <div class="d-flex justify-content-between" style={{gap: '20px'}}>
                            <div class="form-group md-4" style={{flex: 1}}>
                                <label for="product-category">Categoria do Produto</label>
                                <select class="form-control" id="product-category" required>
                                <option value="" disabled selected>Selecione uma categoria</option>
                                <option value="eletronicos">Eletrônicos</option>
                                <option value="moveis">Móveis</option>
                                <option value="roupas">Roupas</option>
                                <option value="livros">Livros</option>
                                <option value="esportes">Esportes</option>
                                <option value="outros">Outros</option>
                                </select>
                            </div>
                            <div class="form-group md-4" style={{flex: 1}}>
                                <label for="product-condition">Condição do Produto</label>
                                <select class="form-control" id="product-condition" required>
                                    <option value="" disabled selected>Selecione</option>
                                    <option value="novo">Novo</option>
                                    <option value="usado">Usado</option>
                                    <option value="reformado">Reformado</option>
                                    <option value="defeituoso">Defeituoso</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-column">
                        <label for="product-image" className='mb-2'>Imagem do Produto</label>
                        <input type="file" class="form-control-file" id="product-image" accept="image/*"/>
                    </div>
                    <button id="submit" type="submit" class="btn btn-primary btn-block">Salvar Produto</button>
                </form>
            </div>
        </div>
    );
}

export default NewProduct;