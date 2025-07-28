import React from 'react';
import { getStoredCart } from '../../utilities/fakedb';


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);

    const savedCart = getStoredCart();
    // console.log(savedCart);
    const totalPrice =  cart.reduce((oldPrice,prd)=>oldPrice+prd.price*savedCart[prd.key],0);

    let shipping = 0;
    if(totalPrice>200){
        shipping = 0;
    }else if(totalPrice>100){
        shipping = 4.99;
    }else if(totalPrice>0){
        shipping = 12.99
    }

    const tax = (totalPrice/10);
    const formatNumber =num=>{
        const precision  = num.toFixed(2);
        return Number(precision)
    }
    const grandTotal = formatNumber(totalPrice + shipping + tax); 
    return (
        <div>
            <h4>Order summery</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Items Price:	${formatNumber(totalPrice)}</p>
            <p>Shipping & Handling:	${shipping}</p>
            <p>Tax + Vat :	${formatNumber(tax)}</p>
            <p>Order Total:	${grandTotal}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;