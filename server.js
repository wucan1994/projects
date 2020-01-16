var http = require('http');
var url = require('url');

function start(route) {
    function onRequest(request, res) {
        // 跨域请求响应头设置
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin");
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
        res.setHeader("content-type", "application/json");

        var pathname = url.parse(request.url).pathname;
        route(pathname, res);
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;