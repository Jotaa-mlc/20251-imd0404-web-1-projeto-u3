import './../css/profile.css';

function Profile(props) {
    return (
        <div id='profile-page'>
            <div class="profile-container shadow p-4">
                <h1 class="mb-4">Meu Perfil</h1>
                <img id="profile-picture" src={props.image ? props.image : "https://placehold.co/150x150/png?text=User+Image"} alt="Foto de Perfil"/>
                <div class="mb-4 d-flex flex-column align-items-center">
                    <label for="new-image" class="btn btn-outline-secondary mb-2" style={{cursor:"pointer"}}>
                        Alterar foto de perfil
                        <input type="file" id="new-image" accept="image/*" class="d-none"/>
                    </label>
                    <small class="text-muted">Formatos aceitos: JPG, PNG, GIF. Máx: 2MB.</small>
                </div>

                    <p><strong>Nome:</strong> <span id="user-name">{props.name}</span></p>
                    <p><strong>Email:</strong> <span id="user-email"></span>{props.email}</p>

                    <p><strong>CEP:</strong> 
                    <span id="user-cep" class="editable" contenteditable="true">Clique para editar</span>
                    <button class="btn btn-sm btn-outline-info ml-2" onclick="validarEndereco()">Validar</button>
                    <small id="address-validation-msg" class="text-muted d-block mt-1"></small>
                    </p>

                    <p><strong>Telefone:</strong> 
                    <span id="user-phone" class="editable" contenteditable="true">Clique para editar</span>
                    </p>

                    <button class="btn btn-primary mt-3" onclick="salvarDados()">Salvar Alterações</button>
            </div>
        </div>
    );
}

export default Profile;