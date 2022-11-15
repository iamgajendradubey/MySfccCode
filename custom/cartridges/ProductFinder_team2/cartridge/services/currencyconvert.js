var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice=require('*/cartridge/static/staticservice') //using service name defined in static file

var Currencyconversion = LocalServiceRegistry.createService(Theservice.currencyconverterservice, {
    createRequest: function (svc, params) {
        var Logger = require('dw/system/Logger');
        Logger.debug(JSON.stringify(params))
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
        var wurl = Currencyconversion.getURL();// to append parameters in url
        var temurl = wurl+"?from=" + params.from + "&to="+params.to+"&amount="+params.amount; 
        svc.setURL(temurl);
        return params;
    },
    parseResponse: function (svc, httpClient) {
        var result;
        try {
            result = JSON.parse(httpClient.text);
        } catch (e) {
            result = httpClient.text;
        }
        return result;
    },
    mockCall:function (svc, params) {
        return {
            statusCode:200,
            statusMessage:'Accepted',
            text:{
                new_amount: 1.03,
                new_currency: "EUR",
                old_currency: "USD",
                old_amount: 1.0
            }
        };
    }
});
module.exports = {
    Currencyconversion: Currencyconversion
}