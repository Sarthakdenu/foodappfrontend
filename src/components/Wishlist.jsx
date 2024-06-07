import React, { useContext } from 'react';
import { Appcontext } from '../AppContext/appcontext';
import Item from './Item';
import './Wishlist.css'
function Wishlist() {
  const { wishlistitem } = useContext(Appcontext);

  return (
    <div id='homepage'>
    <div id='wishlistitems'>
      <h2>Wishlist</h2>
      {wishlistitem.map(item => (
        <Item
          key={item._id} 
          itemId={item._id}
          name={item.name}
          category={item.category}
          description={item.description}
          imageUrl={item.imageurl}
        />
      ))}
    </div>
    </div>
  );
}

export default Wishlist;
