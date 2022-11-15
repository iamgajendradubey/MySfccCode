"use strict";
function order() {
     var Logger = require("dw/system/Logger");
     var Order = require('dw/order/Order');
    var OrderHistory = require('dw/customer/OrderHistory');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var profile = CustomerMgr.getCustomerByLogin("aamir.bohra@codesquaretech.com");
    var orders = profile.OrderHistory.orders;
    var arr = []
    Logger.debug(`${profile} - profile`);
    // while (orders.hasNext()) {
    //     var newItem = orders.next();
    //     arr.push(newItem.orderNo)
    //     Logger.debug(newItem.orderNo);
    //     // Logger.debug(newItem.ORDER_STATUS_CREATED);

    
       Logger.error(JSON.stringify(arr));
}
module.exports = { order: order };