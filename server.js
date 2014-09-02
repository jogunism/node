// import
var logger = require('./logger');
var config = require('./config');
var mysql = require('./handler/mysql');
var count = require('./handler/count');

// runable
setInterval(function(){

    logger.info('monitoring.......');

    mysql.doIncrease({
        'objCount':count.getObject(),
        'callback':count.reset
    });

}, 1000 * config.interval);


/*************************************************************
 * restfull api
 **/

var app = require('express').createServer().listen(config.serverInfo['port']);

app.get('/', function(req, res){
    res.send({isSuccess : false, desc:'need to parameter'});
});

app.get('/addcount/:itemSrl', function(req, res){
    var itemSrl = req.params.itemSrl;
    count.add(itemSrl);
    res.send({itemSrl : itemSrl, isSuccess : true});
});

/*************************************************************/

logger.info('---------------------------------');
logger.info(' Nodejs started.');
logger.info('---------------------------------');