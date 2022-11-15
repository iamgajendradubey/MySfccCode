var server=require('server');
var cache = require("*/cartridge/scripts/middleware/cache");
var Logger = require('dw/system/Logger');
server.get('TypeOfNumber',cache.applyDefaultCache,function (req,res,next) {
    var a=req.querystring;
    if (a.num==null) {
        result="please enter Number ";
        data={
            num:result
           };
           res.render('result',data);
           next();
           return;
    }
    var num=parseInt(a.num);
    var text = a.num.toString();
    //  Logger.error(num);
    //  Logger.error(typeof num);
     var result=null;
     if (isNaN(text)) {
        result="Please enter a numeric value";
     }
     else{
     if (num%2==0) {
        result="Number "+ num +" is an EVEN number";
     }
     if (num %2!=0) {
        result="Number "+ num +" is an ODD number";
     }
    }
    data={
     num:result 
    };
    res.render('result',data);
    next();
});

server.get('Datetask',cache.applyDefaultCache,function (req,res,next) {
    var a=req.querystring;
    if (a.mydate==null) {
        result="please enter Date ";
        data={
            num:result
           };
           res.render('result',data);
           next();
           return;
    }
    var mydate=a.mydate.toString();
    var myarr=mydate.split("/")
     Logger.error(mydate);
     Logger.error(typeof mydate);
     var result=myarr;
     if(myarr[0]<13){
        if (myarr[0].length==1) {
            myarr[0]="0"+myarr[0];
        }
     }else{
        result="please enter valid value for month";
        data={
            num:result
           };
           res.render('result',data);
           next();
           return;
     }
     if(myarr[1]<32){
        if (myarr[1].length==1) {
            myarr[1]="0"+myarr[1];
        }
     }else{
        result="please enter valid value for day";
        data={
            num:result
           };
           res.render('result',data);
           next();
           return;
     }
        if (myarr[2].length==2) {
            myarr[2]="20"+myarr[2];
        }

        var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        ​
       result3= myarr[0]+"/"+myarr[1]+"/"+myarr[2];
       result1=myarr[1]+" "+mS[myarr[0]-1]+", "+myarr[2];
       result2=mL[myarr[0]-1]+" "+myarr[1]+", "+myarr[2];
    data={
     num1:result1,
     num2:result2,
     num3:result3
    };
    res.render('dateisml',data);
    next();
});

server.get('ismltag',cache.applyDefaultCache,function (req,res,next) {
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   
    res.render('ismltag');
    next();
});

server.get('LoyalityPoints',cache.applyDefaultCache,function (req,res,next) {
    
    var points=dw.system.Site.current.preferences.custom.LoyalityPoints;
    data={
        num:points
    }
    // res.json(data);
    res.render("loyalitypoint",data);
    
    next();
});

server.get('FindPByCatagory',cache.applyDefaultCache,function (req,res,next) {
    
    var Categories = require('*/cartridge/models/categories');
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var collections = require('*/cartridge/scripts/util/collections');
    var a=req.querystring.cgid;
    if (a==null) {
       var result="please Enter Category";
        data={
            num:result
           };
           res.render('result',data);
           next();
           return;
    }
    else{
        var result = CatalogMgr.getCategory(a.toLowerCase());
        if(result != null)
        {
        var ProductArr =   collections.map(result.products, function (bundledProduct) {
        return {
            ID: bundledProduct.ID ,
            productName : bundledProduct.name ,
            productId : bundledProduct.getID() ,
            productStatus : bundledProduct.isOnline()
        };
        });
        if (ProductArr.length!=0) {
            res.render("allproductisml" ,{num: ProductArr});
        }
        else{
            var error  =a +" is Main Category,please Add SubCategory To It";
        data={
            num:error
           };
           res.render('result',data);
           next()
           return;
        }
     }
    else
    {
      var error  =a+"is not valid,please Enter Valid Category";
        data={
            num:error
           };
           res.render('result',data);
    }
    }
    
    next();




    var Categories = require('*/cartridge/models/categories');
    
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var inputcategory=CatalogMgr.getCategory('electronics-televisions');
    var inputcategory=CatalogMgr.getCategory('newhome');
   
    var collections = require('*/cartridge/scripts/util/collections');

    var a=req.querystring.cgid;
    if (a==null) {
        result="please Enter Category";
        data={
            num:result
           };
           res.render('result',data);
           next();
           return;
    }
    else{

        var result = CatalogMgr.getCategory(a.toLowerCase());
        if(result != null)
        {

        var ProductArr =   collections.map(result.products, function (bundledProduct) {
        return {
            ID: bundledProduct.ID ,
            productName : bundledProduct.name , pid : bundledProduct.getID() , productStatus : bundledProduct.isOnline()
        };
        });

       res.render('displayCategoryProduct' ,{product: ProductArr});
     }
    else
    {
        res.render('displayCategoryProduct' , {error: 'Invalid Category'})
    }
    }
    res.json(inputcategory);
    
    var ProductMgr = require('dw/catalog/ProductMgr');

    // var CategoryAssignment = require('dw/catalog/CategoryAssignment');
//     var PersistentObject = require('dw/object/PersistentObject');
//    var ExtensibleObject = require('dw/object/ExtensibleObject');
    var siteRootCategory = CatalogMgr.getSiteCatalog().getRoot();
    var sitecategory=CatalogMgr.getSiteCatalog()
    var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ?
    siteRootCategory.getOnlineSubCategories() : null;
    var Mymaincarray=[];
    // var Allproduct=siteRootCategory.getproduct()
    var gsubCategories=[];
    var nextcatagoryline=topLevelCategories[2].getOnlineSubCategories();
    var b=new Categories(topLevelCategories);
    
    for (let i = 0; i < b.categories.length; i++) {
        Mymaincarray.push(b.categories[i].id);
        var k=b.categories[i].subCategories;
    }
    // b.categories.forEach(subCategories, function (subcategory) {
    //     Mymaincarray.push(subcategory.id)
    // });
    
   
   
   
    var querystring = req.querystring;
    var cgid = querystring.cgid;
    var productData = [];
    var collections = require('*/cartridge/scripts/util/collections');
    var result = CatalogMgr.getCategory(cgid.toLowerCase());

    if(result != null)
    {
    var ProductArr =   collections.map(result.products, function (bundledProduct) {
    return {
        ID: bundledProduct.ID ,
        productname : bundledProduct.name , productid : bundledProduct.getID() , productstatus : bundledProduct.isOnline()
    };
});
       res.render("allproductisml" ,{num: ProductArr});
    }
    next();
});

server.get('FindByCatagory',cache.applyDefaultCache,function (req,res,next) {
    var Categories = require('*/cartridge/models/categories');
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var collections = require('*/cartridge/scripts/util/collections');
    var a=req.querystring.cgid;
    if (a==null) {
       var result="please Enter Category";
        data={
            num:result
           };
           res.render('result',data);
           next();
           return;
    }
    else{
        var result = CatalogMgr.getCategory(a.toLowerCase());
        if(result != null)
        {

        var ProductArr =   collections.map(result.products, function (bundledProduct) {
        return {
            ID: bundledProduct.ID ,
            productName : bundledProduct.name ,
            productId : bundledProduct.getID() ,
            productStatus : bundledProduct.isOnline()
        };
        });
        if (ProductArr.length!=0) {
            res.render("allproductisml" ,{num: ProductArr});
        }
        else{
            var error  =a +" is Main Category,please Add SubCategory To It";
        data={
            num:error
           };
           res.render('result',data);
           next()
           return;
        }
     }
    else
    {
      var error  =a+"is not valid,please Enter Valid Category";
        data={
            num:error
           };
           res.render('result',data);
    }
    }
    
    next();
});

server.get('InputForm',cache.applyDefaultCache,function (req,res,next) {
    var URLUtils = require('dw/web/URLUtils');
    var actionUrl = URLUtils.url("Task-RedirectFind"); //sets the route to call for the form submit action
    var SFRAhelloform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    SFRAhelloform.clear();

    var data = {
        heading: "All Test",
        actionUrl: actionUrl,
        SFRAhelloform: SFRAhelloform,
    };
    res.render("allinputform", data);
    next();
});

server.get('pagedesigner',function(req,res,next){
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
      var Site = require('dw/system/Site');
      pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
   
       var page = PageMgr.getPage('page1');
   
       if (page && page.isVisible()) {
           res.page('page1');
       } else {
           res.render("anymagical");
       }
next();
});


server.get('GetAllProducts', function (req, res, next) {
    var SearchModel = require('*/cartridge/scripts/helpers/searchHelpers.js');
    var allpro = SearchModel.search(req, res);
    data={
        num:allpro.productSearch.productIds
       };
    res.render("allproductisml",data);
    next();
});

server.post(
    "RedirectFind",
    cache.applyDefaultCache,
    function (req, res, next) {
        var URLUtils = require('dw/web/URLUtils');
        var actionUrl = URLUtils.url("Task-RedirectFind"); 
        var customLogin = server.forms.getForm('loginform');
        var customLoginObj = customLogin.toObject();
        res.setViewData(customLoginObj);
        var form_data = res.getViewData()
        var qparamvalue = form_data.Inputtext
        var qparamkey = form_data.degree.toString();
        if (qparamkey=="num") {
            res.redirect(URLUtils.url('Task-TypeOfNumber',qparamkey,qparamvalue))
        }
        if (qparamkey=="mydate") {
            res.redirect(URLUtils.url('Task-Datetask',qparamkey,qparamvalue))
        }
        if (qparamkey=="cgid") {
            res.redirect(URLUtils.url('Task-FindByCatagory',qparamkey,qparamvalue))
        }
       
           res.render('result',{num:"error"});
           next();
    next();
    }
);

server.get('FetchLoyalityPoints',function(req,res,next){
    var service = require('gajendra_cartridge2/cartridge/services/loyalityservice');
    
    var properties = {};
    var template = 'magic2';
    
    
    var svcResult = service.LoyalityPoints.call();
    var Logger = require('dw/system/Logger').getLogger("gajendra","deloper");
    Logger.error(svcResult.object)
    if (svcResult.status === 'OK'){
        properties.joke = svcResult.object;
    }else{
        properties.joke = svcResult.errorMessage;
    }
    res.render(template, properties);
    next();
});

module.exports=server.exports();