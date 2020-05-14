const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Xfb19930107',
    port: '3306',
    database: 'mylife'
});
connection.connect();

function route(pathname, response, params = {}) {
    switch (pathname) {
        case '/login':
            login(response, params);
            break;
        case '/register':
            register();
            break;
        default:
            break;
    }
}

// 用户登录
async function login(res, params) {
    const sql = `SELECT * FROM user WHERE user_name = "${params.name}"`;
    const result = await queryDB(sql);

    if (result.length === 1 && params.pwd === result[0].user_pwd) {
        res.end(JSON.stringify({
            msg: '登录成功'
        }));
    } else {
        res.end(JSON.stringify({
            msg: '登录失败，用户名或密码错误'
        }));
    }
}

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

    promise.then(value => {
        return value;
    }).catch(err => {
        return;
    });

    return promise;
}
module.exports = route;