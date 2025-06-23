import Product from '../model/Product';
import { rtdb } from '../firebase';
import { ref, get, child } from 'firebase/database';

export default class ProductService {

    static async getAllProducts() {
        try {
            const dbRef = ref(rtdb);
            const snapshot = await get(child(dbRef, 'products'));
            const products = [];
            if (snapshot.exists()) {
                console.log("Dados brutos do Realtime Database:", snapshot.val());
                snapshot.forEach(childSnapshot => {
                    const product = Product.fromRTDB(childSnapshot.key, childSnapshot.val());
                    products.push(product);
                });
            } else {
                console.log("Nenhum produto encontrado no RTDB.");
            }
            
            console.log("Produtos carregados do Realtime Database (instâncias de Product):", products);
            return products;
        } catch (error) {
            console.error("Erro ao buscar produtos do Realtime Database:", error);
            throw new Error("Não foi possível carregar os produtos. Verifique sua conexão e as regras do Firebase.");
        }
    

        // var productsList = [];
        // try {
        //     const response = await fetch(`${firebaseURL}products.json`);
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     const data = await response.json();
        //     if (data) {
        //         var count = 0;
        //         data.forEach(product => {
        //             const newProduct = JSON.parse(JSON.stringify(product));
        //             newProduct.id = count++;
        //             productsList.push(newProduct);
        //         });
        //         return productsList;
        //     }
        //     return [];
        // } catch (error) {
        //     throw new Error('Error fetching products:', error);
        // }
    }

    // static async addProduct(product) {
    //     try {
    //         const response = await fetch(`${firebaseURL}products.json`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(product)
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error adding product:', error);
    //     }
    // }

    // static async updateProduct(id, product) {
    //     try {
    //         const response = await fetch(`${firebaseURL}products/${id}.json`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(product)
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error updating product:', error);
    //     }
    // }

    // static async deleteProduct(id) {
    //     try {
    //         const response = await fetch(`${firebaseURL}products/${id}.json`, {
    //             method: 'DELETE'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error deleting product:', error);
    //     }
    // }
}