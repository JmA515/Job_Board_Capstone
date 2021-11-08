import React, { Component } from 'react';
import { Redirect, Switch, Route } from "react-router-dom"
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './App.css'
import NavBar from './NavBar/NavBar';
import RegisterUser from './RegisterUser/RegisterUser';
import Login from './Login/Login';
import TitleBar from './TitleBar/TitleBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: null,
            jobs: [],
         };
    }

    componentDidMount() {
        this.getAllJobs();
        if (this.state.user){ 
        let jwt = this.token();
        this.getUserDetails(this.state.user.user_id, jwt)
        window.location = '/login';
        }
    }
        
    registerUser = async (userRegisteredObject) => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/auth/register/' , userRegisteredObject);
        //   this.loginUser({'userName' : userRegisteredObject.userName, 'password': userRegisteredObject.password })
          window.location = '/register';
        } catch(error) {
          console.log(error, 'error with register user');
        }
      }
    
      loginUser = async (loggedInUserObject) => {
        console.log("Inside LogInUser Callback")
        console.log("object", loggedInUserObject)
        try {      
          const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loggedInUserObject);
          localStorage.setItem('token', response.data.access);
          console.log(response.data.access)
          let jwt = this.token();
          this.getUserDetails(this.state.user.user_id, jwt);
          console.log("Login State user:" , this.state.user)
          // window.location='/'
        } catch(error) {
          console.log(error, 'error with logged in user');
          return error
        }
      }
    
      token = () => {
        const jwt = localStorage.getItem('token');
        try  {
          const user = jwtDecode(jwt);
          this.setState({user});
        //   return this.state.user.id;
          return jwt;
        }catch(error){
          console.log(error, "error with token function");
        }
      }
    
      getUserDetails = async (userId, jwt) => {
        // const jwt = localStorage.getItem('token');
        console.log("User id", userId)
        try {
          let response = await axios.get('http://127.0.0.1:8000/api/users/profile/', { headers: {Authorization: 'Bearer ' + jwt}});
          console.log("*** RESPONSE DATA ****", response.data);
          this.setState ({
            user: response.data
          })
        }
        catch (er) {
          console.log("Error with the userDetails", er)
        }
      }
    

      logOutUser = () => {
        localStorage.removeItem('token');
        window.location = '/';
        this.setState({user : null});
      }

      getAllJobs = async ()  => {
        let response = await axios.get('http://127.0.0.1:8000/api/jobs/all/') ;
        this.setState({
          jobs : response.data,
        });
      }
    

        

    render() { 
        return ( 
            <div className = "container-fluid">
                <NavBar user = {this.state.user} logOutUser = {this.logOutUser}/>
                <Switch>
                    <Route path = "/register" render = {props => <RegisterUser {...props} registerUser = {this.registerUser} /> }/>
                    <Route path = "/login" render = {props => <Login {...props} login={this.loginUser}/>} />
                    {console.log(this.state.user)}
                    <Route 
                        path = "/" 
                        render = {props => {
                        if(!this.state.user){
                            return <Redirect to = '/login' />;
                        } else {
                            return <TitleBar user = {this.state.user}/> 
                            }
                        }} 
                    />
                    <Route />
                    <Route />
                    <Route />
                    <Redirect to = '/' />
                </Switch>
            </div>
         );
    }
}
 
export default App;