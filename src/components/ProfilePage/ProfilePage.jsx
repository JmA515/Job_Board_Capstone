import React, { Fragment, useState } from "react";
// import axios from 'axios';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./ProfilePage.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";

const ProfilePage = (props) => {
    const [value, setValue] = useState({ label: props.user.address, value: {} });
    console.log(value);
    const [editProfile, setEditProfile] = useState({
        email: props.user.email,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        address: props.user.address,
        zip_code: props.user.zip_code,
        lat_lng: props.user.lat_lng,
    });

    const handleChange = (event) => {
        setEditProfile((previousState) => ({ ...previousState, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(editProfile, props.jwt, props.user);
        props.updateProfile(editProfile);
    };

    // const updateProfile = async (updateUserObject, jwt) => {
    //     console.log(jwt, updateUserObject)
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/users/profile/' , { headers: {Authorization: 'Bearer ' + jwt}}, updateUserObject);
    //         window.location = '/profile';
    //       } catch(error) {
    //         console.log(error, 'error with profile edit');
    //       }
    //   }

    React.useEffect(() => {
        if (!value || !value.value || !value.value.place_id) return;

        console.log("Inside Hook", value);

        geocodeByPlaceId(value.value.place_id)
            .then((places) => getLatLng(places[0]))
            .then(({ lat, lng }) => {
                console.log("Successfully got latitude and longitude", { lat, lng });

                setEditProfile({
                    ...editProfile,
                    address: value.label,
                    lat_lng: `${lat},${lng}`,
                });
            });
    }, [value]);

    return (
        <div>
            <div className="form-box">
                <Form action="" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        {/* <input className = "Register-Input" name="email" value={editProfile.email} onChange={handleChange} type="text" placeholder = {props.user.email} /> */}
                        <Form.Control name="email" value={editProfile.email} onChange={handleChange} type="text" placeholder={props.user.email} />
                    </Form.Group>
                    {/* <br/> */}
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            {/* <input className = "Register-Input" name="first_name" value={editProfile.first_name} onChange={handleChange} type="text" placeholder = {props.user.first_name} /> */}
                            <Form.Control
                                name="first_name"
                                value={editProfile.first_name}
                                onChange={handleChange}
                                type="text"
                                placeholder={props.user.first_name}
                            />
                        </Form.Group>
                        {/* <br/> */}
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            {/* <input className = "Register-Input"  name="last_name" value={editProfile.last_name} onChange={handleChange} type="text" placeholder = {props.user.last_name} /> */}
                            <Form.Control
                                name="last_name"
                                value={editProfile.last_name}
                                onChange={handleChange}
                                type="text"
                                placeholder={props.user.last_name}
                            />
                        </Form.Group>
                    </Row>
                    {/* <br/> */}
                    {/* <Form.Group className="mb-3" controlId="formGridAddress"> */}
                    {/* <Form.Label>Address</Form.Label> */}
                    {/* <input className = "Register-Input" name="address" value={editProfile.address} onChange={handleChange} type="text" placeholder = {props.user.address} /> */}
                    {/* <Form.Control name="address" value={editProfile.address} onChange={handleChange} type="text" placeholder = {props.user.address} /> */}
                    {/* </Form.Group> */}
                    {/* <br/> */}
                    <Form.Group className="mb-3" controlId="formGridZipCode">
                        <Form.Label htmlFor="">Address</Form.Label>
                        {/* <input className = "Register-Input" name="zip_code" value={editProfile.zip_code} onChange={handleChange} type="text" placeholder = {props.user.zip_code} /> */}
                        {/* <Form.Control name="zip_code" value={editProfile.zip_code} onChange={handleChange} type="text" placeholder = {props.user.zip_code} /> */}
                        <GooglePlacesAutocomplete selectProps={{ value, onChange: setValue, placeholder: "address..." }} />
                    </Form.Group>
                    {/* <br/> */}
                    <Button variant="warning" type="submit">
                        Update Profile
                    </Button>
                    <br />
                    <br />
                </Form>
            </div>
        </div>
    );
};

export default ProfilePage;
