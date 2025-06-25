import './../css/new-product.css';
import { Authentication } from '../service/Authentication';
import User from '../model/User';
import ProductService from '../service/ProductService';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';


function NewProduct() {
    const navigate = useNavigate();

    const handleNewProductSubmit = async (formData) => {
        const creator = User.fromRTDB(Authentication.getLoggedUser());
        const creatorId = creator.getId();
        formData.creatorId = creatorId;
        
        try{
            await ProductService.addProduct(formData);
        } catch (error) {
            alert(error);
        } finally {
            alert("Produto cadastrado com sucesso.", formData);
            navigate("/my-products");
        }
    }

    return (
        <ProductForm onSubmitForm={handleNewProductSubmit}/>
    );
}

export default NewProduct;