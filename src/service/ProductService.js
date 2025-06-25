import Product from '../model/Product';
import { rtdb } from '../firebase';
import { ref, get, set, push, remove, child } from 'firebase/database';

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

    static async addProduct(product) {
       try {
                const dbRef = ref(rtdb, 'products');
                const productId = await push(dbRef, product);
                
                product.id = productId;
                console.log("Produto adicionado com sucesso:", product);
            } catch (error) {
                console.error("Erro ao adicionar produto:", error);
                throw new Error("Não foi possível adicionar o produto. Verifique sua conexão e as regras do Firebase.");
            }
    }
}