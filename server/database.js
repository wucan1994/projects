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

exports.queryDB = queryDB;
