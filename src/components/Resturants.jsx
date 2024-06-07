import React, { useContext, useState } from 'react';
import './Resturants.css';
import { Appcontext } from '../AppContext/appcontext';
import { IoIosRestaurant } from "react-icons/io";
import { MdOutlineMailLock } from "react-icons/md";
import { FaBlenderPhone } from "react-icons/fa";
import { MdOutlineWifiPassword } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMapLocationDot } from "react-icons/fa6";

function Restaurants() {
  const { Restaurant, restaurantdata, setrestaurantdata } = useContext(Appcontext);
  console.log(Restaurant);
  const [email,setemail] = useState('')

  const handleonsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/api/v1/createrestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: restaurantdata.name,
          phone: restaurantdata.phone,
          address: restaurantdata.address,
          email: restaurantdata.email,
          imageurl: restaurantdata.imageurl,
          password: restaurantdata.password
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Restaurant created successfully');
      } else {
        toast.error('Failed to create Restaurant');
      }
    } catch (error) {
      toast.error('Error during the API call');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setrestaurantdata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const {restemail,setrestemail} = useContext(Appcontext)
  // function handleonbuy(e) {
  //   e.preventDefault();
  //   const selectedRestaurantEmail = restaurantdata.email;
  //   setrestemail({ restemail:[selectedRestaurantEmail] });
  //   console.log(selectedRestaurantEmail)
  //   localStorage.setItem('restemail', JSON.stringify(restemail));
  //   setrestemail({ restemail: '' });
  
  //   toast.success('Successfully selected restaurant');
  // }
  function handleonbuy(e, selectedRestaurantEmail) {
    e.preventDefault();
    setrestemail(selectedRestaurantEmail);
    console.log(selectedRestaurantEmail,restemail)
    localStorage.setItem('restemail', JSON.stringify(selectedRestaurantEmail));
  
    toast.success('Successfully selected restaurant');
  }
  
  
  return (
    <div id='resturantcompo'>
      <ToastContainer />
      <div id='createresturants'>
        <h2>Create Restaurant Profile</h2>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><IoIosRestaurant /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Restaurant Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="name"
            value={restaurantdata.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><MdOutlineMailLock /></span>
          <input
            type="email"
            className="form-control"
            placeholder="Restaurant Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            name="email"
            value={restaurantdata.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><MdOutlineWifiPassword /></span>
          <input
            type="password"
            className="form-control"
            placeholder="Restaurant Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            name="password"
            value={restaurantdata.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><FaMapLocationDot /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Restaurant Address"
            aria-label="Address"
            aria-describedby="basic-addon1"
            name="address"
            value={restaurantdata.address}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><FaBlenderPhone /></span>
          <input
            type="number"
            className="form-control"
            placeholder="Restaurant Phone"
            aria-label="Phone"
            aria-describedby="basic-addon1"
            name="phone"
            value={restaurantdata.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><IoMdPhotos /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Restaurant Image URL"
            aria-label="Image URL"
            aria-describedby="basic-addon1"
            name="imageurl"
            value={restaurantdata.imageurl}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleonsubmit}>Create Restaurant</button>
      </div>
      <div className='restaurants-container'>
        <h1>Available Restaurants</h1>
        {Restaurant && Restaurant.length > 0 ? (
          Restaurant.map((restaurant, index) => (
            <div className='restaurant-card' key={index}>
              <div className='restaurant-img'>
                <img src={restaurant.imageurl || 'default-image-url'} alt={restaurant.name} />
              </div>
              <div className='restaurant-info'>
                <div className='restaurant-details'>
                  <h2>{restaurant.name}</h2>
                  <p>Email: {restaurant.email}</p>
                  <p>Contact: {restaurant.phone}</p>
                  <p>Address: {restaurant.address}</p>
                  <p>Menu Items: {restaurant.menuitems.join(', ')}</p>
                  <p>Ratings: ★★★★☆</p>
                </div>
      
                <div className='restaurant-actions'>
  <button className='favorite-button'>❤️ Favorite</button>
  <button className='explore-button'>Explore Menu Items</button>
  <button className='previous-orders-button' onClick={(e) => handleonbuy(e, restaurant.email)}>Place order with this</button>
</div>

              </div>
            </div>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
    </div>
  );
}

export default Restaurants;
