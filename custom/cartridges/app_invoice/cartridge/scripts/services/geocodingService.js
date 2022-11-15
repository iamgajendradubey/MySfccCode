'use strict';

// var Logger = require('dw/system/Logger');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var GeocodingService = LocalServiceRegistry.createService('geocodingTeam1', {
        createRequest: function (svc, params) {
            svc.setRequestMethod('GET');
            svc.addHeader('Accept', 'application/json');
            var wurl = GeocodingService.getURL();
            var tempurl = wurl+'?format=json&limit=3&q='+params.q;
            GeocodingService.setURL(tempurl);
            return params;
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