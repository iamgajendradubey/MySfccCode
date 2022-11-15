var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice=require('*/cartridge/static/staticservice')
var Currencyconversion = LocalServiceRegistry.createService(Theservice.currencyconverterservice, {
    createRequest: function (svc, params) {
        var Logger = require('dw/system/Logger');
        Logger.debug(JSON.stringify(params))
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
        var wurl = Currencyconversion.getURL();
        // wurl=wurl.replace("{lat}",params.lat);
        // wurl=wurl.replace("{lon}",params.lat);
        // wurl=wurl.replace("{exclude}",params.exclude);
        // wurl=wurl.replace("{appid}",params.appid);

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
            text:params
        };
    }
});
module.exports = {
    Currencyconversion: Currencyconversion
}