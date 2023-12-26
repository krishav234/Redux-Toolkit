import React from 'react';

const formValidation =(e)=>{
e.preventDefault();
}
const AddCar = () => {
  
  return (
    <>
    <div class="login-box">
      <h2>Add Car</h2>
      <form onSubmit={formValidation}>
        <div class="user-box">
          <label for="name">Car Name</label>
          <input name="name" />
          <span class="err"></span>
        </div>
        <div class="user-box">
          <label for="email">Car Brand</label>
          <input name="email" />
          <span class="err"></span>
        </div>
        <div class="user-box">
          <label for="number">Year</label>
          <input name="phone" />
          <div class="err"></div>
        </div>
        <button class="submitbtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  </>
  )
}

export default AddCar