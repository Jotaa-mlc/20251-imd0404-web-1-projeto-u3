import './../css/register-login.css';
import User from '../model/User';
import UserService from '../service/UserService';
import { Authentication } from '../service/Authentication';
import { useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();
    const handleRegister = async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        const newUser = new User(name, email, password, "", "", "", "https://placehold.co/150x150/png?text=User+Image");
        try {
            await UserService.addUser(newUser);
        } catch (error) {
            alert(error);
        } finally {
            Authentication.setLocalUser(newUser);
            navigate("/");
        }
    }

    return (
        <>
        <div className="register-background"></div>
        <div id='register-page'>
            <div id="register-container">
                <h1>Registrar</h1>
                <form>
                    <input type="text" id="name" name="name" placeholder="Nome" required />
                    <input type="email" id="email" name="email" placeholder="E-mail" required />
                    <input type="password" id="password" name="password" placeholder="Senha" required />
                    <input type="password" id="confirm-password" name="password" placeholder="Confirmar senha" required />
                    <button onClick={handleRegister} type="button" className='btn btn-primary'>Registrar</button>
                    <p>Já tem uma conta? <a href="/login">Entrar</a></p>
                </form>
            </div>
        </div>
        </>
    );
}

export default Register;