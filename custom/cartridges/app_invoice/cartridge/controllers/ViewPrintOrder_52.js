'use strict';
var server = require('server');

server.get('Invoice', function (req, res, next) {
    var msg = dw.system.Site.current.preferences.custom.invoice
    res.render('order/printorderinvoice', {
    	Message: msg,
        hel:'hel'
    });
    next();
});


module.exports = server.exports();