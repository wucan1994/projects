import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="Navbar">
            <div className="Navbar-item"><Link to="/home">首页</Link></div>
            <div className="Navbar-item"><Link to="/mycenter">个人中心</Link></div>
        </div>
    )
}

export default Navbar;