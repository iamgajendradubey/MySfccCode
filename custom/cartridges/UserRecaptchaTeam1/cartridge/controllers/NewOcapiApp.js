var server = require('server');
var CacheMgr =require('dw/system/CacheMgr');

var URLUtils = require('dw/web/URLUtils');


server.get("FirstMethod",function(req, res, next){
    res.render('dummyoutput');
    next();
});
server.get("OcapiPLP",function(req, res, next){
    res.render('dummyoutput');
    next();
});
/**
 * Servicecall-currencyconvert1: This endpoint is invoked to convert currency from one to another based on current price
 * @name ProductFinder_team2/Servicecall-currencyconvert1
 * @function
 * @method GET
 * @param {Form,to,Amount} - get
 */



server.get('currencyconvert1',function(req,res,next){
var properties = {};
var template = 'magic2';
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

server.get("LoginShow", function (req,res,next) {
        var actionUrl = URLUtils.url("NewOcapiApp-MyResult"); //sets the route to call for the form submit action
        var SFRAhelloform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
        SFRAhelloform.clear();
    
        var data = {
            heading: "Login Please",
            actionUrl: actionUrl,
            SFRAhelloform: SFRAhelloform,
        };
        res.render("ocapiloginform", data);
        next();
    
});

server.post("MyResult", function (req,res,next) {
    var Tokenservice = require('UserRecaptchaTeam1/cartridge/services/loginCustomerByOcapi.js');
    var properties = {};
    // var refinevariable=req.querystring.p;
    var svcResult = Tokenservice.CustomerLogin.call();
    if (svcResult.status === 'OK'){
        properties.responce = svcResult.object;
    }else{
        properties.responce = svcResult.errorMessage;
    }
    
    res.json(properties);
    next();
});

server.get('GetAccessInfo',function(req,res,next){
    var Tokenservice = require('UserRecaptchaTeam1/cartridge/services/getAccesstokenByOcapi.js');

    var properties = {};
    
    var param={
        client_id:"88186553-367a-4c61-8161-992902296e76",
        grant_type:'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
    };
    
    var svcResult = Tokenservice.getAccessTokenOcapi.call(param);
    if (svcResult.status === 'OK'){
        properties.responce = JSON.stringify(svcResult.object);
    }else{
        properties.responce = svcResult.errorMessage;
    }
    res.json(properties);
    next();
});

server.get('GetAllProduct',function(req,res,next){
    var Tokenservice = require('UserRecaptchaTeam1/cartridge/services/getAllproductByOcapi.js');
    var properties = {};
    
    var refinevariable=req.querystring.cgid;

    var param={
        refine:"cgid="+refinevariable,
        client_id:"88186553-367a-4c61-8161-992902296e76"
    };
    
    var svcResult = Tokenservice.ProductListService.call(param);
    if (svcResult.status === 'OK'){
        properties.responce = svcResult.object;
        
    }else{
        properties.responce = svcResult.errorMessage;
    }
    res.render('OcapiPlpPage',properties)
    // res.json(properties);
    next();
});

server.get('GetAllProduct2',function(req,res,next){
    var Tokenservice = require('UserRecaptchaTeam1/cartridge/services/getAllproductByOcapi.js');
    var properties = {};
    
    var refinevariable=req.querystring.cgid;

    var param={
        refine:"cgid="+refinevariable,
        client_id:"88186553-367a-4c61-8161-992902296e76"
    };
    
    var svcResult = Tokenservice.ProductListService.call(param);
    if (svcResult.status === 'OK'){
        properties.responce = svcResult.object;
        
    }else{
        properties.responce = svcResult.errorMessage;
    }
    res.render('OcapiPlpPage',properties)
    // res.json(properties);
    next();
});

server.get('GetProduct',function(req,res,next){
    var Tokenservice = require('UserRecaptchaTeam1/cartridge/services/getAproduct.js');
    var properties = {};
    
    var refinevariable=req.querystring.p;
   
    var svcResult = Tokenservice.GetProduct.call(refinevariable);
    if (svcResult.status === 'OK'){
        properties.responce = svcResult.object;
        
    }else{
        properties.responce = svcResult.errorMessage;
    }
    res.render('OcapiPdpPage',properties)
    // res.json(properties);
    next();
});
module.exports=server.exports();