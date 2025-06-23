import './../css/register-login.css';

function Register() {
    return (
        <>
        <div className="register-background"></div>
        <div id='register-container'>
            <div id="register-page">
                <h1>Registrar</h1>
                <form>
                    <input type="text" id="name" name="name" placeholder="Nome" required />
                    <input type="email" id="email" name="email" placeholder="E-mail" required />
                    <input type="password" id="password" name="password" placeholder="Senha" required />
                    <input type="password" id="password" name="password" placeholder="Confirmar senha" required />
                    <button type="button" className='btn btn-primary'>Registrar</button>
                    <p>Já tem uma conta? <a href="/login">Entrar</a></p>
                </form>
            </div>
        </div>
        </>
    );
}

export default Register;