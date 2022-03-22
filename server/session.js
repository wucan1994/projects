const db = require('./database');

class Session {
  constructor(sessionId) {
    this.sessionId = sessionId;
  }

  async getSession() {
    const result = await db.querySession(this.sessionId);

    if (result) {
      // cookie有效，登录态有效
      return true;
    }
    // 登录态失效，清除cookie，删除session中对应的记录
    return false;
  }
}

module.exports = Session;
