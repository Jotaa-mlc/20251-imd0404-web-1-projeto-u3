import { ref, push, get } from "firebase/database";
import { rtdb } from '../firebase';
import Purchase from "../model/Purchase";

export default class PurchaseService {
    static async addPurchase(purchase){
        try {
            const dbRef = ref(rtdb, `purchases/${purchase.buyerId}`);
            await push(dbRef, purchase);
            console.log("Compra realizada com sucesso:", purchase);
        } catch (error) {
            console.error("Erro ao processar a compra:", error);
            throw new Error("Não foi possível processar a compra. Verifique sua conexão e as regras do Firebase.");
        }
    }

    static async getPurchasesByUserId(userId) {
        let purchases = [];
        try {
            const dbRef = ref(rtdb, `purchases/${userId}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const purchasesData = snapshot.val()
                for (const key in purchasesData) {
                    if (Object.prototype.hasOwnProperty.call(purchasesData, key)) {
                        const element = purchasesData[key];
                        purchases.push({id: key, ...element});
                    }
                }
                return purchases;
            }
        } catch (error) {
            console.error("Erro ao buscar compras:", error);
            throw new Error("Não foi possível buscar suas compras. Verifique sua conexão e as regras do Firebase.");
        }
    }
}