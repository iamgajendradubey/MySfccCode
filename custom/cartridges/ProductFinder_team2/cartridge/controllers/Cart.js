'use strict';
var server = require('server');
var page=require('*/cartridge/controllers/Search');
server.extend(page);





/**
 * Cart-MiniCart : The Cart-MiniCart endpoint is responsible for displaying the cart icon in the header with the number of items in the current basket
 * @name Base/Cart-MiniCart
 * @function
 * @memberof Cart
 * @param {middleware} - server.middleware.include
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
 server.get('MiniCart', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');

    var currentBasket = BasketMgr.getCurrentBasket();
    var quantityTotal;

    if (currentBasket) {
        quantityTotal = currentBasket.productQuantityTotal;
    } else {
        quantityTotal = 0;
    }

    res.render('/components/header/miniCart', { quantityTotal: quantityTotal });
    next();
});


server.post('AddProduct', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');
    var Transaction = require('dw/system/Transaction');
    var CartModel = require('*/cartridge/models/cart');
    var ProductLineItemsModel = require('*/cartridge/models/productLineItems');
    var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
    var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');

    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    var previousBonusDiscountLineItems = currentBasket.getBonusDiscountLineItems();
    var productId = req.form.pid;
    var childProducts = Object.hasOwnProperty.call(req.form, 'childProducts')
        ? JSON.parse(req.form.childProducts)
        : [];
    var options = req.form.options ? JSON.parse(req.form.options) : [];
 
    var customMsg=null;
    for(var i = 0; i < options.length; i++) {
        if (options[i].optionId == 'EngravingCustomisation') {
            customMsg = options[i].message;
        }
    };
    var quantity;
    var result;
    var pidsObj;
    var items = currentBasket.productLineItems.iterator()
    var productData= []
    while (items.hasNext()) {
        var data = items.next();
        productData.push(data);
    }

    if (currentBasket) {
        Transaction.wrap(function () {
            if (!req.form.pidsObj) {
                quantity = parseInt(req.form.quantity, 10);
                result = cartHelper.addProductToCart(
                    currentBasket,
                    productId,
                    quantity,
                    childProducts,
                    options,
                    customMsg
                );
            } else {
                // product set
                pidsObj = JSON.parse(req.form.pidsObj);
                result = {
                    error: false,
                    message: Resource.msg('text.alert.addedtobasket', 'product', null)
                };

                pidsObj.forEach(function (PIDObj) {
                    quantity = parseInt(PIDObj.qty, 10);
                    var pidOptions = PIDObj.options ? JSON.parse(PIDObj.options) : {};
                    var PIDObjResult = cartHelper.addProductToCart(
                        currentBasket,
                        PIDObj.pid,
                        quantity,
                        childProducts,
                        pidOptions,
                        customMsg
                    );
                    if (PIDObjResult.error) {
                        result.error = PIDObjResult.error;
                        result.message = PIDObjResult.message;
                    }
                });
            }
            if (!result.error) {
                cartHelper.ensureAllShipmentsHaveMethods(currentBasket);
                basketCalculationHelpers.calculateTotals(currentBasket);
            }

        });
    }
  

    var quantityTotal = ProductLineItemsModel.getTotalQuantity(currentBasket.productLineItems);
    var cartModel = new CartModel(currentBasket);

    var urlObject = {
        url: URLUtils.url('Cart-ChooseBonusProducts').toString(),
        configureProductstUrl: URLUtils.url('Product-ShowBonusProducts').toString(),
        addToCartUrl: URLUtils.url('Cart-AddBonusProducts').toString()  
    };

    var newBonusDiscountLineItem =
        cartHelper.getNewBonusDiscountLineItem(
            currentBasket,
            previousBonusDiscountLineItems,
            urlObject,
            result.uuid
        );
    if (newBonusDiscountLineItem) {
        var allLineItems = currentBasket.allProductLineItems;
        var collections = require('*/cartridge/scripts/util/collections');
        collections.forEach(allLineItems, function (pli) {
            if (pli.UUID === result.uuid) {
                Transaction.wrap(function () {
                    pli.custom.bonusProductLineItemUUID = 'bonus'; // eslint-disable-line no-param-reassign
                    pli.custom.preOrderUUID = pli.UUID; // eslint-disable-line no-param-reassign
                });
            }
        });
    }

    var reportingURL = cartHelper.getReportingUrlAddToCart(currentBasket, result.error);

    res.json({
        reportingURL: reportingURL,
        quantityTotal: quantityTotal,
        message: result.message,
        cart: cartModel,
        newBonusDiscountLineItem: newBonusDiscountLineItem || {},
        error: result.error,
        pliUUID: result.uuid,
        minicartCountOfItems: Resource.msgf('minicart.count', 'common', null, quantityTotal)
    });

    next();
});

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
server.replace(
    "Show",
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function (req, res, next) {
      var BasketMgr = require("dw/order/BasketMgr");
      var Transaction = require("dw/system/Transaction");
      var CartModel = require("*/cartridge/models/cart");
      var cartHelper = require("*/cartridge/scripts/cart/cartHelpers");
      var reportingUrlsHelper = require("*/cartridge/scripts/reportingUrls");
      var basketCalculationHelpers = require("*/cartridge/scripts/helpers/basketCalculationHelpers");
  
      var currentBasket = BasketMgr.getCurrentBasket();
      var reportingURLs;

      if (currentBasket) {
        Transaction.wrap(function () {
          if (currentBasket.currencyCode !== req.session.currency.currencyCode) {
            currentBasket.updateCurrency();
          }
          cartHelper.ensureAllShipmentsHaveMethods(currentBasket);
  
          basketCalculationHelpers.calculateTotals(currentBasket);
        });
      }
  
      if (currentBasket && currentBasket.allLineItems.length) {
        reportingURLs =
          reportingUrlsHelper.getBasketOpenReportingURLs(currentBasket);
      }
  
      res.setViewData({ reportingURLs: reportingURLs });
  
      var basketModel = new CartModel(currentBasket);
   
      res.render("cart/cart", basketModel);
      return next();
    }
  );
  

/**
 * Cart-MiniCartShow : The Cart-MiniCartShow is responsible for getting the basket and showing the contents when you hover over minicart in header
 * @name Base/Cart-MiniCartShow
 * @function
 * @memberof Cart
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
 server.get('MiniCartShow', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Transaction = require('dw/system/Transaction');
    var CartModel = require('*/cartridge/models/cart');
    var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
    var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
    var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');

    var currentBasket = BasketMgr.getCurrentBasket();
    var reportingURLs;

    if (currentBasket) {
        Transaction.wrap(function () {
            if (currentBasket.currencyCode !== req.session.currency.currencyCode) {
                currentBasket.updateCurrency();
            }
            cartHelper.ensureAllShipmentsHaveMethods(currentBasket);
            basketCalculationHelpers.calculateTotals(currentBasket);
        });
    }
   
    if (currentBasket && currentBasket.allLineItems.length) {
        reportingURLs = reportingUrlsHelper.getBasketOpenReportingURLs(currentBasket);
    }

    res.setViewData({ reportingURLs: reportingURLs });


    var basketModel = new CartModel(currentBasket);
  

    res.render('checkout/cart/miniCart', basketModel);
    next();
});
/**
 * Cart-RemoveProductLineItem : The Cart-RemoveProductLineItem endpoint removes a product line item from the basket
 * @name Base/Cart-RemoveProductLineItem
 * @function
 * @memberof Cart
 * @param {querystringparameter} - pid - the product id
 * @param {querystringparameter} - uuid - the universally unique identifier of the product object
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - get
 */
 server.get('RemoveProductLineItem', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Resource = require('dw/web/Resource');
    var Transaction = require('dw/system/Transaction');
    var URLUtils = require('dw/web/URLUtils');
    var CartModel = require('*/cartridge/models/cart');
    var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');

    var currentBasket = BasketMgr.getCurrentBasket();

    if (!currentBasket) {
        res.setStatusCode(500);
        res.json({
            error: true,
            redirectUrl: URLUtils.url('Cart-Show').toString()
        });

        return next();
    }

    var isProductLineItemFound = false;
    var bonusProductsUUIDs = [];

    Transaction.wrap(function () {
        if (req.querystring.pid && req.querystring.uuid) {
            var productLineItems = currentBasket.getAllProductLineItems(req.querystring.pid);
            var bonusProductLineItems = currentBasket.bonusLineItems;
            var mainProdItem;
            for (var i = 0; i < productLineItems.length; i++) {
                var item = productLineItems[i];
                if ((item.UUID === req.querystring.uuid)) {
                    if (bonusProductLineItems && bonusProductLineItems.length > 0) {
                        for (var j = 0; j < bonusProductLineItems.length; j++) {
                            var bonusItem = bonusProductLineItems[j];
                            mainProdItem = bonusItem.getQualifyingProductLineItemForBonusProduct();
                            if (mainProdItem !== null
                                && (mainProdItem.productID === item.productID)) {
                                bonusProductsUUIDs.push(bonusItem.UUID);
                            }
                        }
                    }

                    var shipmentToRemove = item.shipment;
                    currentBasket.removeProductLineItem(item);
                    if (shipmentToRemove.productLineItems.empty && !shipmentToRemove.default) {
                        currentBasket.removeShipment(shipmentToRemove);
                    }
                    isProductLineItemFound = true;
                    break;
                }
            }
        }
        basketCalculationHelpers.calculateTotals(currentBasket);
    });

    if (isProductLineItemFound) {
        var basketModel = new CartModel(currentBasket);
        var basketModelPlus = {
            basket: basketModel,
            toBeDeletedUUIDs: bonusProductsUUIDs
        };
        res.json(basketModelPlus);
    } else {
        res.setStatusCode(500);
        res.json({ errorMessage: Resource.msg('error.cannot.remove.product', 'cart', null) });
    }

    return next();
});
module.exports= server.exports();
