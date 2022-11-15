
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice = require('*/cartridge/static/serviceStatic/allservicestatic');

var getAccessTokenOcapi = LocalServiceRegistry.createService(Theservice.tokenservice, {
    createRequest: function (svc, params) {
        var Logger = require('dw/system/Logger');
        Logger.debug(JSON.stringify(params))
        svc.setRequestMethod('POST');
        svc.addHeader('Authorization', 'Basic Z2FqZW5kcmEuZHViZXlAY29kZXNxdWFyZXRlY2guY29tOlN0YXJAMTExMTpjb2Rlc3F1YXJlMjAyMg==');
        svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        var wurl = getAccessTokenOcapi.getURL();
        var temurl = wurl + "?client_id=" + params.client_id + "&grant_type=urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken";
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
    }
});

module.exports = {
    getAccessTokenOcapi: getAccessTokenOcapi
}