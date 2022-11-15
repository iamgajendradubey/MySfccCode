"use strict";

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var URLUtils = require("dw/web/URLUtils");
var Transaction = require("dw/system/Transaction");
var CustomObjectMgr = require("dw/object/CustomObjectMgr");
// var CustomerMgr = require('dw/customer/CustomerMgr');
var UUIDUtils = require("dw/util/UUIDUtils");
var page = require("app_storefront_base/cartridge/controllers/Home");
// import {  } from "module";
importPackage(dw.object);
server.extend(page);

server.get("Login", cache.applyDefaultCache, function (req, res, next) {
    var actionUrl = URLUtils.url("Test-Loginsubmit"); //sets the route to call for the form submit action
    var SFRAhelloform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    SFRAhelloform.clear();

    var data = {
        Message: "My form",
        actionUrl: actionUrl,
        SFRAhelloform: SFRAhelloform,
    };
    res.render("newloginform", data);
    next();
});

server.get("Register", cache.applyDefaultCache, function (req, res, next) {
    var actionUrl = URLUtils.url("Test-Registersubmit"); //sets the route to call for the form submit action
    var Registerform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    Registerform.clear();

    var data = {
        heading: "Registration Form",
        actionUrl: actionUrl,
        SFRAhelloform: Registerform,
    };
    res.render("newregisterform", data);
    next();
});

server.get("Loginsubmit", cache.applyDefaultCache, function (req, res, next) {
    // out.print(JSON.stringify(pdict.account.profile));
    var Transaction = require("dw/system/Transaction");
    var CustomObjectMgr = require("dw/object/CustomObjectMgr");
    // var MyForm = server.forms.getForm("loginform");
    // var MyFormObj = MyForm.toObject();
    // MyFormObj.MyForm = MyForm;
    // if (MyForm.valid) {
        // res.setViewData(MyFormObj);
        // var formInfo = res.getViewData();

        var co = null;
        var a = null;
        var myarr = [];
        // Transaction.wrap(function () {
        // co=CustomObjectMgr.getCustomObject("mytableuser","14");

        // co = CustomObjectMgr.getAllCustomObjects("ContactUsEmails");

        // while (co.hasNext()) {
        //   var newItem = co.next();

        //   res.setViewData(newItem.custom);
        //   var arr= res.getViewData()
        //   myarr.push(arr)
        //   var newItemTem = CustomObject.next();
        //   // var newItem =
        //   res.setViewData(newItemTem.custom);
        //   var formInfo = res.getViewData();
        //   // var ashutosh= JSON.stringify(newItem)
        //   // var ashu = {id:newItem.id,email:newItem.email, password:newItem.password,dropdown:newItem.ddown,radio:newItem.radio}
        //   arrData.push(formInfo)
        //   }
        // ...........insert to custom object..................
        // var b = co.count;
        // let text = b.toString();
        Transaction.wrap(function () {
        a = CustomObjectMgr.createCustomObject("newContactusgajen", "4");
        a.custom.subject = "Another Topic";
        a.custom.emailAssociated = "Gajnedra.dueby@gmail.com";
        });
        //............end inserted..............................
        // });
        // Transaction.wrap(function () {
        //     co = CustomObjectMgr.getAllCustomObjects("ContactUsEmails");
        //     while (co.hasNext()) {
        //         var newItem = co.next();
        //         res.setViewData(newItem.custom);
        //         var arr = res.getViewData();
        //         var option = {
        //             optionid: newItem.iContactUsEmailsId,
        //             subject: newItem.vSubject,
        //             AssociateEmail: newItem.vAssociatedEmails,
        //         };
        //         myarr.push(option);
        //     }
        // });
        var data = {
            Message: "success",
        };
        res.render("result", data);
       
    next();
});

 
server.get("Result", cache.applyDefaultCache, function (req, res, next) {
    var actionUrl = URLUtils.url("Test-Loginsubmit"); //sets the route to call for the form submit action
    var SFRAhelloform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    SFRAhelloform.clear();

    var data = {
        Message: "My form",
        actionUrl: actionUrl,
        SFRAhelloform: SFRAhelloform,
    };

    res.render("Mylogin", data);
    next();
});

server.post("Mylogin", cache.applyDefaultCache, function (req, res, next) {
    var HookMgr = require('dw/system/HookMgr');
   var simplehook = HookMgr.callHook("gajendra","alertgajendra","45");
   var num = HookMgr.callHook("gajendra","Addition",45,55);
   var newnum=num; 
    res.render('result',{
        num:newnum
    });
    next();

});

server.append("Show", function (req, res, next) {
    //adds additional middleware
    var actionUrl = URLUtils.url("Test-Loginsubmit"); //sets the route to call for the form submit action
    var SFRAhelloform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    SFRAhelloform.clear();

    var data = {
        Message: "My form",
        actionUrl: actionUrl,
        SFRAhelloform: SFRAhelloform,
    };

    res.render("gajendra_cloudkicks/cartridge/template/default/customlogin", data);
    next();
});

// server.append('Show', cache.applyDefaultCache, function (req, res, next) {

//     res.render('Mylogin', {
//         Message: 'Hello World! Again.'
//     });;

//     next();
// });
server.get("Contactus", cache.applyDefaultCache, function (req, res, next) {
    var actionUrl = URLUtils.url("Test-Sendmail"); //sets the route to call for the form submit action
    var contactform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    contactform.clear();
    var co = null;
    var myarr = [];
    Transaction.wrap(function () {
        co = CustomObjectMgr.getAllCustomObjects("ContactusEmails");
        while (co.hasNext()) {
            var newItem = co.next();
            // res.setViewData(newItem.custom);
            // var option = res.getViewData();
              var option = {
                optionid:newItem.custom.ContactusEmailsKey,
                subject:newItem.custom.subject,
                AssociateEmail:newItem.custom.EmailAssociated
            }
            myarr.push(option);
        }
    });
    var data = {
        heading:"Contact Us",
        options: myarr,
        actionUrl: actionUrl,
        SFRAhelloform: contactform,
    };
   
    co.close();

    res.render("contactus", data);
    next();
});

server.get("newContactus", cache.applyDefaultCache, function (req, res, next) {
    var actionUrl = URLUtils.url("Test-Sendmail"); //sets the route to call for the form submit action
    var contactform = server.forms.getForm("loginform"); //creates empty JSON object using the form definition
    contactform.clear();
    var co = null;
    var myarr = [];
    Transaction.wrap(function () {
        co = CustomObjectMgr.getAllCustomObjects("newContactusgajen");
        while (co.hasNext()) {
            var newItem = co.next();
            // res.setViewData(newItem.custom);
            // var option = res.getViewData();
              var option = {
                optionid:newItem.custom.id,
                subject:newItem.custom.subject,
                AssociateEmail:newItem.custom.emailAssociated
            }
            myarr.push(option);
        }
    });
    var data = {
        heading:"Contact Us",
        options: myarr,
        actionUrl: actionUrl,
        SFRAhelloform: contactform,
    };
   
    co.close();

    res.render("contactus", data);
    next();
});
server.post(
    "Registersubmit",
    cache.applyDefaultCache,
    function (req, res, next) {
        // out.print(JSON.stringify(pdict.account.profile));

        var MyForm = server.forms.getForm("loginform");
        var MyFormObj = MyForm.toObject();
        MyFormObj.MyForm = MyForm;
        if (MyForm.valid) {
            res.setViewData(MyFormObj);
            var formInfo = res.getViewData();

            var co = null;
            var a = null;

            Transaction.wrap(function () {
                //   var b=co.count;
                //   let text = b.toString();
                var id = UUIDUtils.createUUID();
                a = CustomObjectMgr.createCustomObject("gajendraUsers", id);
                a.custom.fname = formInfo.firstname;
                a.custom.lname = formInfo.lastname;
                a.custom.email = formInfo.email;
                a.custom.password = formInfo.password;
                a.custom.degree = formInfo.degree;
            });

            var data = {
                Message: formInfo,
            };
            res.render("success", data);
        } else {
            res.json({
                success: false,
                fields: formErrors.getFormErrors(MyForm),
            });
        }
        next();
    }
);

server.post(
    "Sendmail2",
    cache.applyDefaultCache,
    function (req, res, next) {
       
        var customLogin = server.forms.getForm('loginform');
        var customLoginObj = customLogin.toObject();
        res.setViewData(customLoginObj);
        var form_data = res.getViewData()
        var optionid = form_data.degree;
        
    
        var co = null;
        var a = null;
        var sendTo=null;
        var subject=null;
        //  Transaction.wrap(function () {
        //     let text = optionid.toString();
        //  co=CustomObjectMgr.getCustomObject("ContactusEmails",optionid);
        //  var sendTo=co.custom.EmailAssociated
        //  var subject=co.custom.subject
        //  })
         var myarr = optionid.split(',');
         myarr.forEach(element => {
            // Logger.error(JSON.stringify(element));
            var mail: Mail = new dw.net.Mail();
            mail.addTo(element);
            mail.setFrom("gajendra.dubey@codesquaretech.com");
            mail.setSubject("Example Test");
            mail.setContent(form_data.msg);
    
            mail.send()
    
        });
        var result={
            success:"success"
        }

       res.json(myarr);

    next();
    }
);

server.post(
    "Sendmail",
    cache.applyDefaultCache,
    function (req, res, next) {
        var Mail = require('dw/net/Mail');
        var mail= new Mail();
        var customLogin = server.forms.getForm('loginform');
        var customLoginObj = customLogin.toObject();
        res.setViewData(customLoginObj);
        var form_data = res.getViewData()
        var optionid = form_data.degree.toString();
        var co = null;
        var a = null;
        var sendTo=null;
        var subject=null;
         Transaction.wrap(function () {
         co=CustomObjectMgr.getCustomObject("ContactusEmails",optionid);
          sendTo=co.custom.EmailAssociated
          subject=co.custom.subject
         });
         var myarr = sendTo.split(',');
        //  myarr.forEach(element => {
        //     var Mail = require('dw/net/Mail');
        //     var mail= new Mail();
        //     mail.addTo(element);
        //     mail.setFrom("gajendra.dubey@codesquaretech.com");
        //     mail.setSubject(subject);
        //     mail.setContent(form_data.msg);
        //     mail.send()
        // });
        for (let i = 0; i < myarr.length; i++) {
            mail.addTo(myarr[i]);
            mail.setFrom("gajendra.dubey@codesquaretech.com");
            mail.setSubject(subject);
            mail.setContent(form_data.msg);
            mail.send()
        }
        var data={
            num:"Your message is set to The authority successfully"
           };
           res.render('result',data);
           next();
    next();
    }
);


module.exports = server.exports();
  