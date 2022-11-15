'use strict';
var server = require('server');
var PageMetaData = require('dw/web/PageMetaData');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
 var Category = require('dw/catalog/Category');
var page=require('*/cartridge/controllers/Search');
server.extend(page);
    server.get(
        'Showpage',
        consentTracking.consent,
        server.middleware.https,
        csrfProtection.generateToken,
        function (req, res, next) {
            var collection = require('*/cartridge/scripts/util/collections');
            var ProductSearchModel = require('dw/catalog/ProductSearchModel');
            var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
            var profileForm = server.forms.getForm('productFinder');
            profileForm.clear();
            var CatalogMgr = require('dw/catalog/CatalogMgr');
            var ProductSearch = require('*/cartridge/models/search/productSearch');

            var parmas = {cgid:"root"}
            var apiProductSearch = new ProductSearchModel();
            apiProductSearch = searchHelper.setupSearch(apiProductSearch, parmas , req.httpParameterMap);

            apiProductSearch.search();
           var refinementData = [];
           collection.map(apiProductSearch.refinements.allRefinementDefinitions, function (product) {
            if(product.attributeID){
                refinementData.push(product.attributeID)
            }
        });
        var productSearch2 = new ProductSearch(
            apiProductSearch,
            req.querystring,
            req.querystring.srule,
            CatalogMgr.getSortingOptions(),
            CatalogMgr.getSiteCatalog().getRoot()
        );
        // var a= productSearch2.addrefinement[0].displayName;
        var a = productSearch2.refinements[0].displayName;
        // var subCatagory = apiProductSearch.category.onlineSubCategories
        var retArr = []
        var sitePrefs: SitePreferences = dw.system.Site.getCurrent().getPreferences();
        var mySitePrefValue: String =
          sitePrefs.getCustom()["customRefineconfig"];
        var refinementsValue = JSON.parse(mySitePrefValue);
        productSearch2.refinements.forEach(element => {
            refinementsValue.forEach(val => {
                if(val === element.displayName){
                    retArr.push(element);
                }
            });

        });
        var refinedData={
                data1:retArr,

        }
        res.render('refiner',{result1:retArr});
         // res.json({result:refinedData});

            next();
        }
    );



    server.get('ShowPLP',  function (req, res, next) {
        var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

        var result = searchHelper.search(req, res);

        if (result.searchRedirect) {
            res.redirect(result.searchRedirect);
            return next();
        }

        res.render('plp', {
            productSearch: result.productSearch,
        });

        return next();
    });


module.exports = server.exports();