const db = require('./database');
const Session = require('./session');

// 默认返回内容
const defaultResBody = {
  error: 0,
  data: {},
  msg: '',
};

// 用户登录
async function login(res, params) {
  const resBody = { ...defaultResBody };
  const userId = await db.queryUserExist(params);

  if (userId > 0) {
    const sessionId = await db.insertSession(userId);

    if (sessionId) {
      const maxAge = 36000;

      res.setHeader('Set-Cookie', [
        `sessionId=${sessionId}`,
        'Path=/',
        'HttpOnly',
        `Max-Age=${maxAge}`,
      ]);
      Object.assign(resBody, { msg: '登录成功' });
    } else {
      Object.assign(resBody, {
        error: -1,
        msg: '登录失败，数据库写入时发生错误',
      });
    }
  } else if (userId == 0) {
    Object.assign(resBody, { msg: '登录失败，用户名或密码错误' });
  } else {
    Object.assign(resBody, { msg: '用户不存在！请注册！' });
  }
  res.end(JSON.stringify(resBody));
}

// 用户注册
async function register(res, params) {
  const resBody = { ...defaultResBody };
  const userId = await db.queryUserExist(params);

  if (userId >= 0) {
    Object.assign(resBody, { msg: '注册失败，用户名已存在' });
  } else {
    const result = await db.insertUser(params);

    if (result) {
      Object.assign(resBody, { msg: '注册成功！' });
    } else {
      Object.assign(resBody, { msg: '注册失败!' });
    }
  }
  res.end(JSON.stringify(resBody));
}

// 在session表中查找cookie是否有效
async function checkSession(res, cookies) {
  const resBody = { ...defaultResBody };
  const { sessionId } = cookies;

  if (sessionId) {
    const session = new Session(sessionId);
    const sessionUserId = await session.getSession();
    if (sessionUserId) {
      // sessionId存在且在有效期内，获取用户信息并返回
      getUserInfo(res, sessionUserId);
    } else {
      Object.assign(resBody, { msg: '请登录！' });
      res.end(JSON.stringify(resBody));
    }
  } else {
    Object.assign(resBody, { msg: '请登录！' });
    res.end(JSON.stringify(resBody));
  }
}

/**
 * 根据userId获取用户信息
 * @param {number} userId 用户id
 */
async function getUserInfo(res, userId) {
  const resBody = { ...defaultResBody };

  if (userId) {
    const userInfo = await db.queryUserInfo(userId);

    if (userInfo) {
      Object.assign(resBody, { data: userInfo });
    } else {
      Object.assign(resBody, { msg: '获取用户信息出错' });
    }
  } else {
    Object.assign(resBody, {
      code: '-1',
      msg: '用户id错误',
    });
  }
  res.end(JSON.stringify(resBody));
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
