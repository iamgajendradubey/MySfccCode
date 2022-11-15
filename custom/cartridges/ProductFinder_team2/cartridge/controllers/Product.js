"use strict";

var server = require("server");
var page = require("app_storefront_base/cartridge/controllers/Product");

server.extend(page);
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");
var URLUtils = require("dw/web/URLUtils");
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
    var numberOfProductTiles= 4 //site preferences
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
    var productStatus = false;

    if (productStatus == true) {
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
      numberOfProductTiles:(70/numberOfProductTiles)
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
  var data = {
    num: "you are unautherized to access this Product",
  };
  res.render("result", data);
  next();
});

module.exports = server.exports();
