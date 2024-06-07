import React, { useContext } from 'react';

import Item from './Item';
import { Appcontext } from '../AppContext/appcontext';

function Menu({ category }) {
  const { menuItems } = useContext(Appcontext);

  if (!Array.isArray(menuItems)) {
    return <div>Error: menuItems is not an array</div>;
  }

  const filteredItems = menuItems.filter(item => item.category === category);

  return (
    <div className="menu-container">
      {filteredItems.map(item => (
        <Item
          Itemid={item._id}
          name={item.name}
          category={item.category}
          description={item.description}
          imageUrl={item.imageurl}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default Menu;