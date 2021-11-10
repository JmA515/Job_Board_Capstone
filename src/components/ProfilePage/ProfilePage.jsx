import React, {useState} from 'react';
// import axios from 'axios';

const ProfilePage = (props) => {
    const [editProfile, setEditProfile] = useState({
        email: props.user.email,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        address: props.user.address,
        zip_code: props.user.zip_code
    })
  
    const handleChange = (event) => {
      setEditProfile(previousState => (
        {...previousState,
        [event.target.name] : event.target.value}
      ));
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(editProfile, props.jwt, props.user)
      props.updateProfile(editProfile);
  
    }

    // const updateProfile = async (updateUserObject, jwt) => {
    //     console.log(jwt, updateUserObject)
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/users/profile/' , { headers: {Authorization: 'Bearer ' + jwt}}, updateUserObject);
    //         window.location = '/profile';
    //       } catch(error) {
    //         console.log(error, 'error with profile edit');
    //       }
    //   }
  
    return(
      <div>
        <div className = "Register-Container">
          
        <form action="" onSubmit={handleSubmit} >
          <label htmlFor="">Email</label>
          <input className = "Register-Input" name="email" value={editProfile.email} onChange={handleChange} type="text" placeholder = {props.user.email} />
          <br/>
          <label htmlFor="">First Name</label>
          <input className = "Register-Input" name="first_name" value={editProfile.first_name} onChange={handleChange} type="text" placeholder = {props.user.first_name} />
          <br/>
          <label htmlFor="">Last Name</label>
          <input className = "Register-Input"  name="last_name" value={editProfile.last_name} onChange={handleChange} type="text" placeholder = {props.user.last_name} />
          <br/>
          <label htmlFor="">Address</label>
          <input className = "Register-Input" name="address" value={editProfile.address} onChange={handleChange} type="text" placeholder = {props.user.address} />
          <br/>
          <label htmlFor="">Zipcode</label>
          <input className = "Register-Input" name="zip_code" value={editProfile.zip_code} onChange={handleChange} type="text" placeholder = {props.user.zip_code} />
          <br/>
          <button type="submit">Update Profile</button>
        </form>
        </div>
      </div>
    )
  }
  
  export default ProfilePage;