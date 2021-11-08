import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom"
import axios from 'axios';
import './App.css'
import NavBar from './NavBar/NavBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: null,
         };
    }
    
    render() { 
        return ( 
            <div className = "container-fluid">
                <NavBar />
                <Routes>
                    <Route />
                    <Route />
                    <Route />
                    <Route />
                    <Route />
                </Routes>
            </div>
         );
    }
}
 
export default App;