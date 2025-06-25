import { rtdb } from '../firebase';
import { ref, get, remove, runTransaction } from "firebase/database";
import { Authentication } from './Authentication';
import User from '../model/User';

export default class CartService {
    static async addProductToCart(produto) {
        const user = User.fromRTDB(Authentication.getLoggedUser());
        if (!user) { throw new Error("Faça o login para adicionar itens ao carrinho."); }
        if (!produto || !produto.id) { throw new Error("Dados do produto inválidos."); }

        const itemRef = ref(rtdb, `carts/${user.getId()}/${produto.id}`);

        try {
            await runTransaction(itemRef, (currentItemData) => {
                if (currentItemData === null) {
                    return { id: produto.id, name: produto.name, price: produto.price, image: produto.image, quantity: 1 };
                } else {
                    if (typeof currentItemData.quantity === 'number') {
                        currentItemData.quantity++;
                    } else {
                        currentItemData.quantity = 1;
                    }
                    return currentItemData;
                }
            });
        } catch (error) {
            console.error("Firebase Transaction Error:", error);
            throw new Error("Não foi possível adicionar o produto.");
        }
    }

    static async getCartItems() {
        const user = User.fromRTDB(Authentication.getLoggedUser());
        if (!user) {
            console.log("Nenhum usuário logado para buscar o carrinho.");
            return [];
        }

        const cartRef = ref(rtdb, `carts/${user.getId()}`);

        try {
            const snapshot = await get(cartRef);
            if (snapshot.exists()) {
                const itemsData = snapshot.val();
                const itemsArray = Object.values(itemsData);
                return itemsArray;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Erro ao buscar itens do carrinho:", error);
            throw new Error("Não foi possível carregar o carrinho.");
        }
    }

    static async removeProductFromCart(productId) {
        const user = User.fromRTDB(Authentication.getLoggedUser());
        if (!user) {
            throw new Error("Usuário não está logado.");
        }
        if (!productId) {
            throw new Error("ID do produto é inválido.");
        }

        const itemRef = ref(rtdb, `carts/${user.getId()}/${productId}`);

        try {
            await remove(itemRef);
            console.log(`Produto ${productId} removido do carrinho.`);
        } catch (error) {
            console.error("Erro ao remover item do carrinho:", error);
            throw new Error("Não foi possível remover o item do carrinho.");
        }
    }

    static async removeCart() {
        const user = User.fromRTDB(Authentication.getLoggedUser());
        const cartRef = ref(rtdb, `carts/${user.getId()}`);

        try {
            await remove(cartRef);
            console.log(`Carrinho do usuário ${user.name} foi excluido.`);
        } catch (error) {
            console.error("Erro ao excluir o carrinho:", error);
            throw new Error("Não foi possível excluir o carrinho.");
        }
    }
}