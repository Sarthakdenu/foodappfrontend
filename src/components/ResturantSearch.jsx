import React, { useContext, useState, useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { Appcontext } from '../AppContext/appcontext';

function ResturantSearch() {
  const { Restaurant } = useContext(Appcontext);
  const [searchQuery, setSearchQuery] = useState('enter restuarants');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const filtered = Restaurant.filter(Restaurant =>
      Restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, Restaurant]);

  return (
    <div className='restaurant-search-container'>
      <div id='stylelocation' className='location-header'>
        Find your place <FaLocationDot />
      </div>
      <div className='major-tagline'>
        Discover the Restaurants near you that best describe your taste
      </div>
      <div id='restaurantsearchbox' className='search-box'>
        <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Find the restaurant"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-item">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResturantSearch;
