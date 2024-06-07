import React from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import Restaurants from './components/Resturants';
import Wishlist from './components/Wishlist';
import Deliveryperson from './components/Deliveryperson';
import OrderPage from './components/OrderPage';
import AccountPage from './components/AccountPage';
function App() {
  return (
    
     <Router>
      <div >
        <nav id='navbar'>
          <ul>
            <li>
              <Link to="/">LOGIN</Link>
            </li>
            <li>
              <Link to="/home">HOME</Link>
            </li>
            <li>
              <Link to="/contact">Restuarant</Link>
            </li>
            <li>
              <Link to="/wislist">Wishlist</Link>
            </li>
            <li>
              <Link to="/deliveryperson">DeliveryPerson</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>
        

         <Routes>
        <Route path="/"  element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/contact' element={<Restaurants />}/>
        <Route path='/wislist' element={<Wishlist/>}/>
        <Route path='/deliveryperson' element={<Deliveryperson/>}/>
        <Route path='/order'element={<OrderPage/>}/>
        <Route path='/account' element={<AccountPage />}/>
        </Routes>
        <div class="footer">
        <p>&copy; 2024 Your App. All rights reserved.</p>
    </div>
      </div>
    </Router>
    
  )
}

export default App
