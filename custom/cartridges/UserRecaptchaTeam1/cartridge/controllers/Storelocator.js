var server = require('server');
var geolocation = require('dw/util/Geolocation');
var StoreMgr = require('dw/catalog/StoreMgr');
var Collection = require('dw/util/Collection');
var URLUtils = require('dw/web/URLUtils');

server.get('Show',function(req,res,next) {
  res.render('Nearstores');
  next();
});

server.get('MapShow',function(req,res,next) {
  res.render('Findmap');
  next();
});

server.get('Find2',function(req,res,next) {
var latitude=req.geolocation.latitude;
var longitude=req.geolocation.longitude;
var a=req.geolocation;

var apikey='8911ddd0-454a-11ed-bf99-d78cb9a76287';
var postalcode= req.querystring.postalcode;
var params ={
  apikey:apikey,
  postalcode:postalcode
}
var storeLocator = require('UserRecaptchaTeam1/cartridge/services/storeLocatorService');
// var svcResult = storeLocator.storeLocatorService(apikey, postalcode);
var properties={};
var arr =[];
var svcResult = storeLocator.storeLocatorService.call(params);

if(svcResult.status === 'OK'){
  properties.stores = svcResult.object;
}
var result = properties.stores.results[postalcode];
for( i=0; i< result.length ; i++){
  arr.push(result[i]);
}
// var Result2 = StoreMgr.searchStoresByPostalCode(arr[0].country_code, postalcode ,'mi',30).keySet();
// var Result3 = StoreMgr.searchStoresByPostalCode(arr[6].country_code, postalcode ,'mi',30).keySet();
var storesList=[];
for (let i = 0; i < arr.length; i++) {
  if((StoreMgr.searchStoresByPostalCode(arr[i].country_code, postalcode ,'mi',30).keySet()).length != 0){
    var Result2 = StoreMgr.searchStoresByPostalCode(arr[i].country_code, postalcode ,'mi',30).keySet();
    var storeresult=Result2.iterator();

    while (storeresult.hasNext()) {
        var a=storeresult.next();
        storesList.push(a);
    }
  };
}




// var storeresult=Result2.iterator();

// while (storeresult.hasNext()) {
//     var a=storeresult.next();
//     stores.push(a);
// }
var data={
    stores:storesList
}
res.render('Nearstores',data);
// res.json(stores);
  next();
// res.json({
//   arr:arr
// });
// next();
var Result=StoreMgr.searchStoresByCoordinates(latitude, longitude ,'mi',30).keySet();
// var Result2=StoreMgr.searchStoresByPostalCode('IN', '452001' ,'mi',30).keySet();
var stores=[];
var storeresult=Result.iterator();
while (storeresult.hasNext()) {
    var a=storeresult.next();
    stores.push(a);
}
var data={
    stores:stores
}
res.render('Nearstores',data);
// res.json(stores);
    // next();

});

server.get("Find", function (req, res, next) {
  var pincode = req.querystring.postalcode.toString();
  var stores = [];
  if (pincode == null || pincode == "") {
    var latitude = req.geolocation.latitude;
    var longitude = req.geolocation.longitude;
    var a = req.geolocation;
    var Result = StoreMgr.searchStoresByCoordinates(latitude,longitude,"mi", 30).keySet();
    // var Result2=StoreMgr.searchStoresByPostalCode('IN', '452001' ,'mi',30).keySet();
   
    var storeresult = Result.iterator();

    while (storeresult.hasNext()) {
      var a = storeresult.next();
      stores.push(a);
    }
  } else {
    var latitude = req.geolocation.latitude;
    var longitude = req.geolocation.longitude;
    var a = req.geolocation.countryCode;
    var b = a.toString();
    // var Result=StoreMgr.searchStoresByCoordinates(latitude, longitude ,'mi',30).keySet();
    var Result2 = StoreMgr.searchStoresByPostalCode('US',pincode,"mi",30).keySet();
    
    var storeresult = Result2.iterator();

    while (storeresult.hasNext()) {
      var a = storeresult.next();
      stores.push(a);
    }
  }
  var data = {
    stores: stores,
    zipcode:pincode
  };
  // res.json(data);
  res.render("Nearstores", data);
  next();
});

server.get('GetMap',function(req,res,next){
  var postalcode= req.querystring.postalcode;
  var countryCode= req.querystring.countrycode;
  var CacheMgr =require('dw/system/CacheMgr');
  var a = CacheMgr.getCache('GajendraLocationCashe');
  var properties = {};
  var template = 'Findmap';
  properties.response=a.get(countryCode+postalcode);
  properties.postalcode=postalcode;
  properties.countrycode=countryCode;
  if (properties.response) {
      res.json(properties);
      // res.render(template,properties);
  }else{
    var apikey='8911ddd0-454a-11ed-bf99-d78cb9a76287';
    var params ={
      apikey:apikey,
      postalcode:postalcode,
      country:countryCode
    }
    var storeLocator = require('UserRecaptchaTeam1/cartridge/services/storeLocatorService');
    // var svcResult = storeLocator.storeLocatorService(apikey, postalcode);
   
    var arr =[];
    var svcResult = storeLocator.storeLocatorService.call(params);
    
    if(svcResult.status === 'OK'){
      properties.response = svcResult.object;
    }
    if (properties.response.results!='') {
      
      var result = properties.response.results[postalcode];
    }else{
      var result = [];
    }
    for( i=0; i< result.length ; i++){
      var location={
        latitude:result[i].latitude,
        longitude:result[i].longitude,
        city:result[i].city
      }
      arr.push(location);
    }
    a.put(countryCode+postalcode,arr);
    properties.response= arr;
    res.json(properties);
    // res.render(template,properties);
  
  }
      next();
  });

server.get('GetMap2',function(req,res,next){
  var postalcode= req.querystring.postalcode;
  var countryCode= req.querystring.countrycode;
  var CacheMgr =require('dw/system/CacheMgr');
  var a = CacheMgr.getCache('GajendraLocationCashe');
  var properties = {};
  var template = 'Findmap';
  properties.response=a.get(countryCode+postalcode);
  properties.postalcode=postalcode;
  properties.countrycode=countryCode;
  if (properties.response) {
      // res.json(properties);
      res.render(template,properties);
  }else{
    var apikey='8911ddd0-454a-11ed-bf99-d78cb9a76287';
    var params ={
      apikey:apikey,
      postalcode:postalcode,
      country:countryCode
    }
    var storeLocator = require('UserRecaptchaTeam1/cartridge/services/storeLocatorService');
    // var svcResult = storeLocator.storeLocatorService(apikey, postalcode);
   
    var arr =[];
    var svcResult = storeLocator.storeLocatorService.call(params);
    
    if(svcResult.status === 'OK'){
      properties.response = svcResult.object;
    }
    if (properties.response.results!='') {
      
      var result = properties.response.results[postalcode];
    }else{
      var result = [];
    }
    for( i=0; i< result.length ; i++){
      var location={
        latitude:result[i].latitude,
        longitude:result[i].longitude,
        city:result[i].city
      }
      arr.push(location);
    }
    a.put(countryCode+postalcode,arr);
    properties.response= arr;
    // res.json(properties);
    res.render(template,properties);
  
  }
      next();
  });
module.exports = server.exports();