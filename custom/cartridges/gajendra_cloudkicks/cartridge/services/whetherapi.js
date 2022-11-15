
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice=require('*/cartridge/static/staticservice')
var WetherAPIService = LocalServiceRegistry.createService(Theservice.service2, {
    createRequest: function (svc, params) {
        var Logger = require('dw/system/Logger');
        Logger.debug(JSON.stringify(params))
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
        var wurl = WetherAPIService.getURL();
        wurl=wurl.replace("{lat}",params.lat);
        wurl=wurl.replace("{lon}",params.lat);
        wurl=wurl.replace("{exclude}",params.exclude);
        wurl=wurl.replace("{appid}",params.appid);

        // var temurl = "lat=" + params.lat + "&lon="+params.lon+"&exclude="+params.exclude +","+ params.daily+"&appid="+params.appid;
        svc.setURL(wurl);
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
    WetherAPIService: WetherAPIService
}