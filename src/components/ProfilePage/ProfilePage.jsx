import React, { Fragment, useState } from "react";
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
                        <Form.Control name="email" value={editProfile.email} onChange={handleChange} type="text" placeholder={props.user.email} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                name="first_name"
                                value={editProfile.first_name}
                                onChange={handleChange}
                                type="text"
                                placeholder={props.user.first_name}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                name="last_name"
                                value={editProfile.last_name}
                                onChange={handleChange}
                                type="text"
                                placeholder={props.user.last_name}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridZipCode">
                        <Form.Label htmlFor="">Address</Form.Label>
                        <GooglePlacesAutocomplete selectProps={{ value, onChange: setValue, placeholder: "address..." }} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
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
