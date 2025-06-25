import '../css/purchases.css'
import PurchaseService from "../service/PurchaseService";
import { Authentication } from "../service/Authentication";
import { useState, useEffect } from 'react';
import User from "../model/User";
import Loading from "../components/Loading";
import PurchaseCard from '../components/PurchaseCard';

function Purchases() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            const user = User.fromRTDB(Authentication.getLoggedUser());
            try {
                const purchases = await PurchaseService.getPurchasesByUserId(user.getId());
                setPurchases(purchases);
                console.log(purchases);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) { return <Loading msg={"Carregando suas compras..."} /> }
    if (error) { return <div id="purchases-page"><h1>Erro: {error}</h1></div> }

    return (
        <div id="purchases-page">
            <div className='purchases-container'>
                <div className="sub-header">
                        <h2>Minhas Compras</h2>
                </div>
                <div className='purchases-list'>
                    {purchases.map(purchase => (
                        <PurchaseCard key={purchase.id} purchase={purchase}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Purchases;