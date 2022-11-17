"use strict";

var Logger = require("dw/system/Logger");
var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");
var Theservice = require('*/cartridge/static/serviceStatic/recapthastatic');
module.exports.recaptchaService = function (googleRecaptchaSecretKey, token) {
    var recaptchaService = LocalServiceRegistry.createService(Theservice.reCaptchaservice, {
        createRequest: function (service) {
            service.addHeader("Content-Type", "application/x-wwwform-urlencoded");
            service.addParam("secret", googleRecaptchaSecretKey);
            service.addParam("response", token);
        },
        parseResponse: function (service, listOutput) {
            return JSON.parse(listOutput.text);
        }
    });
    try {
        var callServiceResult = recaptchaService.call();
        if (!callServiceResult.isOk()) {
            Logger.getLogger("reCaptcha", "reCaptcha").error("Failed to make request! getErrorMessage={0}", callServiceResult.getErrorMessage());
            return null;
        }
        return callServiceResult;
    } catch (e) {
        Logger.getLogger("reCaptcha", "reCaptcha").error("Failed to make request! e={0}", e.toString());
        return null;
    }
};
