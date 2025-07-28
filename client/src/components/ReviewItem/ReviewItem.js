import React from 'react';
import { getStoredCart } from '../../utilities/fakedb';

const ReviewItem = (props) => {
    const {key, name, price, img} = props.product;
    const savedCart = getStoredCart();
    const reviewItemStyle ={
        borderBottom:'1px solid lightGrey',
        margin: '0 0 5px 200px',
        paddingBottom:'5px',
    }
    return (
        <div className='review-item' style={reviewItemStyle}>
                <h1>{name}</h1>
                <p>Quantity: {savedCart[key]}</p>
                <p><small>{price}</small></p>
                <br />
                <button className='main-btn' onClick={()=>{props.removePd(key)}}>Remove</button>

        </div>
    );
};

export default ReviewItem;