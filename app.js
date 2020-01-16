var server = require('./server');
var router = require('./routes');

server.start(router.route);