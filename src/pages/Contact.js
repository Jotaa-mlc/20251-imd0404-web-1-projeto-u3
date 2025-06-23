import './../css/contact.css';

function Contact() {
    return (
        <div id="contact-page">
        <h1>Contato</h1>
        <p>Entre em contato conosco através do formulário abaixo:</p>
        <form>
            <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Digite seu nome" required/>
            </div>

            <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Digite seu email" required/>
            </div>

            <div class="form-group">
            <label for="message">Mensagem:</label>
            <textarea id="message" name="message" rows="4" placeholder="Escreva sua mensagem" required></textarea>
            </div>

            <div class="form-group">
            <input type="submit" value="Enviar"/>
            </div>

            <div class="contact-info">
            <p>Ou entre em contato pelo telefone: <strong>(84) XXXX-XXXX</strong></p>
            <p>Ou envie um e-mail para: 
                <a href="mailto:usadosmais@usadosmais.com">contato@usadosmais.com</a>
            </p>
            </div>
        </form>
        </div>
    );
}

export default Contact;