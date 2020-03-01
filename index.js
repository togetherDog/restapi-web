/* setup environemt */
require('dotenv').config({
    path: (process.env.NODE_ENV == 'prod') ? './env/production/.env' : './env/development/.env',
})

/* package import */
const restify = require('restify');
const server = restify.createServer();

// debug
const debug = require('./private_modules/debug');

/* ROUTER */
server.get('/health', require('./private_modules/healthcheck'));
server.get('/health/:message', require('./private_modules/healthcheck'));

/* SERVER */
server.listen(process.env.PORT || 3000, function() {
    debug.createSysLog('server', `url : ${server.url} => opened at ${new Date().getTime()}`);
});
