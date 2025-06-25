import './../css/my-products.css';
import addProductIcon from './../assets/img/add-circle-svgrepo-com.svg';

function SideMenu() {
    return (
        <div className="side-menu">
            <h2>Menu</h2>
            <ul>
                <li><a href="/">Página Inicial</a></li>
                <li><a href="/my-products">Meus Produtos</a></li>
                <li><a href="/profile">Perfil</a></li>
                <li><a href="#">Loja</a></li>
                <li><a href="#">Mensagens</a></li>
                <li><a href="#">Notificações</a></li>
                <li><a href="#">Meus Pedidos</a></li>
                <li><a href="#">Minhas Vendas</a></li>
                <li><a href="#">Configurações</a></li>
                <li><a href="/login">Sair</a></li>
            </ul>
        </div>
    );
}



function MyProducts() {
    return (
        <div id="my-products-page">
            <SideMenu />
            <div className="my-products-container">
                <div className="sub-header">
                    <h2>Meus Produtos</h2>
                    <button onClick={() => window.location.href="/new-product"}>
                        <div className="add-product">
                            <img src={addProductIcon} alt="Adicionar Produto"/>Produto
                        </div>
                    </button>
                </div>
                <div id="my-products-list">
                    {/* Lista de produtos será renderizada aqui */}
                </div>
            </div>
        </div>
    );
}

export default MyProducts;