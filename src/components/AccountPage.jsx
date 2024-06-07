import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './AccountPage.css';
import { Appcontext } from '../AppContext/appcontext';

const AccountPage = () => {
  const [account, setAccount] = useState(null);
  const {user,setuser}= useContext(Appcontext)
  useEffect(() => {
   
    const storeduser = localStorage.getItem('user')
    if(storeduser)
      {
        setuser(JSON.parse(storeduser))
      }
      const email = user.email
    if (email) {
      axios.get(`http://localhost:2000/api/v1/finduser?email=${email}`)
        .then(response => {
          setAccount(response.data.user);
        })
        .catch(err => {
          console.error("There is an error while fetching info", err);
        });
    } else {
      console.error("No email found in localStorage");
    }
  }, []);

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
      <div className="profile-section">
        <img src="data:image/jpeg;base64,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" alt="Profile" className="profile-pic" />
        <h1>{account.username}</h1>
      </div>
      <div className="info-section">
        <h2>Account Information</h2>
        <p><strong>Email:</strong> {account.email}</p>
        <p><strong>Phone:</strong> {account.phone}</p>
        <p><strong>Address:</strong> {account.address}</p>
        <p><strong>Role:</strong> {account.role}</p>
        <h2>Favorites</h2>
        <ul>
          {account.favorites.map((fav, index) => (
            <li key={index}>{fav.name}</li>
          ))}
        </ul>
        <h2>Orders</h2>
        <ul>
          {account.orders.map((order, index) => (
            <li key={index}>Order ID:={order} - {order.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountPage;
