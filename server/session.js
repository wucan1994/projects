const db = require('./database');

class Session {
  constructor(sessionId) {
    this.sessionId = sessionId;
  }

  async getSession() {
    const sql = `SELECT * FROM session WHERE session_id = "${this.sessionId}"`;
    const result = await db.queryDB(sql);

    if (result.length === 1 && result[0].expireTime < Date.now()) {
      // cookie有效，登录态有效
      return true;
    }
    // 登录态失效，清除cookie，删除session中对应的记录
    return false;
  }
}

module.exports = Session;
