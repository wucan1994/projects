const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');
const route = require('./route');

const PORT = 8888;
const ORIGIN = 'http://localhost:4000';

function onRequest(request, response) {
  // 获得客户端的Cookie
  const cookies = {};
  if (request.headers.cookie) {
    request.headers.cookie.split(';').forEach((item) => {
      const parts = item.split('=');
      cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
    console.log('cookie', cookies);
  }

  // 设置响应头部
  response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type');
  response.setHeader('Access-Control-Allow-Origin', ORIGIN);
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Content-Type', 'application/json;charset=utf-8');
  response.setHeader('Content-Security-Policy', 'default-src');

  // 获取请求url、参数和请求方法
  const requestUrl = url.parse(request.url);
  const { pathname } = requestUrl;
  const method = request.method.toUpperCase();

  if (method === 'GET') {
    // 处理get请求
    const params = querystring.parse(requestUrl.query);

    route(pathname, response, params, cookies);
  } else if (method === 'POST') {
    if (pathname === '/header') {
      // parse a file upload
      const form = formidable({ multiples: true });

      form.parse(request, (err, fields, files) => {
        const uploadFiles = files.header;
        for (let i = 0; i < uploadFiles.length; i += 1) {
          const rs = fs.createReadStream(uploadFiles[i].path);
          const ws = fs.createWriteStream(`/Users/wucan/Documents/ResourceForMylife/images/${uploadFiles[i].name}`);
          rs.pipe(ws);
          rs.on('end', () => {
            console.log(`${uploadFiles[i].name}已读写完`);
            // 此处需要再完善，等所有文件都写完再返回，i == uploadFiles.length - 1时，不一定所有文件都写完了
            if (i === uploadFiles.length - 1) {
              response.end(JSON.stringify({ fields, files }, null, 2));
            }
          });
        }
      });
      return;
    }
    // 处理post请求
    let msg = '';

    request.on('data', (chunk) => {
      msg += chunk;
    }).on('end', () => {
      const params = querystring.parse(msg);

      route(pathname, response, params, cookies);
    });
  } else if (method === 'OPTIONS') {
    response.end();
  }
}

function start() {
  http.createServer(onRequest).listen(PORT);
}

exports.start = start;
