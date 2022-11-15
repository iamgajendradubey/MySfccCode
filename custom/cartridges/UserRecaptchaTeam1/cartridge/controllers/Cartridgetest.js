'use strict';
var server = require('server');
var cache = require("*/cartridge/scripts/middleware/cache");

server.get("FirstMethod",cache.applyDefaultCache,function(req, res, next){
    res.render('dummyoutput');
    next();
})
module.exports = server.exports();