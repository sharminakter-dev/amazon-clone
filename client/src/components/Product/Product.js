import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const {img,name,seller,price,stock} = props.product
    // console.log( props)
    // console.log( props.product);
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div style={{marginLeft:'3rem'}}>
                <h3 className='product-name'> {name} </h3>
                <br />
                <p>by:<small>{seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button className='main-btn' onClick={()=>props.handleAddProduct(props.product)}>
                <FontAwesomeIcon icon={faShoppingCart} />
                    add to cart</button>}
            </div>
        </div>
    );
};

export default Product;