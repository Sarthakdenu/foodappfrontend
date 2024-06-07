import React, { useContext, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { Appcontext } from '../AppContext/appcontext';
import Item from './Item';

function FoodFilter() {
  const { menuItems } = useContext(Appcontext);
  const {filterData, setFilterData} = useContext(Appcontext)
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');

  const handleFilter = () => {
    const filteredItems = menuItems.filter(item => {
      const isCategoryMatch = category ? item.category.toLowerCase().includes(category.toLowerCase()) : true;
      const isPriceMatch = minPrice ? item.price >= parseFloat(minPrice) : true;
      return isCategoryMatch && isPriceMatch;
    });
    setFilterData(filteredItems);
    setDisplay(true);
  };

  return (
    
    <div className="food-filter">
      <h2 className="tagline">Discover Delicious Food... <FaFilter /></h2>
      <div className="category-input">
        <input
          type="text"
          placeholder="Enter category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Minimum Price ..."
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <button className="filter-button" onClick={handleFilter}>Filter</button>
    </div>
    
  );
}

export default FoodFilter;
