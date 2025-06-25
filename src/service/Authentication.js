import UserService from "./UserService";
import User from "../model/User";

let localUser = JSON.parse(localStorage.getItem("loggedUser"));

export class Authentication {
    static async login(email, password) {
        const user = await UserService.getUserById(email);
        console.log("Auth.login: ", user);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        } else if (!user.authenticate(password)) {
            throw new Error("Senha incorreta.");
        } else {
            this.setLocalUser(user);
            return user;
        }
    }

    static async register(user) {
        const existingUser = await UserService.getUserById(user.email);
        if (existingUser) {
            throw new Error("Usuário já cadastrado com este email.");
        }
        const newUser = await UserService.addUser(user);
        localStorage.setItem("loggedUser", JSON.stringify(newUser));
        return newUser;
    }

    static async updateUser(user) {
        const updatedUser = await UserService.updateUser(user);
        this.setLocalUser(updatedUser);
        return updatedUser;
    }

    static isAuthenticated() {
        return localUser !== null;
    }

    static setLocalUser(user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
    }

    static getLoggedUser() {
        return localUser;
    }

    static logout() {
        localStorage.removeItem("loggedUser");
    }
}