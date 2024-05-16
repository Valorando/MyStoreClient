import axios from 'axios';

const GET_PRODUCTS_URL = 'http://localhost:5143/api/Products';
const ADD_ORDER_URL = 'http://localhost:5143/api/Orders';

export const GetAllProducts = async () => {
    try
    {
        const response = await axios.get(GET_PRODUCTS_URL);
        return response.data;
    } catch(error)
    {
        console.error('Error getting products:', error);
        throw error;
    }
};

export const AddOrder = async (orderId, orderDate, firstName, secondName, phoneNumber, productName, amount) => {
    try
    {
        await axios.post(`${ADD_ORDER_URL}`, {orderId, orderDate, firstName, secondName, phoneNumber, productName, amount});
    }catch(error)
    {
        console.error('Error adding order:', error);
        throw error;
    }
};