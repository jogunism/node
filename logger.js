// logger
var _log4js = require('log4js');
_log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: '.logs/out.log', category: 'collector' }
    ]
});
var _logger = _log4js.getLogger('collector');

module.exports = {
    trace: function(msg) { return _logger.trace(msg); },
    degub: function(msg) { return _logger.debug(msg); },
    info: function(msg) { return _logger.info(msg); },
    warn: function(msg) { return _logger.warn(msg); },
    fatal: function(msg) { return  _logger.fatal(msg); }
};
