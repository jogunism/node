var logger = require('../logger');

var cntHandler = (function(){

    var objCount = {};

    var delSerialObject = function(_srl)
    {
        var obj = {};
        for(var srl in objCount)
            if(srl != _srl)
                obj[srl] = objCount[_srl];

        objCount = obj;
    }

    return {

        add: function(_srl)
        {
            if(objCount[_srl]) 
                objCount[_srl]++; 
            else
                objCount[_srl] = 1;
        },

        reset: function(_srl)
        {
            delSerialObject(_srl);
        },

        getCount: function(_srl)
        {
            return objCount[_srl];
        },

        getObject: function()
        {
            return objCount;
        }
    }
})();

module.exports = {

    add: function(_srl)
    {
        cntHandler.add(_srl);
    },

    reset: function(_srl)
    {
        cntHandler.reset(_srl);
    },

    getCount: function(_srl)
    {
        return cntHandler.getCount(_srl);
    },

    getObject: function()
    {
        return cntHandler.getObject();
    }
};
