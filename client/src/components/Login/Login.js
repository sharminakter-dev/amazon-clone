import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createWithEmailAndPassword, handleFbsignIn, handleGoogleSignIn, handleSignout, resetPassword, signInUserWithEmailAndPassword } from './LoginManager';


const Login = () => {
    //user state
    const [user, setUser] = useState({
        isSignedIn:false,
        name:'',
        email:'',
        password:'',
        photo:'', 
        newUser:false,
        success:false,
        error:''
    });

    // useContext
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname||'/';
    // console.log(location);
    // console.log(from)
    
    const googleSignIn = ()=>{
        handleGoogleSignIn()
        .then(response=>{
            handleResponse(response, true);
        });
    }

    const fbSignIn = ()=>{
        handleFbsignIn()
        .then(res=>{
            handleResponse(res, true);
        })
    }

    const signout = ()=>{
        handleSignout()
        .then(response=>{
            handleResponse(response, false);
        });
    }


    const handleResponse = (response, redirect)=>{
        setUser(response);
        setLoggedInUser(response);
        if (redirect){
            navigate(from, {replace:true});
        }
    }



    // handleBlur
    const handleBlur =(e)=>{
        // console.log(e.target.value);
        let isFieldValid = true;
        if(e.target.name==='email'){
            const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            isFieldValid = regexp.test(e.target.value);
        }
        if(e.target.name==='password'){
            const isPassValid = e.target.value.length>6;
            const passHasNumber = /\d/.test(e.target.value);
            isFieldValid = isPassValid && passHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            // console.log(newUserInfo);
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(user.email, user.password);
        if(user.newUser && user.email && user.password){
            createWithEmailAndPassword(user.name, user.email, user.password)
            .then(response=>{
                handleResponse(response, true);handleResponse(response, true);
            });
        }
        if(!user.newUser && user.email && user.password){
            signInUserWithEmailAndPassword(user.email, user.password)
            .then(response=>{
                handleResponse(response, true);
            });
        }
    }


    
    // console.log(user);
    // console.log(loggedInUser);
    // console.log(user.error)

    return (
        <div style={{textAlign:'center'}}>
            { user.isSignedIn?
                <button onClick={signout}>Sign out</button>:
                <>
                <button onClick={googleSignIn}>Sign in using google</button> 
                <br />
                <button onClick={fbSignIn}>sign in using facebook</button>
                </>
            }
            <br />

            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your Email: {user.email} </p>
                    <img src={user.photo} alt="user_img" />
                </div>
            }
            { !user.isSignedIn && <>
                <h1>Our own authentication</h1>
                <input type="checkbox" name='newUser' onChange={()=>{setUser({...user, newUser:!user.newUser})}} />
                <label htmlFor="newUser">New User</label>
                <form action="" onSubmit={handleSubmit} >
                    {user.newUser && <input type="text" name='name' placeholder='name' onBlur={handleBlur} /> }
                    <br />
                    <input type="text" name="email" placeholder='email' onBlur={handleBlur} />
                    <br />
                    <input type="password" name='password'  placeholder='password' onBlur={handleBlur} />
                    <br />
                    <input type="submit" name=""  value='submit'/>
                </form>
                <a style={{ 
                    textDecoration:'underline', 
                    fontSize:'12px',
                    color:'blue',
                    cursor:'pointer'  
                }} 
                    onClick={resetPassword(user.email)} >reset password?</a>
                <p style={{color:'red'}} >{user.error}</p>
            </> }
            {user?.success && <p style={{color:'green'}}> user {user.newUser?'created':'logged in'} successfully </p> }
        </div>
    );
};

export default Login;
