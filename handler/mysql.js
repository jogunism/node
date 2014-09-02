var logger = require('../logger');
var config = require('../config');

var mysqlHandler = (function(){

    var connection = null;

    var size = function(obj)
    {
        var size = 0, key;
        for(var key in obj)
            if(obj.hasOwnProperty(key)) size++;            
        return size;
    }

    return {

        makeConnection : function()
        {
            if(connection || connection != null)
                this.destroyConnection();

            var mysql = require('mysql');
            connection = mysql.createConnection({
                host     : config.dbInfo['host'],
                user     : config.dbInfo['user'],
                password : config.dbInfo['password'],
                database : config.dbInfo['database'],
            });

            connection.connect();
        },

        destroyConnection: function()
        {
            if((connection && connection != null) && connection.state != 'disconnected')
            {
                connection.end();
                connection = null;
            }
        },

        doIncrease: function(_obj, _callback)
        {
            if(!_obj || _obj == undefined || size(_obj) < 1)
                return;

            this.makeConnection();  //db open

            var _self = this;
            for(var _srl in _obj)
            {
                if(_obj[_srl] == 0 || _obj[_srl] == undefined)
                {
                    if(_callback) _callback(_srl);
                    continue;
                }

                var strQuery = 'UPDATE mobile_push_item SET read_count = read_count + ? WHERE push_item_srl = ?';
                connection.query(strQuery, [_obj[_srl], _srl], function(err, rows, fields){
                    var query = this.sql;
                    var _serial = query.substring(query.indexOf('\'')+1, query.length-1);
                    var _count = query.substring(query.indexOf('+')+1, query.indexOf(' WHERE'));

                    if(err)
                    {
                        logger.fatal(' * mysql query process : '+ err['code']);                        
                    }
                    else
                    {
                        if(rows['affectedRows'] > 0)
                            logger.info(' * count updated. - serial : '+ _serial +' / added count : '+ _count);
                        else
                            logger.warn(' * serial : '+ _serial +' is unavailable item.');
                    }

                    if(_callback) _callback(_serial);

                    _self.destroyConnection();  //db close
                });
            }
        },

        getCurrCount: function(_srl)
        {
/*
            var strQuery = 'SELECT read_count FROM mobile_push_item WHERE push_item_srl = ?';
*/
        }
    }

})();

module.exports = {

    doIncrease: function(_obj)
    {
        mysqlHandler.doIncrease(_obj['objCount'], _obj['callback']);
    }
};

