var server = require('server');
var service = require('gajendra_cloudkicks/cartridge/services/dadjokeservice');
var service2 = require('gajendra_cloudkicks/cartridge/services/whetherapi');
// var service3 = require('gajendra_cloudkicks/cartridge/services/getAccesstokenByOcapi.js');

server.get('Honey',function(req,res,next){
    var properties = {};
    var template = 'magic2';
    var param={apiid:"a8f55f8d5d73c40b083ffbf689e9c017"};
    var svcResult = service.dadJokeAPIService.call(param);
    if (svcResult.status === 'OK') {
        properties.joke = svcResult.object.joke;
    }
    res.render(template, properties);
    next();
});

server.get('GetWetherInfo',function(req,res,next){
    var properties = {};
    var template = 'magic2';
    var param={
        appid:"a8f55f8d5d73c40b083ffbf689e9c017",
        lat:33.44,
        lon:-94.04,
        exclude: "hourly,daily",
    };
    
    var svcResult = service2.WetherAPIService.call(param);
    if (svcResult.status === 'OK'){
        properties.joke = svcResult.object;
    }else{
        properties.joke = svcResult.errorMessage;
    }
    res.render(template, properties);
    next();
});

server.get('GetAccessInfo',function(req,res,next){
    var properties = {};
    var template = 'magic2';
    var param={
        client_id:"88186553-367a-4c61-8161-992902296e76",
        grant_type:'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
    };
    
    var svcResult = service3.getAccessTokenOcapi.call(param);
    if (svcResult.status === 'OK'){
        properties.joke = JSON.stringify(svcResult.object);
    }else{
        properties.joke = svcResult.errorMessage;
    }
    res.render(template, properties);
    next();
});

server.get('currencyconvert',function(req,res,next){
var currencyconvert = require('gajendra_cloudkicks/cartridge/services/currencyconvert.js');
var from=req.querystring.from;
var to=req.querystring.to;
var amount=req.querystring.amount;
var properties = {};
var template = 'magic2';
    var param={
        from:from,
        to:to,
        amount:amount
    };
    var svcResult = currencyconvert.Currencyconversion.call(param);
    if (svcResult.status === 'OK'){
        properties.joke = JSON.stringify(svcResult.object);
    }else{
        properties.joke = svcResult.errorMessage;
    }
    res.render(template, properties);
    next();
});

server.get('currencyconvert',function(req,res,next){
    var currencyconvert = require('gajendra_cloudkicks/cartridge/services/currencyconvert.js');
    var from=req.querystring.from;
    var to=req.querystring.to;
    var amount=req.querystring.amount;
    var properties = {};
    var template = 'magic2';
        var param={
            from:from,
            to:to,
            amount:amount
        };
        var svcResult = currencyconvert.Currencyconversion.call(param);
        if (svcResult.status === 'OK'){
            properties.joke = JSON.stringify(svcResult.object);
        }else{
            properties.joke = svcResult.errorMessage;
        }
        res.render(template, properties);
        next();
    });
module.exports=server.exports();