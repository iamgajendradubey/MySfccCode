'use strict';
var server = require('server')

server.get("Testing", function(req, res, next){
    var Logger = require('dw/system/Logger');
    Logger.error("this is Testing under Admin of gdCartridge");
    var data={
        success:true
    };
    res.json(data)
    next();
});

server.get("FolderSlot", function(req, res, next){
    
    // res.json({
    //     success:true
    // })
    // return next();
    res.render('MyfolderSlot')
    return next();

});

module.exports=server.exports();
