/* eslint-disable no-undef */
'use strict';

/**
 * @namespace Home
 */
var page=module.superModule;
var server = require('server');
server.extend(page);
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.replace( 'Show',consentTracking.consent,cache.applyDefaultCache,function (req, res, next) {
        var Site = require('dw/system/Site');
        var PageMgr = require('dw/experience/PageMgr');
        var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

        pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

        var page = PageMgr.getPage('gTest');

        if (page && page.isVisible()) {
            res.page('gTest');
        } else {
            res.render('home/homePage');
        }
        next();
    },
    pageMetaData.computedPageMetaData
);




module.exports = server.exports();
