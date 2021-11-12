import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import React from "react";
import Nav from "react-bootstrap/Nav";
import './NavBar.css'

const NavBar = (props) => {
    return ( 
        <div>
            <Nav className="justify-content-center background" fill variant="tabs" style={{padding:"1em"}}>
                {props.user && 
                    <React.Fragment>
                    <Nav.Item>
                        <Link to = "/home">
                            <Button className="nav-button" variant="success">Home</Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to = "/post_job">
                            <Button className="nav-button" variant="success">Post Jobs</Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to = "/posted_jobs">
                            <Button className="nav-button" variant="success">My Listed Jobs</Button>
                        </Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Link to = "/accepted_jobs">
                            <Button className="nav-button" variant="success">My Current Jobs</Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to = "/profile">
                            <Button className="nav-button" variant="success">Profile</Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to = "/">
                            <Button className="nav-button" variant="success" onClick = {() => props.logOutUser()}>Logout</Button>
                        </Link>
                    </Nav.Item>

                </React.Fragment>
            }

            {!props.user && 
                <React.Fragment >
                    <Nav.Item>
                        <Link to = "/login">
                            <Button className="nav-button" variant="success">Login</Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to = "/register">
                            <Button className="nav-button" variant="success">Register</Button>
                        </Link>
                    </Nav.Item>
                </React.Fragment>
            }
            </Nav>
            <div style={{padding:"3em"}}>
                {props.user && <h1>Welcome {props.user.first_name}</h1>}
            </div>
        </div>
     );
}
 
export default NavBar;

