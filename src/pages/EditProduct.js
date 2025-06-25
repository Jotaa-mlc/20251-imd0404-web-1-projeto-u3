import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Authentication } from '../service/Authentication';
import User from '../model/User';
import ProductService from '../service/ProductService';
import ProductForm from '../components/ProductForm';
import Loading from '../components/Loading';

function EditProduct() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productToEdit, setProductToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                setProductToEdit(null);

                const productData = await ProductService.getProductById(productId);
                setProductToEdit(productData);
                if (productData.creatorId) {
                    const user = User.fromRTDB(Authentication.getLoggedUser());
                    if (!(productData.creatorId === user.getId())) {
                        alert("Você não tem permissão para editar esse produto.");
                        navigate("/");
                    }
                }
            } catch (err) {
                setError("Erro ao carregar detalhes do produto.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (productId) {
            fetchProductDetails();
        } else {
            setError("ID do produto não fornecido.");
            setLoading(false);
        }
    }, [productId]);

    const getChangedFields = (originalProduct, newFormData) => {
        const changes = {};
        for (const key in newFormData) {
            if (key === 'id') continue;
            if (key === 'creatorId') continue;
            if (key === 'image' && String(newFormData[key]).startsWith("https://placehold.co")) continue;
            
            const originalValue = String(originalProduct[key]);
            const newValue = String(newFormData[key]);

            if (originalValue !== newValue) {
                if (typeof originalProduct[key] === 'number') {
                    changes[key] = parseFloat(newValue);
                } else {
                    changes[key] = newValue;
                }
            }
        }
        return changes;
    };

    const handleUpdateProduct = async (formData) => {
        try {
            const updatedFields = getChangedFields(productToEdit, formData);

            if (Object.keys(updatedFields).length > 0) {
                await ProductService.updateProduct({...updatedFields, id:formData.id}); 
                alert('Produto atualizado com sucesso!');
                navigate(`/product/${formData.id}`); // Redireciona para a página de detalhes
            } else {
                console.log('Nenhuma alteração detectada. Não há necessidade de atualizar.');
                alert('Nenhuma alteração detectada!');
                navigate(`/product/${formData.id}`); // Ainda redireciona, mas sem atualização no DB
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto. Tente novamente.');
        }
    };

    if (loading) {
        return <Loading msg={"Carregando informações do produto..."} />
    }

    return (
        <ProductForm productToEdit={productToEdit} onSubmitForm={handleUpdateProduct} />
    );
}

export default EditProduct;