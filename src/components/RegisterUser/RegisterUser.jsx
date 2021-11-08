import React, {useState} from 'react';

const RegisterUser = (props) => {
    const [registerUser, setRegisterUser] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        zip_code: ""
    })
  
    const handleChange = (event) => {
      setRegisterUser(previousState => (
        {...previousState,
        [event.target.name] : event.target.value}
      ));
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.registerUser(registerUser);
  
    }
  
    return(
      <div>
        <div className = "Register-Container">
          
        <form action="" onSubmit={handleSubmit} >
          <label htmlFor="">User Name</label>
          <input className = "Register-Input" name="username" value={registerUser.username} onChange={handleChange} type="text"/>
          <br/>
          <label htmlFor="">Password</label>
          <input className = "Register-Input" name="password" value={registerUser.password} onChange={handleChange} type="text"/>
          <br/>
          <label htmlFor="">Email</label>
          <input className = "Register-Input" name="email" value={registerUser.email} onChange={handleChange} type="text"/>
          <br/>
          <label htmlFor="">First Name</label>
          <input className = "Register-Input" name="first_name" value={registerUser.first_name} onChange={handleChange} type="text"/>
          <br/>
          <label htmlFor="">Last Name</label>
          <input className = "Register-Input"  name="last_name" value={registerUser.last_name} onChange={handleChange} type="text"/>
          <br/>
          <label htmlFor="">Address</label>
          <input className = "Register-Input" name="address" value={registerUser.address} onChange={handleChange} type="text"/>
          <br/>
          <label htmlFor="">Zipcode</label>
          <input className = "Register-Input" name="zip_code" value={registerUser.zip_code} onChange={handleChange} type="text"/>
          <br/>
          <button type="submit">Create Account</button>
        </form>
        </div>
      </div>
    )
  }
  
  export default RegisterUser;