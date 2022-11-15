var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice = require('*/cartridge/static/serviceStatic/allservicestatic');
var ProductListService = LocalServiceRegistry.createService(Theservice.plpservice, {
    createRequest: function (svc, params) {
        var Logger = require('dw/system/Logger');
        Logger.debug(JSON.stringify(params))
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
        
        var wurl = ProductListService.getURL();
        // wurl.addparam()
        var temurl = wurl+"?refine=" + params.refine + "&expand=images,prices&client_id=88186553-367a-4c61-8161-992902296e76";
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
    ProductListService: ProductListService
}