import './../css/footer.css';
import backgroundImg from './../assets/img/footer-background.png';

function Footer() {
  return (
    <footer>
        <div className="spikebox">
            <div className="spikes over"></div>
            <div className="footer-container" >
                <p>&copy; 2025 Usados+ - Todos os direitos reservados.</p>
                <p>Compra e venda de produtos usados com segurança e praticidade.</p>
                <nav>
                    <a href="/about">Sobre</a>
                    <a href="/contact">Contato</a>
                    <a href="">Termos de uso</a>
                    <a href="">Política de privacidade</a>
                </nav>
            </div>
        </div>
    </footer>
  );
}

export default Footer;