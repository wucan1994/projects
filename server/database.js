const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mylife2020',
  port: '3306',
  database: 'mylife',
});
connection.connect();

// 查询数据库
function queryDB(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });

  promise.then((value) => value).catch(() => {});

  return promise;
}

/**
 * 查询user表，判断用户是否存在
 * @param {*} params
 * @returns {number} -1: 用户不存在 0: 密码错误 1: 用户名和密码正确
 */
async function queryUserExist(params) {
  const sql = `SELECT * FROM user WHERE user_name = "${params.name}"`;
  const result = await queryDB(sql);

  if (result.length) {
    if (params.pwd === result[0].user_pwd) return 1;
    return 0;
  }

  return -1;
}

// 写入user表
async function insertUser(params) {
  const insertSql = `INSERT INTO mylife.user (user_name, user_pwd, user_sex) VALUES ("${params.name}", "${params.pwd}", '2')`;
  const insertResult = await queryDB(insertSql);

  if (insertResult.affectedRows === 1 && insertResult.insertId) {
    return true;
  }

  return false;
}

/**
 * 写入session表
 * @param {*} params
 * @returns {number | null} sessionId
 */
async function insertSession(params) {
  const maxAge = 36000;
  // 更新用户的session_expire
  const insertSql = `INSERT INTO mylife.session (session_username, session_expire) VALUES ("${
    params.name
  }", "${
    Date.now() + maxAge
  }") ON DUPLICATE KEY UPDATE session_expire=VALUES(session_expire)`;
  const insertResult = await queryDB(insertSql);

  if (insertResult.affectedRows === 1 && insertResult.insertId) {
    return insertResult.insertId;
  }

  return null;
}

async function querySession(sessionId) {
  const sql = `SELECT * FROM session WHERE session_id = "${sessionId}"`;
  const result = await queryDB(sql);

  if (result.length === 1 && result[0].expireTime < Date.now()) {
    return true;
  }

  return false;
}

exports.queryUserExist = queryUserExist;
exports.insertUser = insertUser;
exports.querySession = querySession;
exports.insertSession = insertSession;
