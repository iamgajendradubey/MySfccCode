'use strict';
var server = require('server');
var cache = require("*/cartridge/scripts/middleware/cache");

server.get("BannerDetails",cache.applyDefaultCache,function(req, res, next){
    res.render('bannerDetails');
    next();
})
module.exports = server.exports();

