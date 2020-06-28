import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

function Navbar() {
  return (
    <ul className="navbar">
      <li><NavLink to="/home" activeClassName="active">推荐</NavLink></li>
      <li>
        <NavLink to="/mycenter" activeClassName="active">我的</NavLink>
        <ul className="navbar-mine">
          <li><NavLink to="/login?action=login" activeClassName="active">登录</NavLink></li>
          <li><NavLink to="/follow" activeClassName="active">关注</NavLink></li>
          <li><NavLink to="/info" activeClassName="active">个人信息</NavLink></li>
          <li><NavLink to="/works" activeClassName="active">作品集</NavLink></li>
        </ul>
      </li>
    </ul>
  );
}

export default Navbar;
