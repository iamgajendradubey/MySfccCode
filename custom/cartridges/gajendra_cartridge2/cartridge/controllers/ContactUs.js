"use Strict";

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var URLUtils = require("dw/web/URLUtils");
var Transaction = require("dw/system/Transaction");
var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Geolocation = require("dw/util/Geolocation");
var UUIDUtils = require("dw/util/UUIDUtils");
var Resource = require('dw/web/Resource');
var page = require("app_storefront_base/cartridge/controllers/ContactUs");
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.extend(page);

/**
 * ContactUs-Landing : This endpoint is called to load custom contact us landing page
 * @name ContactUs-Landing
 * @function
 * @memberof ContactUs
 * @param {middleware} - cache.applyDefaultCache
 * @param {renders} - contactus isml
 * @param {serverfunction} - get
 */
 function validateCaptcha(token) {
  var currencyconvert = require('*/cartridge/services/recaptchaService');
  var secretkey='6LcrJkIiAAAAAH5THR-8NGi6J9SpK6L5kDoyhRfr';
  var svcResult = currencyconvert.recaptchaService(secretkey,token);

  if (svcResult.status === 'OK'){
      var a = svcResult.object;
      if (a.success) {
         if (a.score >0.3) {
          return true;
         }else{
          return false;
         }
      }else{
          return false;
      }
  }else{
      return false;
  }

}


server.replace("Landing", cache.applyDefaultCache,csrfProtection.generateToken, function (req, res, next) {
  var constant = require("*/cartridge/scripts/constants/constants.js");
  var heading = "Contact Us";
  var errorMessage = "";
  if (req.querystring.error != null) {
    var errorMessage = req.querystring.error;
  }
  var successMessage = "";
  if (req.querystring.success != null) {
    var successMessage = req.querystring.success;
  }
  if (request.geolocation.countryCode == "IN") {
    request.setLocale(constant.EN_US);
  } else {
    request.setLocale(constant.FR_FR);
    heading = "Nous contacter";
  }
  var URLUtils = require("dw/web/URLUtils");
  var CustomObjectMgr = require("dw/object/CustomObjectMgr");
  var actionUrl = URLUtils.url("ContactUs-SaveContactus"); //sets the route to call for the form submit action
  var contactform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
  
  contactform.clear();
  var co = null;
  var myarr = [];
  co = CustomObjectMgr.getAllCustomObjects("newContactusgajen");
  while (co.hasNext()) {
    var newItem = co.next();
    var option = {
      optionid: newItem.custom.id,
      subject: newItem.custom.subject,
      AssociateEmail: newItem.custom.emailAssociated,
    };
    myarr.push(option);
  }
  var data = {
    errorMessage: errorMessage,
    successMessage: successMessage,
    heading: heading,
    options: myarr,
    actionUrl: actionUrl,
    SFRAhelloform: contactform,
  };

  co.close();

  res.render("contactus", data);
  next();
});

/**
 * ContactUs-Sendmail : This endpoint is called to send mail to associated mails
 * @name ContactUs-SaveContactus
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {renders} - isml
 * @param {serverfunction} - post
 */

server.post("Sendmail", cache.applyDefaultCache, function (req, res, next) {
  var Mail = require("dw/net/Mail");
  var mail = new Mail();
  var customLogin = server.forms.getForm("loginform");
  var customLoginObj = customLogin.toObject();
  res.setViewData(customLoginObj);
  var form_data = res.getViewData();
  var optionid = form_data.degree.toString();
  var co = null;
  var a = null;
  var sendTo = null;
  var subject = null;
  Transaction.wrap(function () {
    co = CustomObjectMgr.getCustomObject("newContactusgajen", optionid);
    sendTo = co.custom.emailAssociated;
    subject = co.custom.subject;
  });
  var myarr = sendTo.split(",");

  for (let i = 0; i < myarr.length; i++) {
    mail.addTo(myarr[i]);
    mail.setFrom("gajendra.dubey@codesquaretech.com");
    mail.setSubject(subject);
    mail.setContent(form_data.msg);
    mail.send();
  }
  var data = {
    num: "Your message is set to The authority successfully",
  };
  res.render("result", data);
  next();
});

/**
 * ContactUs-SaveContactus : This endpoint is called to submit contact us form
 * @name ContactUs-SaveContactus
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {renders} - isml
 * @param {serverfunction} - post
 */

server.post(
  "SaveContactus",
  cache.applyDefaultCache,
  csrfProtection.validateAjaxRequest,
  function (req, res, next) {
    var MyForm = server.forms.getForm("loginform");
    var MyFormObj = MyForm.toObject();
    MyFormObj.MyForm = MyForm;
    
    if (MyForm.valid) {
      res.setViewData(MyFormObj);
      var formInfo = res.getViewData();
      
      // .....Captcha validation............
      var Recaptchatoken=formInfo.recaptcha;
      var output=validateCaptcha(Recaptchatoken);
     
      if (!output) {
        var errorMessage=Resource.msg('error.message.to.invalidcaptcha', 'contactus', "Sorry! Your captcha validation failed");
      res.redirect(URLUtils.url("ContactUs-Landing", "error", errorMessage));
      return next()
    }
     
      var optionid = formInfo.degree.toString();
      var co = null;
      var a = null;
      var sendTo = null;
      var subject = null;
      Transaction.wrap(function () {
        co = CustomObjectMgr.getCustomObject("newContactusgajen", optionid);
        sendTo = co.custom.emailAssociated;
        subject = co.custom.subject;
      });
      var myarr = sendTo.split(",");

      for (let i = 0; i < myarr.length; i++) {
        var a = null;
        Transaction.wrap(function () {
          var id = UUIDUtils.createUUID();
          a = CustomObjectMgr.createCustomObject("gajendraContactusRecord", id);
          a.custom.customerName = formInfo.firstname + " " + formInfo.lastname;
          a.custom.customerEmail = formInfo.email;
          a.custom.customerSubject = subject;
          a.custom.customerMessage = formInfo.msg;
          a.custom.subjectAssociatedEmail = myarr[i];
          a.custom.emailSendStatus = 0;
        });
      }
     
     var successMessage=Resource.msg('success.message.to.submit.contactus', 'contactus', "Thank You!! Your Enquiry is saved successfully");
      res.redirect(
        URLUtils.url("ContactUs-Landing", "success",successMessage)
      );
    } else {
     var errorMessage=Resource.msg('error.message.to.empty.field', 'contactus', "Your Enquiry message is empty");
      res.redirect(
        URLUtils.url("ContactUs-Landing", "error", errorMessage)
      );
    }
    next();
  }
);
server.get("CaptchaWarning", function (req, res, next) {
  
  res.render("CaptchaWarning");
  next();
});
module.exports = server.exports();
