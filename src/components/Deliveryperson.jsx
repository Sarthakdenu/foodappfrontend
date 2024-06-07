import React, { useContext, useState } from 'react';
import './Deliveryperson.css';
import { FaUserTie, FaPhoneVolume, FaAddressBook } from 'react-icons/fa';
import { MdAttachEmail } from 'react-icons/md';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { Appcontext } from '../AppContext/appcontext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Deliveryperson() {
  const [display, setDisplay] = useState(true);
  const { dpsignupdata, setdpsignupdata, dplogindata, setdplogindata } = useContext(Appcontext);

  

  function handleSignupChange(e) {
    const { name, value } = e.target;
    setdpsignupdata(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setdplogindata(prev => ({
      ...prev,
      [name]: value
    }));
  }
  
  const handleOnClick= async(e)=>
    {
        e.preventDefault();
        
        const response= await fetch('http://localhost:2000/api/v1/createdeliveryperson',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(
                {
                    name:dpsignupdata.username,
                    email:dpsignupdata.email,
                    password:dpsignupdata.password,
                    currentlocation:dpsignupdata.currentlocation,
                    phone:dpsignupdata.phone,
                    availability:true
                }
            )
        })
        const data = await response.json();
        if (response.ok && data.success) {
          toast.success('Delivery Person register in successfully');
          setDisplay(false)
        } else {
          toast.error('Failed to register');
        }
      
    }
  

  return (
    <div className='container'>
      <div id='deliverypersonpage'>
      <ToastContainer />
        <h2>Act as DeliveryPerson</h2>
        {display ? (
          <>
           <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1"><FaUserTie /></span>
  <input type="text" className="form-control" placeholder="Enter the Username" aria-label="name" name="username" value={dpsignupdata.username} onChange={handleSignupChange} />
</div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><MdAttachEmail /></span>
              <input type="email" className="form-control" placeholder="Enter the email" aria-label="Email" name="email" value={dpsignupdata.email} onChange={handleSignupChange} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
              <input type="password" className="form-control" placeholder="Create password" aria-label="Password" name="password" value={dpsignupdata.password} onChange={handleSignupChange} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><RiLockPasswordLine /></span>
              <input type="password" className="form-control" placeholder="Confirm password" aria-label="Confirm Password" name="confirmPassword" value={dpsignupdata.confirmPassword} onChange={handleSignupChange} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><FaPhoneVolume /></span>
              <input type="number" className="form-control" placeholder="Enter the phone number" aria-label="Phone Number" name="phone" value={dpsignupdata.phone} onChange={handleSignupChange} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><FaAddressBook /></span>
              <input type="text" className="form-control" placeholder="Enter the current location" aria-label="Address" name="currentlocation" value={dpsignupdata.currentlocation} onChange={handleSignupChange} />
            </div>
            <button type="button" className="btn btn-success" onClick={handleOnClick}>Submit Details</button>
          </>
        ) : (
          <>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><MdAttachEmail /></span>
              <input type="email" className="form-control" placeholder="Enter the email" aria-label="Email" name="email" value={dplogindata.email} onChange={handleLoginChange} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
              <input type="password" className="form-control" placeholder="Enter the password" aria-label="Password" name="password" value={dplogindata.password} onChange={handleLoginChange} />
            </div>
            <button type="button" className="btn btn-success" onClick={handleOnClick}>Login</button>
          </>
        )}
      </div>
      <div id='termsconditions'>
        <h2>Terms and Conditions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed lobortis ligula. Proin malesuada mauris vel nisi pretium, non ultrices sem congue. Sed nec risus eget felis ullamcorper scelerisque. Vestibulum convallis bibendum lectus, ac finibus est tempus ac. Nullam porttitor ante eu magna viverra, a aliquam metus dictum. Nullam id justo velit. Vestibulum consectetur, purus a tincidunt convallis, arcu eros vehicula odio, a vehicula tortor erat nec neque. Integer quis orci et nisi euismod euismod. Mauris vulputate lacus at felis congue, id vestibulum dolor varius. Curabitur eget urna id justo posuere vestibulum. Integer dapibus nisl et felis fringilla, in elementum elit fermentum.
        </p>
        <p>
          Curabitur convallis, mauris ut pellentesque pharetra, nulla sem malesuada est, eu interdum elit lacus ac erat. Integer tincidunt nisi at libero efficitur, at gravida ligula dapibus. Duis efficitur risus ac purus posuere facilisis. Pellentesque sit amet vestibulum sapien. Vestibulum eget eros ac urna vulputate fermentum nec nec tortor. Cras vitae felis vel turpis vehicula varius in non lorem. Nam bibendum lectus quam, ut sodales quam cursus non. Sed elementum tortor at nulla bibendum, sed fringilla leo convallis.
        </p>
        <div className="terms-accept">
          <input type="checkbox" id="acceptTerms" name="acceptTerms" />
          <label htmlFor="acceptTerms">I accept the terms and conditions</label>
        </div>
      </div>
    </div>
  );
}

export default Deliveryperson;
