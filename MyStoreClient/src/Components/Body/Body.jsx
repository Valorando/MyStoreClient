import './Body.css';
import React, { useState, useEffect } from 'react';
import { GetAllProducts, AddOrder } from '../../Services/api';

export default function Body() {
    const [products, setProducts] = useState(null);
    const [orderId, setOrderId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState(0);

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

    const generateOrderId = () => {
        const time = new Date().getTime().toString();
        let length = time.length;
        return time.slice(length - 6, length);
    };

    const displayProducts = () => {
        document.getElementById('Products').style.visibility = 'visible';
        document.getElementById('Order').style.visibility = 'hidden';
        document.getElementById('Message').style.visibility = 'hidden';
    };

    const displayOrder = (product) => {
        document.getElementById('Products').style.visibility = 'hidden';
        document.getElementById('Order').style.visibility = 'visible';
        document.getElementById('Message').style.visibility = 'hidden';

        setProductName(product.name); 
        setOrderId(generateOrderId());
    };

    const displayMessage = async () => {
        document.getElementById('Products').style.visibility = 'hidden';
        document.getElementById('Order').style.visibility = 'hidden';
        document.getElementById('Message').style.visibility = 'visible';

        const currentDate = new Date();
        const orderDate = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}  ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        try
        {
            await AddOrder(parseInt(orderId, 10), orderDate, firstName, secondName, phoneNumber, productName, parseInt(amount, 10));
        }catch(error)
        {
            alert('Error: '+ error);
        }
    };

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
                            <button id={`BuyButton${index + 1}`} onClick={() => displayOrder(product)}>Buy</button>
                        </div>
                    ))
                ) : (
                    Array.from({ length: products ? products.length : 0 }, (_, index) => (
                        <div id={`ProductItem${index + 1}`} key={index}></div>
                    ))
                )}
            </div>

            <div id='Order'>
                <div id='orderform'>
                    <h2>Placing an order</h2>
                    <h3>Personal data:</h3>
                    <label id='l1' htmlFor="firstname">First name: </label> <input id='firstname' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br />
                    <label id='l2' htmlFor="secondname">Second name: </label> <input id='secondname' type="text" value={secondName} onChange={(e) => setSecondName(e.target.value)} /><br />
                    <label id='l3' htmlFor="phonenumber">Phone number: </label> <input id='phonenumber' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /><br />
                    <h3>Information about order:</h3>
                    <label id='l4'>Order number: <span id='Id'>{orderId}</span></label><br />
                    <label id='l5'>Product name: <span id="productName">{productName}</span></label><br />
                    <label id='l6'>Product price(for 1 unit): <span id="productPrice"></span></label><br />
                    <label id='l7' htmlFor="amount2">Amount:</label> <input id='amount2' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /><br />
                    <button id='send' onClick={displayMessage}>Send an order</button> <button id='back' onClick={displayProducts}>Back to products</button>
                </div>
            </div>

            <div id='Message'>
                <h1>Thanks for purchase, a store employee will contact you within 10 minutes.</h1><br />
                <h1>Your order number: <span id='Id'>{orderId}</span></h1><br />
                <h1>Remember it or write it down in case you need to contact the seller</h1><br />
                <button id='back1' onClick={displayProducts}>Back to products</button>
            </div>
        </div>
    );
}
