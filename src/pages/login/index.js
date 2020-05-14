import React, { useState } from 'react';
import HttpClient from '../../common/httpClient';
import { REMOTE_SERVER } from '../../config/index';
import './index.css';

const loginAction = `${REMOTE_SERVER}/login`;

function Login() {
    const [ userName, setUserName ] = useState('');
    const [ userPwd, setUserPwd ] = useState('');

    const loginFunc = function(e) {
        e.preventDefault();

        HttpClient.request({
            method: 'post',
            url: `${REMOTE_SERVER}/login`,
            data: {
                name: userName,
                pwd: userPwd
            },
            success: res => {
                console.log('res', res);
            },
            fail: () => {
                console.log('something went wrong');
            }
        });
    }

    return (
        <div className="Login">
            <form className="Login-form" onSubmit={(e) => {loginFunc(e)}}>
                <input type="text" placeholder="用户名" className="Login-form-username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type="password" placeholder="密码" className="Login-form-pwd" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />
                <input type="submit" value="登录" className="Login-form-submit" />
            </form>
        </div>
    )
}

export default Login;