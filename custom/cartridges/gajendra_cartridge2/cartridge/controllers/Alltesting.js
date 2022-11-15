'use strict';
var server = require('server');
var cache = require("*/cartridge/scripts/middleware/cache");
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Geolocation = require('dw/util/Geolocation');
var UUIDUtils = require("dw/util/UUIDUtils"); 
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var Logger = require('dw/system/Logger');
var page = require("app_storefront_base/cartridge/controllers/Product");
server.extend(page);
server.append("Show",cache.applyPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
    var productType = showProductPageHelperResult.product.productType;
    var ProductMgr = require('dw/catalog/ProductMgr');
    var pid = req.querystring.pid;
    var product = ProductMgr.getProduct(pid);
    var recommendationArr = [];
    // var cat = product.orderableRecommendations[0].recommendedItem.name;
    var recommendationIterator = product.orderableRecommendations.iterator();
    while (recommendationIterator.hasNext()) {
        var tempRecommendation = recommendationIterator.next();
        recommendationArr.push({product : tempRecommendation.recommendedItem})
    }

    // product.orderableRecommendations.forEach(element => {
    //     var a = element.recommendedItem.name;
    // });
    if ((product.custom.isWineOrNot == true && !customer.isAuthenticated()) || (customer.isAuthenticated() && customer.isMemberOfCustomerGroup('age-less-18') && product.custom.isWineOrNot == true)) {
        res.redirect(URLUtils.url('Product-RestrictedResult'));

    }
    if (!showProductPageHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
        res.setStatusCode(404);
        res.render('error/notFound');
    } else {
        var pageLookupResult = productHelper.getPageDesignerProductPage(showProductPageHelperResult.product);

        if ((pageLookupResult.page && pageLookupResult.page.hasVisibilityRules()) || pageLookupResult.invisiblePage) {
            // the result may be different for another user, do not cache on this level
            // the page itself is a remote include and can still be cached
            res.cachePeriod = 0; // eslint-disable-line no-param-reassign
        }
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
                recommendations: recommendationArr
            });
        }
    }
    next();

})
server.get("Sendmailhook", function(req, res, next){
        var HookMgr = require('dw/system/HookMgr');
        var a = HookMgr.callHook('emailSendHook',"SendMailFunction","gajendra.dubey@codesquaretech.com","sandeep.vishwakarma@codesquaretech.com","Email hook testing","email hook content");
        var gajendra=Logger.getLogger("gajendra","gajendra")
        this.on('route:BeforeComplete',function () {
            gajendra.debug("hook is call beforecomplete route")
        });
        this.on('route:afterComplete',function () {
            gajendra.debug("hook is call aftercomplete route")
         
        });
        res.json({success:a})
    next();
});

server.get("Productfinder", cache.applyDefaultCache, function (req, res, next) {
     var heading="Product Finder";
     
    var URLUtils = require('dw/web/URLUtils');
    var actionUrl = URLUtils.url("Alltesting-SearchResultPage"); //sets the route to call for the form submit action
    var contactform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    contactform.clear();
   
    var data = {
        heading:heading,
        actionUrl: actionUrl,
        SFRAhelloform: contactform,
    };
    res.render("searchinput", data);
    next();
});

server.post(
    "Sendmail",
    cache.applyDefaultCache,
    function (req, res, next) {
        var Mail = require('dw/net/Mail');
        var mail= new Mail();
        var customLogin = server.forms.getForm('loginform');
        var customLoginObj = customLogin.toObject();
        res.setViewData(customLoginObj);
        var form_data = res.getViewData()
        var optionid = form_data.degree.toString();
        var co = null;
        var a = null;
        var sendTo=null;
        var subject=null;
         Transaction.wrap(function () {
            co=CustomObjectMgr.getCustomObject("newContactusgajen",optionid);
            sendTo=co.custom.emailAssociated
            subject=co.custom.subject
         });
         var myarr = sendTo.split(',');
        //  myarr.forEach(element => {
        //     var Mail = require('dw/net/Mail');
        //     var mail= new Mail();
        //     mail.addTo(element);
        //     mail.setFrom("gajendra.dubey@codesquaretech.com");
        //     mail.setSubject(subject);
        //     mail.setContent(form_data.msg);
        //     mail.send()
        // });
        for (let i = 0; i < myarr.length; i++) {
            mail.addTo(myarr[i]);
            mail.setFrom("gajendra.dubey@codesquaretech.com");
            mail.setSubject(subject);
            mail.setContent(form_data.msg);
            mail.send()
        }
        var data={
            num:"Your message is set to The authority successfully"
           };
           res.render('result',data);
           next();
  
    }
);

server.post(
    "SearchResultPage",
    cache.applyDefaultCache,
    function (req, res, next) {
        var MyForm = server.forms.getForm("loginform");
        var MyFormObj = MyForm.toObject();
        MyFormObj.MyForm = MyForm;
        if (MyForm.valid) {
            res.setViewData(MyFormObj);
            var formInfo = res.getViewData();
            // res.redirect(URLUtils.url('ContactUs-Landing','error',"your message is empty"))
         res.json(formInfo.firstname)
         var myarr = formInfo.firstname.split(' ');
         var a="";
         for (let i = 0; i < myarr.length; i++) {
           a+="+"+myarr[i];
        }
         res.redirect("https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com/s/RefArch-gajendra/search?q="+a+"&search-button=&lang=en_US")
       
        }
        else{
            var data={
                num:"Form is invalid"
               };
               res.render('result',data);
        }
           next();
    }
);
server.get("Testing", function(req, res, next){
res.json(data)
next();
var LocaleModel = require('*/cartridge/models/locale');
var Locale = require('dw/util/Locale');
var Site = require('dw/system/Site');

var currentSite = Site.getCurrent();
var siteId = currentSite.getID();
var allowedLocales = currentSite.allowedLocales;
var currentLocale = Locale.getLocale(req.locale.id);
var localeModel = new LocaleModel(currentLocale, allowedLocales, siteId);

var template = req.querystring.mobile
    ? '/components/header/mobileCountrySelector'
    : '/components/header/countrySelector';

    res.json({localeModel:localeModel})

    if (tempLocale==='default') {
        res.render('contactus', { localeModel: localeModel });
    }
        res.render("contactus")
next();
});

module.exports=server.exports();