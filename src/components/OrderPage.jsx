import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './OrderPage.css'; // Import CSS file
import { Appcontext } from '../AppContext/appcontext';

function OrderPage() {
    const {menuid,setmenuid,user,setuser,restemail,setrestemail} = useContext(Appcontext)
    const [formReady, setFormReady] = useState(false);

    useEffect(() => {
        const menuamount = localStorage.getItem('menuid');
        if (menuamount) {
            setmenuid(JSON.parse(menuamount));
}
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setuser(JSON.parse(storedUser));   }

        const restau = localStorage.getItem('restemail');
        if (restau) {
            setrestemail(JSON.parse(restau));
        }
        if (user && restemail) {
            setFormReady(true);
        }
    }, [setmenuid, setuser, setrestemail]);

    const [formData, setFormData] = useState({
        useremail: user ? user.email : '',
        Restaurantemail: restemail ? restemail : '',
        deliveryAddress: '',
        paymentOption: '',
        amount: menuid ? menuid.amount : '',
        name : menuid ? menuid.name : '',
        category : menuid ? menuid.category :'',
        status: 'Placed'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2000/api/v1/placeorder', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="order-container">
            <h2 className="order-heading">Place Your Order</h2>
            {formReady && (
                <form onSubmit={handleSubmit} className="order-form">
                    <div className="form-group">
                        <label htmlFor="useremail">User Email:</label>
                        <input type="email" id="useremail" name="useremail" placeholder={formData.useremail} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restaurantemail">Restaurant Email:</label>
                        <input type="email" id="restaurantemail" name="restaurantemail" placeholder={formData.Restaurantemail} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restaurantemail">Item Name :</label>
                        <input type="email" id="restaurantemail" name="restaurantemail" placeholder={formData.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restaurantemail">Item Category :</label>
                        <input type="email" id="restaurantemail" name="restaurantemail" placeholder={formData.category} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deliveryAddress">Delivery Address:</label>
                        <textarea id="deliveryAddress" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:  </label>
                        <input type="text" id="amount" name="amount" placeholder={formData.amount} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentOption">Payment Option:</label>
                        <select id="paymentOption" name="paymentOption" value={formData.paymentOption} onChange={handleChange} required>
                            <option value="">Select Payment Option</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                    <button type="submit" className="order-btn" onClick={handleSubmit}>Confirm Order</button>
                </form>
            )}
        </div>
    );
}

export default OrderPage;
