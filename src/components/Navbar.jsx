import React from 'react'
import { GiFruitBowl } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
function Navbar() {
  return (
    <div id='mainnavbar'>

      <div id='namelogo'>
      <GiFruitBowl />
        SpeedyEats...
      </div>
      <div id='navbaroptions'>
        <ul>
            <li><a href="">Food</a></li>
            <li><a href="">Delivery</a></li>
            <li><a href="">Order</a></li>
            <li><a href="">Restaurants</a></li>
            <li><a href="">About</a></li>
        </ul>
        <div id='searchbarpage'>
        <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="find your delicious-food" aria-label="Search"></input>
        <button class="btn btn-warning" type="submit">Search</button>
      </form>
        </div>
        <div id='wishlistcart'>
            <ul>
                <li><FaCartShopping /></li>
                <li><FaHeartCircleCheck /></li>
            </ul>
        </div>
        <div id='updateaccount'>
        <MdAccountCircle />
        <button type="button" className="btn btn-warning" >Update Account</button> 
        </div>
      </div>
    </div>
  )
}

export default Navbar
