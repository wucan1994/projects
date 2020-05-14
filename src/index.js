import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from "./App.js";
import Home from './pages/home';
import Mycenter from './pages/mycenter';
import Login from './pages/login';

render((
    <Router>
        <Route path="/" component={App} />
        <Route path="/home" component={Home}/>
        <Route path="/mycenter" component={Mycenter}/>
        <Route path="/login" component={Login} />
    </Router>
), document.getElementById("root"));