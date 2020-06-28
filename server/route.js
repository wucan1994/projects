const db = require('./database');
const Session = require('./session');

// 用户登录
async function login(res, params) {
  const sql = `SELECT * FROM user WHERE user_name = "${params.name}"`;
  const result = await db.queryDB(sql);

  if (result.length === 1 && params.pwd === result[0].user_pwd) {
    const maxAge = 36000;
    const insertSql = `INSERT INTO mylife.session (session_expire) VALUES ("${Date.now() + maxAge}")`;
    const insertResult = await db.queryDB(insertSql);

    if (insertResult.affectedRows === 1 && insertResult.insertId) {
      res.setHeader('Set-Cookie', [`sessionId=${insertResult.insertId}`, 'Path=/', 'HttpOnly', `Max-Age=${maxAge}`]);
      res.end(JSON.stringify({
        error: 0,
        data: result[0],
        msg: '登录成功',
      }));
    } else {
      res.end(JSON.stringify({
        error: -1,
        data: {},
        msg: '登录失败，数据库写入时发生错误',
      }));
    }
  } else {
    res.end(JSON.stringify({
      error: 0,
      data: {},
      msg: '登录失败，用户名或密码错误',
    }));
  }
}

// 用户注册
async function register(res, params) {
  const sql = `SELECT * FROM user WHERE user_name = "${params.name}"`;
  const result = await db.queryDB(sql);

  if (result.length) {
    res.end(JSON.stringify({
      error: 0,
      data: {},
      msg: '注册失败，用户名已存在',
    }));
  } else {
    const insertSql = `INSERT INTO mylife.user (user_name, user_pwd, user_sex) VALUES ("${params.name}", "${params.pwd}", '2')`;
    const insertResult = await db.queryDB(insertSql);

    if (insertResult.affectedRows === 1 && insertResult.insertId) {
      res.end(JSON.stringify({
        error: 0,
        data: {},
        msg: '注册成功！',
      }));
    }
  }
}

// 在session表中查找cookie是否有效
function checkSession(res, cookies) {
  if (cookies.sessionId) {
    const session = new Session(cookies.sessionId);
    if (session.getSession()) {
      // sessionId存在且在有效期内
      res.end(JSON.stringify({
        error: 0,
        data: 1,
        msg: '',
      }));
      return;
    }
  }
  res.end(JSON.stringify({
    error: 0,
    data: 0,
    msg: '登录态失效',
  }));
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
