// debug
const debug = require('./debug');

function healthCheck(health, time, message) {
    debug.createSysLog('server', `health check ${(health) ? 'message' : 'error'} : ${(message) ? message : ""}`);
    return {
        status: (health) ? 'up' : 'down',
        uptime: process.uptime(),
        message: (message) ? message : "",
        timestamp: time
    }
}

function health(req, res, next) {
    var now = new Date().getTime();
    debug.createSysLog('server', `health check request at ${now}`);

    try {
        res.json(healthCheck(true, now, req.params.message));
    } catch (e) {
        res.json(healthCheck(false, now, e));
    }

    next();
}

module.exports = health;