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
    <div id='Products'>
        {products !== null ? (
            products.map((product, index) => (
                <div id={`ProductItem${index + 1}`} key={index}>
                    <p id='article'>article: {product.productId}</p>
                    <p id='name'>{product.name}</p>
                    <p id='amount'>amount: {product.amount}</p>
                    <p id='price'>{product.price}</p>
                    <button id={`BuyButton${index + 1}`}>Buy</button>
                </div>
            ))
        ) : (
            Array.from({length: products ? products.length : 0}, (_, index) => (
                <div id={`ProductItem${index + 1}`} key={index}></div>
            ))
        )}
    </div>

    <div id='Order'>1</div>
</div>

    );
}