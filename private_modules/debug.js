/* ============== DEBUG =================

    모든 debug log 실행          : DEBUG=* [node 명]
    대분류 debug log 실행        : DEBUG=session:* [node 명]
    특정 debug log 실행          : DEBUG=session:test [node 명]
    대분류가 다른 debug log 실행  : DEBUG=session:test,express:* [node 명]
*/
var debug = require('debug');
var system_debug = new debug('system');

/* ============== BUNYAN ================= */
var bunyan = require('bunyan');

/* ========== GLOBAL VARIABLES ============ */
var logger = [{}, {}];

function writeDebugLog(type, name, position, level, msg) {
    checkDebugExists(type, name);
    if (type == 0) logger[type][name](msg);
    else logger[type][name].info({position: position, level: level}, msg);
}

function checkDebugExists(type, name) {
    try {
        if (!logger[type][name]) {
            logger[type][name] = createNewDebug(type, name);
        }
    } catch (e) {
        console.log(e);
        system_debug(`debug.js:23 - createSysLog error : ${e}`);
    }
}

function createNewDebug(type, name) {
    switch(type) {
        case 0:
            return new debug(name);
        case 1:
            return bunyan.createLogger({name: name});
    }
}

module.exports = {
    createSysLog : function(name, msg) {
        try {
            writeDebugLog(0, name, '', 0, msg);
        } catch (e) {
            console.log(e);
            system_debug(`debug.js:42 - createSysLog error : ${e}`);
        }
    },
    createInfoLog : function(name, position, msg) {
        try {
            writeDebugLog(1, name, position, 30, msg);
        } catch (e) {
            console.log(e);
            system_debug(`debug.js:50 - createInfoLog error : ${e}`);
        }
    },
    createWarningLog : function(name, position, msg) {
        try {
            writeDebugLog(1, name, position, 40, msg);
        } catch (e) {
            console.log(e);
            system_debug(`debug.js:58 - createInfoLog error : ${e}`);
        }
    },
    createErrLog : function(name, position, msg) {
        try {
            writeDebugLog(1, name, position, 50, msg);
        } catch (e) {
            console.log(e);
            system_debug(`debug.js:66 - createInfoLog error : ${e}`);
        }
    },
    createFatalLog : function(name, position, msg) {
        try {
            writeDebugLog(1, name, position, 60, msg);
        } catch (e) {
            console.log(e);
            system_debug(`debug.js:66 - createInfoLog error : ${e}`);
        }
    },
    createTraceLog : function(name, position, msg) {
        try {
            writeDebugLog(1, name, position, 10, msg);
        } catch (e) {
            console.log(e);
            system_debug(`debug.js:66 - createInfoLog error : ${e}`);
        }
    }
}