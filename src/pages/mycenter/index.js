import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HttpClient from '../../common/httpClient';
import config from '../../config/index';
import { mycenterLogin } from './action';
import './index.css';

class MyCenter extends React.Component {
  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const { changeLoginStatus } = this.props;

    HttpClient.request({
      url: `${config.REMOTE_SERVER}/mycenter`,
      method: 'get',
      data: {},
      success: (res) => {
        if (res.error === 0 && res.data) {
          changeLoginStatus(true);
        }
      },
      fail: () => {},
    });
  }

  render() {
    const { isLogin } = this.props;

    return isLogin ? <div>登录了</div> : <div>没登录</div>;
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  changeLoginStatus: (payload) => dispatch(mycenterLogin(payload)),
});

MyCenter.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  changeLoginStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCenter);
