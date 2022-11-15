'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var StaticService = require('*/cartridge/static/serviceStatic/currencyStatic');

var currency = LocalServiceRegistry.createService(StaticService.customService1,{
    createRequest: function (svc, param) {
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
        var wurl = currency.getURL();
        var tempurl = "?to=" + param.to + "&from=" + param.from + "&amount=" + param.amount;

        wurl = wurl+tempurl;
        svc.setURL( wurl);

        // return param;
       // https://currencyconvertercodesquare.herokuapp.com/?from=param1&to=param2&amount=param3
           // https://currencyconvertercodesquare.herokuapp.com/?to=EUR&from=USD&amount=1


    },
    parseResponse: function (svc, httpClient) {
        var result;

        try {
            result = JSON.parse(httpClient.text);
        } catch (e) {
            result = httpClient.text;
        }
        return result;
    }

});

module.exports = {
    currency: currency
}