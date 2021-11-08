// import React, { useState } from "react";
import React, { Component } from 'react';


// const Login = (props) => {
//     const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  
//     const handleChange = (event) => {
//       setLoginUser(previousState => ({
//         ...previousState,
//         [event.target.name]: event.target.value
//       }));
//     }
  
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: ''
         }
    };
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    handleSubmit = (event) => {  
        // debugger;  
        console.log("Inside Handle Submit")
        event.preventDefault()
        this.props.login(this.state)
        // window.location = '/';
    }
    
    render() {
    return (
        <div>
        <div className = "LoginContainer">
        <form action="" onSubmit={this.handleSubmit}>
        <label htmlFor="">User Name</label>
        <input className = "loginInput" name="username" value={this.state.username} onChange={this.handleChange} type="text" />
        <br />
        <label htmlFor="">Password</label>
        <input className = "loginInput" name="password" value={this.state.password} onChange={this.handleChange} type="password" />
        <button type = "submit">Login</button>
        </form>
        </div>
        </div>
        
        );
    };
} 
export default Login;
  
//   export default Login;