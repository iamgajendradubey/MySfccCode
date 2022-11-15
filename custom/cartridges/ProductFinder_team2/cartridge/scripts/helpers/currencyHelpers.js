var Cache = require("dw/system/CacheMgr");
var service=require("ProductFinder_team2/cartridge/services/currencyconvert");

function currencyCoverter(customCurreny){
    var getCurrenyCache= Cache.getCache("customCurrencyCaches");
    var output = getCurrenyCache.get("currency")
    if(output){
        var finalPrice = output.currentPrice*parseInt(presentPrice);
        return finalPrice
    }else{
        var params ={
            form:"USD",
            to:"EUR",
            amount:"1"
        };

        var svcResult= service.currency.call(params);
        if(svcResult.status==="OK"){
            getCurrenyCache.put("currency",svcResult.object);
            return svcResult.object.currentPrice *parseInt(presentPrice);
        }
        return svcResult.object;

    }

}
module.exports={
    currencyCoverter:currencyCoverter
}