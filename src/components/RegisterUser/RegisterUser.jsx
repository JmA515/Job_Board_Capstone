import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";

const RegisterUser = (props) => {
    const [value, setValue] = useState(null);
    console.log(value);
    const [registerUser, setRegisterUser] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        zip_code: "",
        lat_lng: "",
    });

    const handleChange = (event) => {
        setRegisterUser((previousState) => ({ ...previousState, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.registerUser(registerUser);
    };

    React.useEffect(() => {
        if (!value || !value.value || !value.value.place_id) return;

        console.log("Inside Hook", value);

        geocodeByPlaceId(value.value.place_id)
            .then((places) => getLatLng(places[0]))
            .then(({ lat, lng }) => {
                console.log("Successfully got latitude and longitude", { lat, lng });

                setRegisterUser({
                    ...registerUser,
                    address: value.label,
                    lat_lng: `${lat},${lng}`,
                });
            });
    }, [value]);

    return (
        <div>
            <div className="form-box">
                <Form action="" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridUserName">
                            <Form.Label htmlFor="">User Name</Form.Label>
                            {/* <input className="Register-Input" name="username" value={registerUser.username} onChange={handleChange} type="text" /> */}
                            <Form.Control name="username" value={registerUser.username} onChange={handleChange} type="text" />
                        </Form.Group>
                        <br />
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label htmlFor="">Password</Form.Label>
                            {/* <input className="Register-Input" name="password" value={registerUser.password} onChange={handleChange} type="text" /> */}
                            <Form.Control name="password" value={registerUser.password} onChange={handleChange} type="text" />
                        </Form.Group>
                    </Row>
                    {/* <br /> */}
                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label htmlFor="">Email</Form.Label>
                        {/* <input className="Register-Input" name="email" value={registerUser.email} onChange={handleChange} type="text" /> */}
                        <Form.Control name="email" value={registerUser.email} onChange={handleChange} type="text" />
                    </Form.Group>
                    {/* <br /> */}
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label htmlFor="">First Name</Form.Label>
                            {/* <input className="Register-Input" name="first_name" value={registerUser.first_name} onChange={handleChange} type="text" /> */}
                            <Form.Control name="first_name" value={registerUser.first_name} onChange={handleChange} type="text" />
                        </Form.Group>
                        <br />
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label htmlFor="">Last Name</Form.Label>
                            {/* <input className="Register-Input" name="last_name" value={registerUser.last_name} onChange={handleChange} type="text" /> */}
                            <Form.Control name="last_name" value={registerUser.last_name} onChange={handleChange} type="text" />
                        </Form.Group>
                    </Row>
                    {/* <br /> */}
                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label htmlFor="">Address</Form.Label>
                        {/* <input className="Register-Input" name="address" value={registerUser.address} onChange={handleChange} type="text" /> */}
                        <GooglePlacesAutocomplete selectProps={{ value, onChange: setValue, placeholder: "address..." }} />
                    </Form.Group>
                    {/* <br /> */}
                    {/* <label htmlFor="">Zipcode</label> */}
                    {/* <input className="Register-Input" name="zip_code" value={registerUser.zip_code} onChange={handleChange} type="text" /> */}
                    {/* <br /> */}
                    <Button variant="warning" type="submit">
                        Create Account
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegisterUser;
