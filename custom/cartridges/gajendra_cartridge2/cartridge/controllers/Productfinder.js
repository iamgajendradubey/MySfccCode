'use strict';
var server = require('server');
var PageMetaData = require('dw/web/PageMetaData');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
    var Category = require('dw/catalog/Category');
// var page=require('*/cartridge/controllers/Search');
// server.extend(page);
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
        productSearch2.refinements.forEach(element => {
                   retArr.push(element);

        });
        var refinedData={
                data1:retArr,

        }
        var brand=[];
        var color=[];
        var category=[];
        //  for (let i = 0; i < retArr.length; i++) {
        //     category.push(retArr[0]);


        //  }
       

        res.render('productFinder',{result1:retArr});

        // res.json({result:refinedData});
            // var praducts=CatalogMgr.getSiteCatalog().getCategory('mens-cloths-suits')


            // res.render('productFinder');

            next();
        }
    );

    server.get('ShowProduct',  function (req, res, next) {
        var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
        var result = searchHelper.search(req, res);

        if (result.searchRedirect) {
            res.redirect(result.searchRedirect);
            return next();
        }

        res.render('search/searchResultsNoDecorator', {
            productSearch: result.productSearch,
            maxSlots: result.maxSlots,
            reportingURLs: result.reportingURLs,
            refineurl: result.refineurl
        });

        return next();
    });

    server.get('ShowPLP',  function (req, res, next) {
        var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

        var result = searchHelper.search(req, res);

        if (result.searchRedirect) {
            res.redirect(result.searchRedirect);
            return next();
        }

        res.render('plp', {
            productSearch: result.productSearch,
            maxSlots: result.maxSlots,
            reportingURLs: result.reportingURLs,
            refineurl: result.refineurl
        });

        return next();
    });


module.exports = server.exports();