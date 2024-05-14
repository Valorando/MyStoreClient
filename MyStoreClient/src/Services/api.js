import axios from 'axios';

const BASE_URL = 'http://localhost:5143/api/Products';

export const GetAllProducts = async () => {
    try
    {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch(error)
    {
        console.error('Error getting products:', error);
        throw error;
    }
};