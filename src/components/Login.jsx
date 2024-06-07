import React, { useState, useContext } from 'react';
import { FaUserTie, FaPhoneVolume, FaFacebook, FaAddressBook, FaGoogle } from 'react-icons/fa';
import { MdAttachEmail } from 'react-icons/md';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from "react-icons/fa";
import { Appcontext } from '../AppContext/appcontext';

function Login() {
  const { loginData, setLoginData, signupData, setSignupData ,user,setuser} = useContext(Appcontext);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   
  const handleOnLogin = () => {
    setIsSignup(false);
  };

  const handleOnSignup = () => {
    setIsSignup(true);
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData({ ...loginData, [name]: value });
      setuser({...user,[name]:value})
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupData.username, signupData.email, signupData.password, signupData.role, signupData.phone, signupData.confirmPassword, signupData.address);
    try {
      const response = await fetch('http://localhost:2000/api/v1/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          role: signupData.role,
          phone: signupData.phone,
          address: signupData.address,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('User created successfully');
      } else {
        toast.error('Failed to create user');
      }
    } catch (error) {
      toast.error('Error during the API call');
    }
  };

  const handleloginsubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/api/v1/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('User logged in successfully');
        localStorage.setItem('user',JSON.stringify(user))
        setuser(
          {
            email:''
            ,username: ''
          }
        )
        setIsLoggedIn(true);
      } else {
        toast.error('Failed to login');
      }
    } catch (err) {
      toast.error('Error during login');
    }
  };

  if (isLoggedIn) {
    toast.success('User logged in successfully');
    return <Navigate to="/home" />;
  }

  return (
    <div id='mainloginpage'>
      <ToastContainer />
      <div id='headingbox'>
        <div id='heads'>SpeedyEats</div>
        <div className="food-phrase">
          <div className="delicious">Delicious</div>
          <div className="food">food</div>
          <div className="at">at</div>
          <div className="your">your</div>
          <div className="doorstep">doorstep...</div>
        </div>
        <div id='headsbutton'>
        <button type="button" className="btn btn-warning">Premium  <FaArrowRight /> </button>
        <button type="button" className="btn btn-warning">Exclusive <FaArrowRight /> </button>
        </div>
      </div>
      <div id='loginwinodow'>
        <div id='loginsignupoptions'>
          <div onClick={handleOnLogin}>Login</div>
          <div onClick={handleOnSignup}>Signup</div>
        </div>
        {!isSignup ? (
          <>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><MdAttachEmail /></span>
              <input type="email" className="form-control" placeholder="Enter the email" aria-label="Email" name="email" value={loginData.email} onChange={(e) => handleChange(e, 'login')} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
              <input type="password" className="form-control" placeholder="Enter the password" aria-label="Password" name="password" value={loginData.password} onChange={(e) => handleChange(e, 'login')} />
            </div>
          </>
        ) : (
          <>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><FaUserTie /></span>
              <input type="text" className="form-control" placeholder="Enter the Username" aria-label="Username" name="username" value={signupData.username} onChange={(e) => handleChange(e, 'signup')} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><MdAttachEmail /></span>
              <input type="email" className="form-control" placeholder="Enter the email" aria-label="Email" name="email" value={signupData.email} onChange={(e) => handleChange(e, 'signup')} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
              <input type="password" className="form-control" placeholder="Create password" aria-label="Password" name="password" value={signupData.password} onChange={(e) => handleChange(e, 'signup')} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><RiLockPasswordLine /></span>
              <input type="password" className="form-control" placeholder="Confirm password" aria-label="Confirm Password" name="confirmPassword" value={signupData.confirmPassword} onChange={(e) => handleChange(e, 'signup')} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><FaPhoneVolume /></span>
              <input type="number" className="form-control" placeholder="Enter the phone number" aria-label="Phone Number" name="phone" value={signupData.phone} onChange={(e) => handleChange(e, 'signup')} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><FaAddressBook /></span>
              <input type="text" className="form-control" placeholder="Enter the address" aria-label="Address" name="address" value={signupData.address} onChange={(e) => handleChange(e, 'signup')} />
            </div>
            <select className="form-select" aria-label="Role" name="role" value={signupData.role} onChange={(e) => handleChange(e, 'signup')}>
              <option value="" disabled>Select the Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="delivery_person">Delivery Person</option>
            </select>
          </>
        )}
        <div id='submitbutton'>
          {isSignup ? <button type="button" className="btn btn-danger" onClick={handleSubmit}>Submit</button> : null}
          {!isSignup ? <button type="button" className="btn btn-danger" onClick={handleloginsubmission}>Submit</button> : null}
        </div>
        <div id='extralogin'>
          <button type="button" className="btn btn-success">Sign in with Google <FaGoogle /></button>
          <button type="button" className="btn btn-primary">Sign in with Facebook <FaFacebook /></button>
        </div>
      </div>
    </div>
  );
}

export default Login;
