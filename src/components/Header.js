import {Authentication} from '../service/Authentication';
import logo from '../assets/img/logo.png';
import './../css/header.css';

function notLogedIn() {
  return (
    <div className="login-register">
      <a href="/login">Login</a>
      <a href="/register">Registrar</a>
    </div>
  );
}

function logedIn() {
    const handleLogout = (event) => {
        Authentication.logout();
        window.location.href = "/";
    }

    let userName = Authentication.getLoggedUser().name;
    let userPic = Authentication.getLoggedUser().profilePicture;
    
    return (
        <>  
            <a href="/profile" className="user-profile-link">
                <img className="user-img" alt="User Image" src={userPic ? userPic : "https://placehold.co/150x150/png?text=User"}/>
                <span className="user-name">{userName}</span>
            </a>
            <div className="dropdown">
                <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg fill="white" viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" onClick={() => window.location.href="/my-products"}>Meus Produtos</a></li>
                    <li><a className="dropdown-item" onClick={() => window.location.href="/purchases"}>Minhas Compras</a></li>
                    <li><a className="dropdown-item" onClick={() => window.location.href="/profile"}>Meu Perfil</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" id="logoutButtonHeader" onClick={handleLogout}>Sair</a></li>
                </ul>
            </div>
            <a href="/cart" id="cartIconLink" alt="Carrinho" className="cart-icon" style={{ textDecoration: 'none', color: 'white' }}>
                <svg fill="white" viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20.01 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
            </a>
        </>
    );
}

function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src={logo} alt="Logo"/></a>
                <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/about">Sobre</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/contact">Contato</a>
                </li>
                </ul>
            </div>
            </nav>

            <div className="left-container">
                {props.isLogedin ? logedIn() : notLogedIn()}
            </div>
    </header>
  );
}

export default Header;