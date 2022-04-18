import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Home from './pages/home';
import Mycenter from './pages/mycenter';
import Tab from './components/tab';
import Info from './pages/info';
import Works from './pages/works';
import Login from './pages/login';
import mycenterReducer from './pages/mycenter/reducer';
import './index.css';

const store = createStore(mycenterReducer);

const tabList = [
  {
    title: '推荐',
    component: <Home />,
  },
  {
    title: '关注',
    component: <Info />,
  },
  {
    title: '我的',
    component: <Mycenter />,
  },
];

render(
  <Provider store={store}>
    <Router>
      <Tab tabList={tabList} />
      <div className="content">
        {/* <Route path="/home" component={Home} />
        <Route path="/follow" component={Mycenter} />
        <Route path="/mycenter" component={Mycenter} />
        <Route path="/info" component={Info} />
        <Route path="/works" component={Works} />
        <Route path="/login" component={Login} /> */}
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
