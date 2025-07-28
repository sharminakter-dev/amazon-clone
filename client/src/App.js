import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  console.log('API KEY:', process.env.REACT_APP_apiKey);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="App">
       <Router>
          <Header/> 
          <Routes >
            <Route>
              <Route path='/shop' element={<Shop/>}/>
              <Route path='/review' element={<Review/>}/>
              <Route path='/inventory' element={
                <PrivateRoute>
                  <Inventory/>
                </PrivateRoute>
              }/>  
              <Route path="/" element={<Shop/>}/> 
              <Route path="/product/:productKey" element={<ProductDetails/>}/>   
              <Route path="/shipment" element={
                <PrivateRoute>
                  <Shipment/>
                </PrivateRoute>
              }/>   
              <Route path="/login" element={<Login/>}/>   
              <Route path='/*' element={<NotFound/>} />  
            </Route>
          </Routes>
       </Router>
      
    </UserContext.Provider>
  );
}

export default App;
