import React, { useContext } from 'react';
import { useLocation, Navigate  } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const [loggedInUser] = useContext(UserContext);
    return (
        <div>
            {loggedInUser.email?(
                children
            ):(
                <Navigate to='/login' state={{from: location}} replace ></Navigate>
            )
            }
        </div>
    );
};

export default PrivateRoute;