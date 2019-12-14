import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from "./App.js";
import Home from './pages/home';
import Mycenter from './pages/mycenter';

render((
    <Router>
        <Route path="/" component={App} />
        <Route path="/home" component={Home}/>
        <Route path="/mycenter" component={Mycenter}/>
    </Router>
), document.getElementById("root"));