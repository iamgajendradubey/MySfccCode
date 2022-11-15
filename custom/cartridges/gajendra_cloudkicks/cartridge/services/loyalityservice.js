
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice=require('*/cartridge/static/staticservice')
var LoyalityPoints = LocalServiceRegistry.createService(Theservice.service3, {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
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
    LoyalityPoints: LoyalityPoints
}