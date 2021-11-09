import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import RegisterUser from "./RegisterUser/RegisterUser";
import Login from "./Login/Login";
import TitleBar from "./TitleBar/TitleBar";
import ProfilePage from "./ProfilePage/ProfilePage";
import PostJob from "./PostJob/PostJob";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            jwtToken: null,
            jobs: [],
            tokenCheck: false,
        };
    }

    componentDidMount() {
        this.getAllJobs();
        this.token();
        // window.location = '/login';
    }

    registerUser = async (userRegisteredObject) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", userRegisteredObject);
            //   this.loginUser({'userName' : userRegisteredObject.userName, 'password': userRegisteredObject.password })
            window.location = "/register";
        } catch (error) {
            console.log(error, "error with register user");
        }
    };

    loginUser = async (loggedInUserObject) => {
        console.log("Inside LogInUser Callback");
        console.log("object", loggedInUserObject);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", loggedInUserObject);
            localStorage.setItem("token", response.data.access);
            console.log(response.data.access);
            let jwt = this.token();
            this.getUserDetails(this.state.user.user_id);
            console.log("Login State user:", this.state.user);
            // window.location='/home'
        } catch (error) {
            console.log(error, "error with logged in user");
            return error;
        }
    };

    token = () => {
        const jwt = localStorage.getItem("token");
        try {
            const user = jwtDecode(jwt);
            this.setState(
                {
                    user: user,
                    jwtToken: jwt,
                },
                () => {
                    this.getUserDetails();
                }
            );
            //   return this.state.user.id;
            return jwt;
        } catch (error) {
            console.log(error, "error with token function");
        }
    };

    getUserDetails = async () => {
        // const jwt = localStorage.getItem('token');
        console.log("User id", this.state.user);
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
                headers: { Authorization: "Bearer " + this.state.jwtToken },
            });
            console.log("*** RESPONSE DATA ****", response.data);
            this.setState({
                user: response.data,
            });
        } catch (er) {
            console.log("Error with the userDetails", er);
        } finally {
            this.setState({ tokenCheck: true });
        }
    };

    updateProfile = async (updateUserObject) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/users/profile/",
                { headers: { Authorization: "Bearer " + this.state.jwtToken } },
                updateUserObject
            );
            window.location = "/profile";
        } catch (error) {
            console.log(error, "error with profile edit");
        }
    };

    logOutUser = () => {
        localStorage.removeItem("token");
        window.location = "/";
        this.setState({ user: null });
    };

    getAllJobs = async () => {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/jobs/all/");
            this.setState({
                jobs: response.data,
            });
        } catch (error) {
            console.log(error, "error getting jobs");
        }
    };

    postJob = async () => {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jobs/", {
                headers: { Authorization: "Bearer " + this.state.jwtToken },
            });
            this.getAllJobs();
        } catch (error) {
            console.log(error, "error posting job");
        }
    };

    render() {
        console.log(this.state);
        if (!this.state.tokenCheck) {
            return <div>Loading Token Check</div>;
        }

        return (
            <div className="container-fluid">
                <NavBar user={this.state.user} logOutUser={this.logOutUser} />
                <Switch>
                    <Route path="/register" render={(props) => <RegisterUser {...props} registerUser={this.registerUser} />} />
                    <Route path="/login" render={(props) => <Login {...props} login={this.loginUser} />} />

                    <>
                        <Route
                            path="/profile"
                            render={(props) => (
                                <ProfilePage {...props} user={this.state.user} updateProfile={this.updateProfile} jwt={this.state.jwtToken} />
                            )}
                        />
                        <Route path="/home" render={(props) => <TitleBar {...props} getAllJobs={this.getAllJobs} jobs={this.state.jobs} />} />
                        <Route path="/post_job" render={(props) => <PostJob {...props} postJob={this.postJob} user={this.state.user} />} />
                    </>

                    {/* <Route 
                        path = "/home" 
                        render = {props => {
                        if(!this.state.user){
                            return <Redirect to = '/login' />;
                        } else {
                            return <TitleBar user = {this.state.user}/> 
                            }
                        }} 
                    /> */}
                    {/* <Redirect to="/" /> */}
                </Switch>
            </div>
        );
    }
}

export default App;
