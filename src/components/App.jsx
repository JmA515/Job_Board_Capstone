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
import UserAcceptedJobs from "./UserAcceptedJobs/UserAcceptedJobs";
import UserPostedJobs from "./UserPostedJobs/UserPostedJobs";
import { Container } from "react-bootstrap";

class App extends Component {
    constructor(props) {
        super(props);

        let today = new Date(),
            date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

        this.state = {
            user: null,
            userId: null,
            jwtToken: null,
            jobs: [],
            tokenCheck: false,
            currentDate: date,
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
            window.location = "/login";
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
            window.location='/home'
        } catch (error) {
            console.log(error, "error with logged in user");
            return error;
        }
    };

    token = () => {
        const jwt = localStorage.getItem("token");
        try {
            const user = jwtDecode(jwt);
            console.log(user.user_id);
            this.setState(
                {
                    user: user,
                    userId: user.user_id,
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
        console.log(this.state.jwtToken);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/profile/", updateUserObject, {
                headers: { Authorization: "Bearer " + this.state.jwtToken },
            });
            window.location = "/profile";
        } catch (error) {
            console.log(error, "error with profile edit");
        }
    };

    logOutUser = () => {
        localStorage.removeItem("token");
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

    postJob = async (newJobObject) => {
        console.log("POST job", this.state.jwtToken);
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jobs/", newJobObject, {
                headers: { Authorization: "Bearer " + this.state.jwtToken },
            });
            window.location = "/home";
            this.getAllJobs();
        } catch (error) {
            console.log(error, "error posting job");
        }
    };

    acceptJob = async (jobId) => {
        let acceptingUser = jwtDecode(localStorage.getItem("token"));
        try {
            let thing = {
                job_accepter: acceptingUser.user_id,
                status: "accepted",
            };
            let response = await axios.patch(`http://127.0.0.1:8000/api/jobs/accept/${jobId}/`, thing, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });
            this.getAllJobs();
        } catch (error) {
            console.log(error, "error posting job");
        }
    };

    jobComplete = async (jobId) => {
        // let acceptingUser = jwtDecode(localStorage.getItem("token"));
        try {
            let thing = {
                // job_accepter: acceptingUser.user_id,
                status: "completed",
            };
            let response = await axios.patch(`http://127.0.0.1:8000/api/jobs/accept/${jobId}/`, thing, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });
            this.getAllJobs();
        } catch (error) {
            console.log(error, "error posting job");
        }
    };

    rateJob = async (userRatedId) => {
        let rating = prompt("Please rate from 1-5");
        console.log(parseInt(rating));
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/users/profile/${userRatedId}`, {
                headers: { Authorization: "Bearer " + this.state.jwtToken },
            });
            console.log("rate response", response.data);
            return response.data;
        } catch (er) {
            console.log("Error with the userDetails", er);
        }
        //     try {
        //     let thing = {
        //         job_satisfaction_rating: job_satisfaction_rating += parseInt(rating),
        //     };
        //     let response = await axios.patch(`http://127.0.0.1:8000/api/users/profile/${userRatedId}/`, thing, {
        //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        //     });
        //     this.getAllJobs();
        // } catch (error) {
        //     console.log(error, "error posting job");
        // }
    };

    render() {
        // console.log(this.state);
        if (!this.state.jwtToken) {
            return (
                <div>
                    
                    {/* <Login login={this.loginUser} /> */}
                    <Container fluid>
                        <NavBar  user={this.state.user} logOutUser={this.logOutUser} />
                        <Switch>
                            <Route path="/register" render={(props) => <RegisterUser {...props} registerUser={this.registerUser} />} />
                            <Route path="/login" render={(props) => <Login {...props} login={this.loginUser} />} />
                        </Switch>
                    </Container>
                </div>
            );
        }
        if (!this.state.tokenCheck) {
            return <div>Loading Token Check</div>;
        }

        return (
            <Container fluid>
                <div className="bg-color">
                    <NavBar  user={this.state.user} logOutUser={this.logOutUser} />
                    <Switch>
                        <Route path="/register" render={(props) => <RegisterUser {...props} registerUser={this.registerUser} />} />
                        <Route path="/login" render={(props) => <Login {...props} login={this.loginUser} />} />

                        <Route
                            path="/accepted_jobs"
                            render={(props) => (
                                <UserAcceptedJobs
                                    {...props}
                                    user={this.state.user}
                                    jobs={this.state.jobs}
                                    userId={this.state.userId}
                                    jobComplete={this.jobComplete}
                                />
                            )}
                        />
                        <Route
                            path="/posted_jobs"
                            render={(props) => (
                                <UserPostedJobs
                                    {...props}
                                    user={this.state.user}
                                    jobs={this.state.jobs}
                                    userId={this.state.userId}
                                    rateJob={this.rateJob}
                                />
                            )}
                        />
                        <>
                            <Route
                                path="/profile"
                                render={(props) => (
                                    <ProfilePage {...props} user={this.state.user} updateProfile={this.updateProfile} jwt={this.state.jwtToken} />
                                )}
                            />
                            <Route
                                path="/home"
                                render={(props) => <TitleBar {...props} getAllJobs={this.getAllJobs} jobs={this.state.jobs} acceptJob={this.acceptJob} />}
                            />
                            <Route
                                path="/post_job"
                                render={(props) => (
                                    <PostJob {...props} postJob={this.postJob} user={this.state.user} currentDate={this.state.currentDate} />
                                )}
                            />
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
            </Container>
        );
    }
}

export default App;
