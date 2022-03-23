const db = require('./database');

class Session {
  constructor(sessionId) {
    this.sessionId = sessionId;
  }

  /**
   * 查询session
   * @returns
   */
  async getSession() {
    const result = await db.querySession(this.sessionId);

    if (result) {
      // cookie有效，登录态有效
      return result;
    }
    // 登录态失效，清除cookie，删除session中对应的记录
    // 应该不用清除cookie,cookie设置了max-age，session中过期的对话，应该定期清除吧
    // 问兵哥说，session也不用定期删除
    return 0;
  }
}

module.exports = Session;
