'use strict';
var server = require('server');
var MediaFile = require('dw/content/MediaFile');
var Image = require('dw/experience/image/Image');
server.get('Invoice', function (req, res, next) {
    var msg = `${dw.system.Site.current.preferences.custom.invoiceLogo.getURL()}.getImage('thumbnail', 0).getImageURL({scaleWidth: 100, format: 'png')}`;
    // var x =  `${dw.system.Site.current.preferences.custom.invoiceLogo}`;
    var a = "xyz";
    res.render('order/hello', {
    	Message: msg,
        hel:'hel'
    });
    next();
});


module.exports = server.exports();