import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import React from "react";

const NavBar = (props) => {
    return ( 
        <div>
            {props.user && 
                <React.Fragment>
                    <Link to = "/home">
                        <Button className="nav-button" variant="primary">Home</Button>
                    </Link>

                    <Link to = "/post_job">
                        <Button className="nav-button" variant="primary">Post Jobs</Button>
                    </Link>

                    <Link to = "/posted_jobs">
                        <Button className="nav-button" variant="primary">My Listed Jobs</Button>
                    </Link>

                    <Link to = "/accepted_jobs">
                        <Button className="nav-button" variant="primary">My Current Jobs</Button>
                    </Link>

                    <Link to = "/profile">
                        <Button className="nav-button" variant="primary">Profile</Button>
                    </Link>

                    <Link to = "/login">
                        <Button className="nav-button" variant="primary" onClick = {() => props.logOutUser()} >Logout</Button>
                    </Link>
                </React.Fragment>
            }

            {!props.user && 
                <React.Fragment>
                    <Link to = "/login">
                        <Button className="nav-button" variant="primary">Login</Button>
                    </Link>

                    <Link to = "/register">
                        <Button className="nav-button" variant="primary">Register</Button>
                    </Link>
                </React.Fragment>
            }
            {props.user && <h3>Welcome {props.user.first_name}</h3>}

        </div>
     );
}
 
export default NavBar;