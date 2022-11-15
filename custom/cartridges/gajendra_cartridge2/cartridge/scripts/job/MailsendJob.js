'use strict';

/**
 * Email send hook
 * @param {dw.order.Order} order - The order object to be placed
 * @returns {Object} an error object. Status can have three values 'success', 'fail' or 'flag'
 *         error code that could be mapped to localized resources error Message a string with the
 *         error message, that could be used as a fall-back if error code doesn't have a mapping
 */
importPackage(dw.object);
function stepcheck() {
  var Transaction = require("dw/system/Transaction");
  var CustomObjectMgr = require("dw/object/CustomObjectMgr");
  var HookMgr = require("dw/system/HookMgr");
  var co = null;
  var co2 = null;
  
  try {
    var Logger = require("dw/system/Logger");
    Transaction.wrap(function () {
      // co2 = CustomObjectMgr.getAllCustomObjects("gajendraContactusRecord");
      co = CustomObjectMgr.queryCustomObjects('gajendraContactusRecord', "custom.emailSendStatus={0}" ,null,0)

      while (co.hasNext()) {
        var newItem = co.next();
        var a = Logger.getLogger("gajendra", "gajendra");
        a.error("emailstatus" + newItem.custom.emailSendStatus);
          var content =
            "Name: " +
            newItem.custom.customerName +
            " Message:" +
            newItem.custom.customerMessage;
          Logger.error(content);
          var success = HookMgr.callHook(
            "emailSendHook",
            "SendMailFunction",
            newItem.custom.subjectAssociatedEmail,
            "noreply@us01.dx.commercecloud.salesforce.com",
            newItem.custom.customerSubject,
            content
          );
          if (success) {
           newItem.custom.emailSendStatus = 1;
          }
      }
      co.close();
    });
  } catch (error) {
    var e=error;
    var Logger = require("dw/system/Logger");
    var a = Logger.getLogger("gajendra", "gajendra");
    a.error(e);
  }
}
module.exports = { stepcheck: stepcheck };
