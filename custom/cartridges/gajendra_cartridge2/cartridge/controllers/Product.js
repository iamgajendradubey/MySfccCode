"use strict";

var server = require("server");
var page = require("app_storefront_base/cartridge/controllers/Product");

server.extend(page);
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");
var URLUtils = require("dw/web/URLUtils");

/**
 * @typedef ProductDetailPageResourceMap
 * @type Object
 * @property {String} global_availability - Localized string for "Availability"
 * @property {String} label_instock - Localized string for "In Stock"
 * @property {String} global_availability - Localized string for "This item is currently not
 *     available"
 * @property {String} info_selectforstock - Localized string for "Select Styles for Availability"
 */

  /**
  * Product-Show : This endpoint is called to show the details of the selected product
  * @name gajendra_cartridge2/Product-Show
  * @function
  * @memberof Product
  * @param {middleware} - cache.applyPromotionSensitiveCache
  * @param {middleware} - consentTracking.consent
  * @param {querystringparameter} - pid - Product ID
  * @param {category} - non-sensitive
  * @param {renders} - isml
  * @param {serverfunction} - get
  */


// Appending to show method
server.append("Show",function (req, res, next) {
    // var Product = require("dw/catalog/Product");
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
    var productType = showProductPageHelperResult.product.productType;
    var ProductMgr = require("dw/catalog/ProductMgr");
    var Logger = require('dw/system/Logger');
    var b= Logger.getLogger("gajend","gajend");
    b.error("this is append logger");

    var numberOfProductTiles= dw.system.Site.current.preferences.custom.numberOfProductTiles; //site preferences
    var productId = req.querystring.pid;
    var product = ProductMgr.getProduct(productId);
    var recommendationProducts = [];
    
    var co = product.orderableRecommendations.iterator();
    while (co.hasNext()) {
      var tempRecommendation = co.next();
      recommendationProducts.push({
        product: tempRecommendation.recommendedItem,
        pid:tempRecommendation.recommendedItem.ID
      });
    }
    var productStatus = product.custom.isAdult;
    if ((productStatus==true && !customer.isAuthenticated()|| (customer.isAuthenticated() && !customer.isMemberOfCustomerGroup('Above18year') && productStatus == true))) {
      res.redirect(URLUtils.url("Product-WarnPage"));
    }
   
    var pageLookupResult = productHelper.getPageDesignerProductPage(showProductPageHelperResult.product);

    if (pageLookupResult.page) {
        res.page(pageLookupResult.page.ID, {}, pageLookupResult.aspectAttributes);
    } else {
      
    res.render(showProductPageHelperResult.template, {
      product: showProductPageHelperResult.product,
      addToCartUrl: showProductPageHelperResult.addToCartUrl,
      resources: showProductPageHelperResult.resources,
      breadcrumbs: showProductPageHelperResult.breadcrumbs,
      canonicalUrl: showProductPageHelperResult.canonicalUrl,
      schemaData: showProductPageHelperResult.schemaData,
      recommendationProducts: recommendationProducts,
      numberOfProductTiles:Math.round(70/numberOfProductTiles)
    });
    }
    next();
  });


// server.prepend(
//   "Show",
//   cache.applyPromotionSensitiveCache,
//   consentTracking.consent,
//   function (req, res, next) {
//  var Logger = require('dw/system/Logger');
//  var a= Logger.getLogger("gajend","gajend");
//  a.error("hello,this is prepend logger");
// next();
//   }
// )


// server.replace(
//   "Show",
//   cache.applyPromotionSensitiveCache,
//   consentTracking.consent,
//   function (req, res, next) {
//     var v1="gajendra";
//     v1.replace("*******")
//  var Logger = require('dw/system/Logger');
//  var a= Logger.getLogger("gajend","gajend");
//  a.error("this is replace function"+v1);
//  res.json({success:false});
// next();
//   }
// )

server.get(
  "Testing",
  cache.applyPromotionSensitiveCache,
  consentTracking.consent,
  function (req, res, next) {
 var Logger = require('dw/system/Logger');
 var a= Logger.getLogger("gajend","gajend");
 a.error("hello,this is remont include");
 res.render('result',{
  num:"hello remont"
 })
next();
  }
)

server.get("WarnPage", function (req, res, next) {
  
  res.render("Warning");
  next();
});

module.exports = server.exports();
