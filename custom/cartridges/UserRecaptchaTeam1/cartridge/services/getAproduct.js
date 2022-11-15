
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice = require('*/cartridge/static/serviceStatic/allservicestatic');

var GetProduct = LocalServiceRegistry.createService('storeLocatorTeam1', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        var temurl = "https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com/s/RefArch-gajendra/dw/shop/v22_8/products/"+params+"?expand=images,prices&client_id=88186553-367a-4c61-8161-992902296e76";
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
    GetProduct: GetProduct
}