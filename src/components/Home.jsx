import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import ResturantSearch from './ResturantSearch'
import Menu from './Menu'
import FoodFilter from './FoodFilter'
import OffersBox from './OffersBox'
import Item from './Item'
import { Appcontext } from '../AppContext/appcontext'
import Extrafunctionality from './Extrafunctionality'
import Review from './Review'

function Home() {
  const {filterData,user,setuser}=useContext(Appcontext)
  useEffect(()=>
    {
      const storeduser = localStorage.getItem('user')
      if(storeduser)
        {
          setuser(JSON.parse(storeduser))
        }
    },[])
  return (
    <div>
      <Navbar/>
      
      <div id='homebox'>
    <div id='homepage'>
        
      welcome to homepage my dear {user ? user.email : 'Guest'}!
      <div id='seacrhes'>
      <ResturantSearch/>
      <FoodFilter/>
      <OffersBox/>
      </div>
      <div id='filterdata'>
        
      {filterData.map(item => (
            <Item
              key={item._id}
              itemId={item._id}
              name={item.name}
              category={item.category}
              description={item.description}
              imageUrl={item.imageurl}
              price= {item.price}
            />
          ))}
      </div>
      <h1>Menu FastFood ::</h1>
     <Menu category={'fastfood'}/>
     <h1>Sweets : </h1>
      <Menu category={'sweets'}/>
      <h1>Bevrages :</h1>
      <Menu category={'bevrages'}/>
      <Extrafunctionality />
      <Review/>
    
    </div>
    </div>
    </div>
  )
}

export default Home
