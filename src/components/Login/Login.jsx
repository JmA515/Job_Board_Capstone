import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        console.log("Inside Handle Submit");
        event.preventDefault();
        this.props.login(this.state);
    };

    render() {
        return (
            <div>
                <div className="form-box">
                    <Form action="" onSubmit={this.handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUserName">
                                <Form.Label htmlFor="">User Name</Form.Label>
                                <Form.Control name="username" value={this.state.username} onChange={this.handleChange} type="text" />
                            </Form.Group>
                            <br />
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label htmlFor="">Password</Form.Label>
                                <Form.Control name="password" value={this.state.password} onChange={this.handleChange} type="password" />
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Login;
