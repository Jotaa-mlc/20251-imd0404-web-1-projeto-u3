import Product from '../model/Product';
import { rtdb } from '../firebase';
import { ref, get, set, push, remove, update, child } from 'firebase/database';
import User from '../model/User';
import { Authentication } from './Authentication';

export default class ProductService {

    static async getAllProducts() {
        try {
            const dbRef = ref(rtdb);
            const snapshot = await get(child(dbRef, 'products'));
            const products = [];
            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const product = Product.fromRTDB(childSnapshot.key, childSnapshot.val());
                    products.push(product);
                });
            } else {
                console.log("Nenhum produto encontrado no RTDB.");
            }
            //console.log("Produtos carregados do RTDB (Product):", products);
            return products;
        } catch (error) {
            console.error("Erro ao buscar produtos do Realtime Database:", error);
            throw new Error("Não foi possível carregar os produtos. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async getProductById(productId) {
       try {
            const dbRef = ref(rtdb);
            const snapshot = await get(child(dbRef, `products/${productId}`));
            if (snapshot.exists()) {
                console.log("Produto encontrado:", snapshot.val());
                return Product.fromRTDB(snapshot.key, snapshot.val());
            } else {
                console.log("Produto não encontrado.");
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            throw new Error("Não foi possível carregar o produto. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async getProductsByOwnerId(ownerId) {
        let productsOwned = [];
        try {
            productsOwned = (await this.getAllProducts()).filter(product => (product.creatorId === ownerId));
            return productsOwned;
        } catch (error) {
            console.error("Erro ao buscar produtos do usuário:", error);
            throw new Error("Não foi possível carregar o produto. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async addProduct(product) {
       try {
            const dbRef = ref(rtdb, 'products');
            const newProductRef = await push(dbRef, product);
            await update(newProductRef, { id: newProductRef.key});
            const productWithId = { ...product, id:  newProductRef.key};
            console.log("Produto adicionado com sucesso:", productWithId);
            return productWithId;
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            throw new Error("Não foi possível adicionar o produto. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async updateProduct(product) {
        try {
            console.log("Atualizando produto:", product);
            const dbRef = ref(rtdb, 'products');
            const productRef = child(dbRef, product.id);
            await update(productRef, product);
            console.log("Produto atualizado com sucesso:", product);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw new Error("Não foi possível atualizar o produto. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async removeProduct(productId) {
        const user = User.fromRTDB(Authentication.getLoggedUser());
        const product = await this.getProductById(productId);

        if (!(product.creatorId === user.getId())) {
            throw new Error("Você não tem permissão para excluir esse produto.");
        }

        try {
            const dbRef = ref(rtdb, 'products');
            const productRef = child(dbRef, product.id);
            await remove(productRef, product);
            console.log("Produto removido com sucesso.", product);
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            throw new Error("Não foi possível excluir o produto. Verifique sua conexão e as regras do Firebase.");
        }
    }
}