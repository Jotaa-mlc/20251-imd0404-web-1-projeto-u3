import './../css/profile.css';
import { Authentication } from '../service/Authentication';
import React, { useState, useEffect, use } from 'react';
import UserService from '../service/UserService';

function Profile() {
    const user = Authentication.getLoggedUser();
    const [name, setName] = useState('');
    const [cep, setCEP] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        if (user) {
            console.log(user);
            setName(user.name);
            setCEP(user.cep);
            setPhoneNumber(user.phoneNumber);
            setProfilePic(user.profilePicture);
        }
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
        user.name = name;
        console.log(name);
    };
    const handleCepChange = (e) => {
        setCEP(e.target.value);
        user.cep = cep.replace(/\D/g, "");
        console.log(cep);
    };
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        user.phoneNumber = phoneNumber;
        console.log(phoneNumber);
    };
    const handleProfilePicCHange = (e) => {
        setProfilePic(e.target.result)
        user.profilePicture = profilePic;
        console.log(profilePic);
    };

    const handleUpdateUser = async (event) => {
        const name = document.getElementById('user-name').value;
        const cep = document.getElementById('user-cep').value.replace(/\D/g, "");
        const phoneNumber = document.getElementById('user-phone').value.replace(/\D/g, "");

        user.name = name;
        user.cep = cep;
        user.phoneNumber = phoneNumber;
        try {
            await UserService.updateUser(user);
        } catch (error) {
            alert(error);
        } finally {
            alert("Usuário atualizado com sucesso.", user);
        }
    }

    const handleDeleteUser = async (event) => {
        try {
            await UserService.deleteUser(user);
        } catch (error) {
            alert(error);
        } finally {
            alert("Usuário removido com sucesso.");
            window.location.href = "/";
        }
    }
    
    const handleValidarCEP = async (event) => {
        event.preventDefault();
        

        const cepInput = document.getElementById("user-cep");
        const msg = document.getElementById("address-validation-msg");
        let clearCep = cepInput.value.replace(/\D/g, "");
        let enderecoValidado = "";

        console.log("CEP digitado: ", cep, "ClearCep: ", clearCep);

        if (clearCep.length !== 8) {
            msg.textContent = "CEP deve ter 8 dígitos (ex: 01001000 ou 01001-000).";
            msg.style.color = "red";
            enderecoValidado = "";
            return;
        }

        msg.textContent = "Validando endereço...";
        msg.style.color = "#888";

        fetch(`https://viacep.com.br/ws/${clearCep}/json/`)
            .then(res => res.json())
            .then(data => {
            if (data.erro) {
                msg.textContent = "CEP não encontrado.";
                msg.style.color = "red";
                enderecoValidado = "";
            } else {
                enderecoValidado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                msg.textContent = `Endereço: ${enderecoValidado}`;
                msg.style.color = "green";

                user.address = enderecoValidado;
            }
            })
            .catch(() => {
                msg.textContent = "Erro ao validar o CEP.";
                msg.style.color = "red";
                enderecoValidado = "";
            });
    }

    return (
        <div id='profile-page'>
            <div className="profile-container shadow p-4">
                <h1 className="mb-4">Meu Perfil</h1>
                <img id="profile-picture" src={user.profilePicture ? user.profilePicture : "https://placehold.co/150x150/png?text=User+Image"} alt="Foto de Perfil"/>
                <div className="mb-4 d-flex flex-column align-items-center">
                    <label htmlFor="new-image" className="btn btn-outline-secondary mb-2" style={{cursor:"pointer"}}>
                        Alterar foto de perfil
                        <input type="file" id="new-image" accept="image/*" className="d-none" onChange={handleProfilePicCHange} />
                    </label>
                    <small className="text-muted">Formatos aceitos: JPG, PNG, GIF. Máx: 2MB.</small>
                </div>

                <p><strong>Email:</strong> <span id="user-email"></span>{user.email}</p>
                <form>
                    <div className='d-flex flex-row form-input'>
                        <label htmlFor="user-name">Nome: </label>
                        <input type='text' id='user-name' className='input' onChange={handleNameChange} value={name}/>
                    </div>
                    <div className='d-flex flex-row form-input'>
                        <label htmlFor="user-name">CEP: </label>
                        <div className='d-flex flex-row input'>
                            <input type='text' id='user-cep' onChange={handleCepChange} value={cep ? cep : "Não cadastrado"}/>
                            <button className="btn btn-sm btn-outline-info ml-2" onClick={handleValidarCEP}>Validar</button>
                        </div>
                    </div>
                        <small id="address-validation-msg" className="text-muted d-block mb-3"></small>
                    <div className='d-flex flex-row form-input'>
                        <label htmlFor="user-phone">Telefone: </label>
                        <input type='text' id='user-phone' className='input' onChange={handlePhoneNumberChange} value={phoneNumber ? phoneNumber : "Não cadastrado"}/>
                    </div>
                </form>

                <div className='d-flex gap-2'>
                    <button className="btn btn-primary mt-3" onClick={handleUpdateUser}>Salvar Alterações</button>
                    <button className="btn btn-danger mt-3" onClick={handleDeleteUser}>Excluir Conta</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;