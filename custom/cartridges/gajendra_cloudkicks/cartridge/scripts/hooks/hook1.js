function alertgajendra(param1) {
    var Logger = require('dw/system/Logger');
    var b=Logger.getLogger('xyz','xyz');
    b.error("hook1 is called by gajendra"+param1);
    // return param1;
}

function Addition(a,b) {
    var Logger = require('dw/system/Logger');
    Logger.error(a+b)
    var b=Logger.getLogger('xyz','xyz');
    b.error("Addition is called by gajendra" +a+b);
    return a+b;
}

// exports.alertgajendra=alertgajendra;
module.exports = {
    alertgajendra: alertgajendra,
    Addition: Addition
};