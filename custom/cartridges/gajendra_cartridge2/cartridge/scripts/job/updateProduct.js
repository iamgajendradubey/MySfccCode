importPackage(dw.object);
function updateProductAttribute() {
  var Transaction = require("dw/system/Transaction");
  var ProductMgr = require('dw/catalog/ProductMgr');
 
  try {
    var Logger = require("dw/system/Logger");
    Transaction.wrap(function () {
      co = ProductMgr.queryAllSiteProducts();
      Logger.error("gajendra job is running")
      while (co.hasNext()) {
        var newItem = co.next();
        newItem.custom.isAdult= false
        }
    });
  } catch (error) {
    var Logger = require("dw/system/Logger");
    var a = Logger.getLogger("gajendra","gajendra");
    a.error("elsepart");
  }
}
module.exports = { updateProductAttribute: updateProductAttribute };
