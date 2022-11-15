var server = require('server');
var CacheMgr =require('dw/system/CacheMgr');
var currencyCaches = CacheMgr.getCache('unqiueCacheCustom');

/**
 * Servicecall-currencyconvert1: This endpoint is invoked to convert currency from one to another based on current price
 * @name ProductFinder_team2/Servicecall-currencyconvert1
 * @function
 * @method GET
 * @param {Form,to,Amount} - get
 */

server.get('currencyconvert1',function(req,res,next){
var properties = {};
var template = 'currencyResult';
var from=req.querystring.from;
var to=req.querystring.to;
var amount=req.querystring.amount;
properties.response=currencyCaches.get("currency"+amount); //to get stored response from cache

if (properties.response) {
    res.render(template,properties);
}else{
    var currencyconvert = require('ProductFinder_team2/cartridge/services/currencyconvert.js');

    var param={
        from:from,
        to:to,
        amount:amount
    };
    var svcResult = currencyconvert.Currencyconversion.call(param); //service call to convert corrency
    if (svcResult.status === 'OK'){
        properties.response = svcResult.object;
    }else{
        properties.response = svcResult.errorMessage;
    }
    currencyCaches.put("currency"+amount, properties.response);// To store currency response in our cashe
    res.render(template,properties);
}
    next();
});
module.exports=server.exports();