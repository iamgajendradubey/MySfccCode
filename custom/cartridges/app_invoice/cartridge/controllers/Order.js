'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);
var Resource = require('dw/web/Resource');
var Transaction = require('dw/system/Transaction');
var Logger = require('dw/system/Logger');

server.replace(
    'Confirm',
    // consentTracking.consent,
    server.middleware.https,
    // csrfProtection.generateToken,
    function (req, res, next) {
        var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
        var OrderMgr = require('dw/order/OrderMgr');
        var OrderModel = require('*/cartridge/models/order');
        var Locale = require('dw/util/Locale');

        var order;

        if (!req.form.orderToken || !req.form.orderID) {
            res.render('/error', {
                message: Resource.msg('error.confirmation.error', 'confirmation', null)
            });

            return next();
        }
        order = OrderMgr.getOrder(req.form.orderID, req.form.orderToken);
        if (order.shipments[0].shippingAddress) {
            var address1 = order.shipments[0].shippingAddress.address1;
            for (let i = 0; i < address1.length; i++) {
                 address1 = address1.replace(' ' , function(){
                    return "+"
                });
            }
            var city = order.shipments[0].shippingAddress.city.replace(' ','+');
            var postalCode = order.shipments[0].shippingAddress.postalCode;
            var addressQuery = address1+"+"+order.shipments[0].shippingAddress.stateCode+"+"+postalCode;
            var addressQuery = addressQuery.replace(' ' , function(){
                return "+"
            });
            var params = {
                q: addressQuery
              }
              var Geocoding = require('app_invoice/cartridge/scripts/services/geocodingService');
              var svcResult = Geocoding.GeocodingService.call(params);
              if (svcResult.status === 'OK') {
                Transaction.wrap(function () {
                    if (svcResult.object.length != 0) {
                        order.custom.lat = svcResult.object[0].lat;
                        order.custom.lon = svcResult.object[0].lon;
                    }
                    else
                    {
                        order.custom.lat = '22.7357873';
                        order.custom.lon = '75.8541103,13';
                    }
              });
            }
        }
        if (!order || order.customer.ID !== req.currentCustomer.raw.ID) {
            res.render('/error', {
                message: Resource.msg('error.confirmation.error', 'confirmation', null)
            });

            return next();
        }
        var lastOrderID = Object.prototype.hasOwnProperty.call(req.session.raw.custom, 'orderID') ? req.session.raw.custom.orderID : null;
        if (lastOrderID === req.querystring.ID) {
            res.redirect(URLUtils.url('Home-Show'));
            return next();
        }

        var config = {
            numberOfLineItems: '*'
        };

        var currentLocale = Locale.getLocale(req.locale.id);

        var orderModel = new OrderModel(
            order,
            { config: config, countryCode: currentLocale.country, containerView: 'order' }
        );
        var passwordForm;

        var reportingURLs = reportingUrlsHelper.getOrderReportingURLs(order);

        if (!req.currentCustomer.profile) {
            passwordForm = server.forms.getForm('newPasswords');
            passwordForm.clear();
            res.render('checkout/confirmation/confirmation', {
                order: orderModel,
                returningCustomer: false,
                passwordForm: passwordForm,
                reportingURLs: reportingURLs,
                orderUUID: order.getUUID()
            });
        } else {
            res.render('checkout/confirmation/confirmation', {
                order: orderModel,
                returningCustomer: true,
                reportingURLs: reportingURLs,
                orderUUID: order.getUUID()
            });
        }
        req.session.raw.custom.orderID = req.querystring.ID;
        return next();
    }
);

module.exports = server.exports();
