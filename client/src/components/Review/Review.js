import React, { useEffect, useState } from 'react';
import { getStoredCart, deleteFromDb } from '../../utilities/fakedb';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import orderSuccess from '../../images/giphy.gif';
import { useNavigate } from "react-router";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const navigate = useNavigate();

    const savedCart = getStoredCart();
    const productKeys = Object.keys(savedCart);
    
    const removePd= (key)=>{
        // console.log('remove', key);
        const newCart = cart.filter(pd=>pd.key!==key);
        setCart(newCart);
        deleteFromDb(key)
    }
    

    useEffect(()=>{
        fetch('http://localhost:5000/productsByKeys',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
        .catch(err=>console.log(err));
    },[])

    const handleProceedOrder = ()=>{
        navigate('/shipment');
        // setCart([])
        // setOrderPlaced(true);
        // clearTheCart();
    };

    let thankYou;
    if(orderPlaced){
        thankYou =(<div>
            <h3 style ={{ textAlign:'center'}}>Thank You for shopping</h3>
            <img src={orderSuccess} width={'25%'} style={{display: 'block', margin: 'auto'}}></img>
            </div>
        )
    }

    return (
        
        <div className='order-container'>
           <div className="product-container">
                {
                    cart.map(pd=><ReviewItem product={pd} key={pd.key} removePd={removePd} ></ReviewItem>)
                }
                {  
                    thankYou
                }
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <button className='main-btn' onClick={handleProceedOrder}>Proceed Checkout</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;