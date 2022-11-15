
var server = require("server");
server.get("PriceConverter", function (req,res,next) {
    var querystring = req.querystring;
    var price = querystring.price;
    var helperCurrency = require("cartridge/scripts/helpers/currencyHelpers");
    var desiredCurrency = helperCurrency.currencyCoverter(price).toFixed(2);
    res.render("product/desiredCurrency",{desiredCurrency:desiredCurrency})
    next();

})

module.exports= server.exports();