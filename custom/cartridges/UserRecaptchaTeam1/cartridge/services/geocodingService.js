'use strict';

var Logger = require('dw/system/Logger');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
// var service = require('*/cartridge/static/serviceStatic/storeLocatorStatic');

    var GeocodingService = LocalServiceRegistry.createService('geocodingTeam1', {
        createRequest: function (svc, params) {
            svc.setRequestMethod('GET');
            svc.addHeader('Accept', 'application/json');
            var wurl = GeocodingService.getURL();
            
            var tempurl = wurl+'?format=json&limit=3&q='+params.q;
            Logger.debug(JSON.stringify(params));
            GeocodingService.setURL(tempurl);
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
    GeocodingService:GeocodingService
}