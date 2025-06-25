import { Authentication } from '../service/Authentication';
import { useNavigate } from 'react-router-dom';
import './../css/register-login.css';

function Login() {
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        let user;
        try {
            user = await Authentication.login(email, password);
        } catch (error) {
            alert(error);
        } finally {
            console.log("Login ok: ", user);
            Authentication.setLocalUser(user);
            navigate("/");
        }
    }

  return (
     <>
        <div className="register-background"></div>
        <div id='register-page'>
            <div id="register-container">
                <h1>Login</h1>
                <form>
                    <input type="email" id="email" name="email" placeholder="E-mail" required />
                    <input type="password" id="password" name="password" placeholder="Senha" required />
                    <button type="button" className='btn btn-primary' onClick={handleLogin}>Login</button>
                    <p>Não tem uma conta? <a href="/register">Registre</a></p>
                </form>
            </div>
        </div>
    </>
  );
}

export default Login;