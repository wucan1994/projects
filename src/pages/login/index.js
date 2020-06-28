import React, { useState } from 'react';
import HttpClient from '../../common/httpClient';
import config from '../../config/index';
import './index.css';
import Util from '../../common/util';

function Login() {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const urlParam = Util.getUrlParam();

  const loginFunc = function (e) {
    e.preventDefault();

    HttpClient.request({
      url: `${config.REMOTE_SERVER}/${urlParam.action}`,
      method: 'post',
      data: {
        name: Util.encodeHtml(userName),
        pwd: Util.encodeHtml(userPwd),
      },
      success: (res) => {
        if (res.error === 0 && res.data.user_id) {
          localStorage.setItem('mylife_user_info', res.data);
        }
      },
      fail: () => {
      },
    });
  };

  const x = '2222&lt;script&gt;alert(1)&lt;/script&gt;';

  return (
    <div className="Login">
      <div>{x}</div>
      <div dangerouslySetInnerHTML={{ __html: x }} />
      <form className="Login-form" onSubmit={(e) => { loginFunc(e); }}>
        <input type="text" placeholder="用户名" className="Login-form-username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type="password" placeholder="密码" className="Login-form-pwd" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />
        <input type="submit" value={urlParam.action === 'login' ? '登录' : '注册'} className="Login-form-submit" />
      </form>
    </div>
  );
}

export default Login;
