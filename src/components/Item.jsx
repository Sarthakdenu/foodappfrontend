import React, { useContext, useState } from 'react';
import { FcLike } from "react-icons/fc";
import { Appcontext } from '../AppContext/appcontext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Item({ name, category, description, imageUrl , Itemid, price}) {

  const buttonStyle = {
    backgroundColor: 'white',
    border: '2px solid #ddd',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    color: 'red'
  };

    
    const handleonclick = async (e) => {
      
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:2000/api/v1/addtowishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             id:Itemid
          }),
        });
  
        const data = await response.json();
        if (response.ok && data.success) {
          toast.success('added to wishlist');
        } else {
          toast.error('Failed to add');
        }
      } catch (err) {
        toast.error('Error during login');
      }
    };

   const {menuid, setmenuid}=useContext(Appcontext)
   function handleonbuy(e,price,name,category) {
    e.preventDefault();
    localStorage.setItem('menuid', JSON.stringify({amount :price,name:name,category:category}));
    setmenuid({ id: Itemid , amount : price, category:category,name:name});
    toast.success('Item added to cart');
  };
   
  return (
    <div id='menuitem'>
       <ToastContainer />
      <div id='imgmenuitem'>
        <img src={imageUrl} alt={name} />
      </div>
      <div id='wishlistbutton'></div>
      <div id='description'>
        <div id='menuitemname'>
          {name} <button style={buttonStyle} onClick={handleonclick} ><FcLike /></button>
        </div>
        <div id='category'>
          {category}
        </div>
        <div id='itemdescription'>
          {description}
        </div>
        <div>
          Order from: Restaurant Name
        </div>
      </div>
      <div id='orderbuttons'>
        <button type="button" className="btn btn-success">Add to Cart</button>
        <button type="button" className="btn btn-success" onClick={(e) => handleonbuy(e, price,name,category)}>Buy at Rs:{price}</button>
      </div>
    </div>
  );
}

export default Item;
