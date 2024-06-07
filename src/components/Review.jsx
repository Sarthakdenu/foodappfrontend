import React from 'react'
import './Review.css'
function Review() {
  return (
    <div>
       <section id="contact">
      <p>C O N T A C T   U S!</p>
          <div id="contact-box">
            <form action="">  
              <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" name="name" id="nameii" placeholder="enter your name" required></input> </div>
              <div class="form-group">
                  <label for="name">Email:</label>
                  <input type="email" name="name" id="name" placeholder="enter your email" required></input>  </div>
              <div class="form-group">
                  <label for="name">Number:</label>
                  <input type="number" name="name" id="name" placeholder="enter your phone number" required></input> </div>
              <div class="form-group">
                  <label for="name">Address:</label>
                 <textarea name="message" id="message" cols="30" rows="10" placeholder="enter the adress"></textarea>
              </div>
             
              </form>
          </div>
     
    </section>

    </div>
  )
}

export default Review
