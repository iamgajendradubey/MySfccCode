
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice=require('*/cartridge/static/staticservice')
var dadJokeAPIService = LocalServiceRegistry.createService(Theservice.service1, {
    createRequest: function (svc, params) {
        // var Logger = require('dw/system/Logger');
        // Logger.debug(JSON.stringify(params))
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
        svc.addHeader('testkey', 'testValue');
       
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
    }
});

module.exports = {
    dadJokeAPIService: dadJokeAPIService
}