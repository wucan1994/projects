const http = require('http');
const url = require('url');
const querystring = require('querystring');
const route = require('./route');

const PORT = 8888;
const ORIGIN = 'http://localhost:4000';

function start() {
    http.createServer(onRequest).listen(PORT);
}

function onRequest(request, response) {
    // 设置响应头部
    response.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Origin");
    response.setHeader('Access-Control-Allow-Origin', ORIGIN);
    response.setHeader('Content-Type', 'application/json;charset=utf-8');

    // 获取请求url、参数和请求方法
    const requestUrl = url.parse(request.url);
    const pathname = requestUrl.pathname;
    const method = request.method.toUpperCase();

    if (method === 'GET') {
        // 处理get请求
        const params = querystring.parse(requestUrl.query);
        console.log('params', params)

        route(pathname, response, params);
    } else if (method === 'POST') {
        // 处理post请求
        let msg = '';

        request.on('data', function(chunk) {
            msg += chunk;
        }).on('end', function() {
            const params = querystring.parse(msg);

            route(pathname, response, params);
        });
    } else if (method === 'OPTIONS') {
        // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT')
        response.end();
    }
}

exports.start =  start;