'use strict';

var Logger = require('dw/system/Logger');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var service = require('*/cartridge/static/serviceStatic/storeLocatorStatic');

    var storeLocatorService = LocalServiceRegistry.createService('storeLocatorTeam1', {
        createRequest: function (svc, params) {
            svc.setRequestMethod('GET');
            svc.addHeader('Accept', 'application/json');
            var wurl = storeLocatorService.getURL();
            var tempurl = wurl+"?apikey=" + params.apikey + "&codes="+params.postalcode+"&country="+params.country;
            Logger.debug(JSON.stringify(params));
            storeLocatorService.setURL(tempurl);
            return params;
            // svc.addParam("apikey", apikey);
            // svc.addParam("codes", code);
        },
        parseResponse: function (svc, httpClient) {
            var result;
            try{
                result=JSON.parse(httpClient.text);
            }
            catch(e){
                result= httpClient.text;
            }
            return result;
        }
    });

module.exports ={
    storeLocatorService:storeLocatorService
}