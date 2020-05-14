import React from 'react';
import {hot} from 'react-hot-loader';
import Navbar from './components/navbar';
import './app.css';

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <div className="App-top"></div>
        </div>
    )
}

export default hot(module)(App);