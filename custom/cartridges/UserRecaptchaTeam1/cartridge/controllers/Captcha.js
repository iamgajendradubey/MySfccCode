'use strict';
var server = require('server');
var cache = require("*/cartridge/scripts/middleware/cache");

server.get("Error",cache.applyDefaultCache,function(req, res, next){
    var error=req.querystring.error;
    var data={
        msg:error
    }
    res.render('captchaerror',data);
    next();
})
module.exports = server.exports();