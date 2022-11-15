var server = require('server');
var geolocation = require('dw/util/Geolocation');
var StoreMgr = require('dw/catalog/StoreMgr');
var Collection = require('dw/util/Collection');
var URLUtils = require('dw/web/URLUtils');

server.get('Show', function (req, res, next) {
  var myform = server.forms.getForm('geocoding')
  res.render('Geocoding', {
    myform: myform
  });
  next();
});

server.get('GetAddress', function (req, res, next) {
  var address = req.querystring.q;
  var CacheMgr = require('dw/system/CacheMgr');
  var a = CacheMgr.getCache('GajendraLocationCashe');
  var properties = {};
  var template = 'Findmap';
  properties.response = a.get(address);
  if (properties.response) {
    res.json(properties);
    // res.render(template,properties);
  } else {
    var params = {
      q: address
    }
    // res.json(params);
    var Geocoding = require('UserRecaptchaTeam1/cartridge/services/geocodingService');
    // var svcResult = Geocoding.GeocodingService(apikey, postalcode);

    var arr = [];
    var svcResult = Geocoding.GeocodingService.call(params);

    if (svcResult.status === 'OK') {
      properties.response = svcResult.object;
    }
    // res.json({succes:svcResult});
    // next();
    for (var i = 0; i < properties.response.length; i++) {
      var location = {
        latitude: properties.response[i].lat,
        longitude: properties.response[i].lon,
        city: properties.response[i].display_name
      }
      arr.push(location);
    }
    a.put(address, arr);
    properties.response = arr;
    res.json(properties);
    // res.render(template,properties);

   }
        next();
});
module.exports = server.exports();
