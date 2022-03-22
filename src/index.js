import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Home from './pages/home';
import Mycenter from './pages/mycenter';
import Navbar from './components/navbar';
import Info from './pages/info';
import Works from './pages/works';
import Login from './pages/login';
import mycenterReducer from './pages/mycenter/reducer';
import './index.css';

const store = createStore(mycenterReducer);

render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <div className="content">
        <Route path="/home" component={Home} />
        <Route path="/follow" component={Mycenter} />
        <Route path="/mycenter" component={Mycenter} />
        <Route path="/info" component={Info} />
        <Route path="/works" component={Works} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
