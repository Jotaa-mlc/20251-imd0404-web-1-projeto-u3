import './../css/register-login.css';

function Login() {
  return (
     <>
        <div className="register-background"></div>
        <div id='register-container'>
            <div id="register-page">
                <h1>Login</h1>
                <form>
                    <input type="email" id="email" name="email" placeholder="E-mail" required />
                    <input type="password" id="password" name="password" placeholder="Senha" required />
                    <button type="button" className='btn btn-primary'>Login</button>
                    <p>Não tem uma conta? <a href="/register">Registre</a></p>
                </form>
            </div>
        </div>
    </>
  );
}

export default Login;