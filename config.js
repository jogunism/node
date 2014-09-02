var config = {
    'interval': 10, //sec
    'serverInfo':{
        'port': '9090'
    },
    'dbInfo':{
        'host': 'devdb.tmonc.net',
        'user': 'tmon_mb_service',
        'password': 'xlahsahqkdlf0205!!',
        'database': 'tmon_mobile',
    }
};

module.exports = {
    interval:config['interval'],
    serverInfo:config['serverInfo'],
    dbInfo:config['dbInfo']
};
