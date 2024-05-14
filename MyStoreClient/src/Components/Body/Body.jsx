import './Body.css';
import React, { useState, useEffect } from 'react';
import { GetAllProducts } from '../../Services/api';


export default function Body()
{
    const [products, setProducts] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData(); 
    }, []);

    return (
        <div className='Body'>
            <div className='Products'>
                {products !== null ? (
                    <div>
                        {products.map((product, index) => (
                            <div className='ProductItem' key={index}>
                                <p>Product ID: {product.productId}</p>
                                <p>Name: {product.name}</p>
                                <p>Amount: {product.amount}</p>
                                <p>Price: {product.price}</p>
                                <button id='buy'>Buy</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    'Loading...'
                )}
            </div>
            <div className='Order'>1</div>
        </div>
    );
}