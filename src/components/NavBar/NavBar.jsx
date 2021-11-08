import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavBar = (props) => {
    return ( 
        <div>
            <Link to = "/">
                <Button className="nav-button" variant="primary">Home</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">Post Jobs</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">My Listed Jobs</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">My Current Jobs</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">Profile</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">Logout</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">Login</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">Register</Button>
            </Link>

            <Link to = "/">
                <Button className="nav-button" variant="primary">Home</Button>
            </Link>
        </div>
     );
}
 
export default NavBar;