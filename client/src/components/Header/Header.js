import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log(loggedInUser)
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                {/* <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a> */}
                <Link to="/shop"> Shop </Link>
                <Link to="/review"> Order Review </Link>
                <Link to="/inventory"> Manage Inventory </Link>
                {
                    loggedInUser.isSignedIn && <Link onClick={()=>{setLoggedInUser({})}}> Sign Out</Link>
                }
                
            </nav>
        </div>
    );
};

export default Header;