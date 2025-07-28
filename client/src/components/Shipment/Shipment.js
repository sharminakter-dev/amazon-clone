import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './shipment.css'
import { UserContext } from '../../App';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';


const Shipment = ()=>{

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log(loggedInUser);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
      // console.log('Form submitted', data);
      const savedCart = getStoredCart();
      // console.log(savedCart);
      const orderDetails = {...loggedInUser, products:savedCart, shipment:data, orderTime: new Date()};
        // console.log(orderDetails);
      fetch('http://localhost:5000/addOrder',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(orderDetails)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data){
          clearTheCart();
          alert('Your order has been placed successfully');
        }
      })
      .catch(err=>{console.log(err)});
    }
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className='ship-form' > 

        {/* include validation with required or other standard HTML validation rules */}
        <input defaultValue={loggedInUser.name}  {...register("name", { required: true })} placeholder='your name' />
        <input defaultValue={loggedInUser.email}   {...register("email", { required: true })} placeholder='your email' />
        <input {...register("address", { required: true })} placeholder='your address' />
        <input {...register("phone", { required: true })} placeholder='your phone no' />
        
        {/* errors will return when field validation fails  */}
        {errors.name && <span className='error'>This field is required</span>}
        {errors.email && <span className='error'>Email is required</span>}
        {errors.address && <span className='error'>Address is required</span>}
        {errors.phone && <span className='error'>Phone number is required</span>}
        <input type="submit" />
      </form>
    );
}

export default Shipment;