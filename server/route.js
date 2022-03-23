const db = require('./database');
const Session = require('./session');

// 用户登录
async function login(res, params) {
  const userId = await db.queryUserExist(params);

  if (userId > 0) {
    const sessionId = await db.insertSession(userId);
    console.warn('sessionId', sessionId);

    if (sessionId) {
      const maxAge = 36000;

      res.setHeader('Set-Cookie', [
        `sessionId=${sessionId}`,
        'Path=/',
        'HttpOnly',
        `Max-Age=${maxAge}`,
      ]);
      res.end(
        JSON.stringify({
          error: 0,
          data: {},
          msg: '登录成功',
        })
      );
    } else {
      res.end(
        JSON.stringify({
          error: -1,
          data: {},
          msg: '登录失败，数据库写入时发生错误',
        })
      );
    }
  } else if (result == 0) {
    res.end(
      JSON.stringify({
        error: 0,
        data: {},
        msg: '登录失败，用户名或密码错误',
      })
    );
  } else {
    res.end(
      JSON.stringify({
        error: 0,
        data: {},
        msg: '用户不存在！',
      })
    );
  }
}

// 用户注册
async function register(res, params) {
  const result = await db.queryUserExist(params);

  if (result == 0 || result == 1) {
    res.end(
      JSON.stringify({
        error: 0,
        data: {},
        msg: '注册失败，用户名已存在',
      })
    );
  } else {
    const result = await db.insertUser(params);

    if (result) {
      res.end(
        JSON.stringify({
          error: 0,
          data: {},
          msg: '注册成功！',
        })
      );
    } else {
      res.end(
        JSON.stringify({
          error: -1,
          data: {},
          msg: '注册失败！',
        })
      );
    }
  }
}

// 在session表中查找cookie是否有效
async function checkSession(res, cookies) {
  if (cookies.sessionId) {
    const session = new Session(cookies.sessionId);
    const sessionUserId = await session.getSession();
    if (sessionUserId) {
      // sessionId存在且在有效期内，获取用户信息并返回
      // db.queryUserInfo()
      getUserInfo(res, sessionUserId);
      return;
    }
  }
  res.end(
    JSON.stringify({
      error: 0,
      data: 0,
      msg: '登录态失效',
    })
  );
}

/**
 * 根据userId获取用户信息
 * @param {number} userId 用户id
 */
async function getUserInfo(res, userId) {
  if (userId) {
    const userInfo = await db.queryUserInfo(userId);
    if (userInfo) {
      res.end(
        JSON.stringify({
          error: 0,
          data: userInfo,
          msg: '',
        })
      );
    } else {
      res.end(
        JSON.stringify({
          error: -1,
          data: {},
          msg: '发生错误',
        })
      );
    }
  }
}

function route(pathname, response, params = {}, cookies = {}) {
  switch (pathname) {
    case '/mycenter':
      checkSession(response, cookies);
      break;
    case '/login':
      login(response, params);
      break;
    case '/register':
      register(response, params);
      break;
    case '/header':
      break;
    default:
      break;
  }
}

module.exports = route;
