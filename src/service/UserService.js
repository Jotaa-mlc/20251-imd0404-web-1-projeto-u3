import User from '../model/User';
import { rtdb } from '../firebase';
import { ref, get, set, child, update, remove } from 'firebase/database';
import { Authentication } from './Authentication';



export default class UserService {
    static async getAllUsers() {
        try {
            const dbRef = ref(rtdb);
            const snapshot = await get(child(dbRef, 'users'));
            const users = [];
            if (snapshot.exists()) {
                console.log("Dados brutos do Realtime Database:", snapshot.val());
                snapshot.forEach(childSnapshot => {
                    const user = User.fromRTDB(childSnapshot.val());
                    users.push(user);
                });
            } else {
                console.log("Nenhum usuário encontrado no RTDB.");
            }
            
            console.log("Usuários carregados do Realtime Database (instâncias de User):", users);
            return users;
        } catch (error) {
            console.error("Erro ao buscar usuários do Realtime Database:", error);
            throw new Error("Não foi possível carregar os usuários. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async getUserById(userId) {
        try {
            const dbRef = ref(rtdb);
            const userKey = userId.replace(/\./g, '_');
            const snapshot = await get(child(dbRef, `users/${userKey}`));
            if (snapshot.exists()) {
                console.log("Dados do usuário:", snapshot.val());
                return User.fromRTDB(snapshot.val());
            } else {
                console.log("Usuário não encontrado.", userKey);
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw new Error("Não foi possível carregar o usuário. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async addUser(user) {
        try {
            const dbRef = ref(rtdb, 'users');
            const newUserKey = user.getId();
            const newUserRef = child(dbRef, newUserKey);
            await set(newUserRef, user);
            console.log("Usuário adicionado com sucesso:", user);
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
            throw new Error("Não foi possível adicionar o usuário. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async updateUser(user) {
        try {
            const dbRef = ref(rtdb, 'users');
            const UserKey = user.getId();
            const UserRef = child(dbRef, UserKey);
            await update(UserRef, user);
            Authentication.setLocalUser(user);
            console.log("Usuário atualizado com sucesso:", user);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new Error("Não foi possível atualizar o usuário. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async deleteUser(user) {
        try {
            const dbRef = ref(rtdb, 'users');
            const UserKey = user.getId();
            const UserRef = child(dbRef, UserKey);
            await remove(UserRef, user);
            Authentication.logout();
            console.log("Usuário removido com sucesso:", user);
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
            throw new Error("Não foi possível remover o usuário. Verifique sua conexão e as regras do Firebase.");
        }
    }
}