"use strict";

/**
 * @namespace Address
 */

var server = require("server");

var URLUtils = require("dw/web/URLUtils");
var Resource = require("dw/web/Resource");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var userLoggedIn = require("*/cartridge/scripts/middleware/userLoggedIn");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var ProductListMgr = require("dw/customer/ProductListMgr");
var UUIDUtils = require("dw/util/UUIDUtils");
var Transaction = require("dw/system/Transaction");
/**
 * Creates a list of address model for the logged in user
 * @param {string} customerNo - customer number of the current customer
 * @returns {List} a plain list of objects of the current customer's addresses
 */

function getFriendList() {
  var allfriendlist = [];
  var a = ProductListMgr.getProductLists(customer, 100).toArray();
  try {
    var alllistitem=a[0].items.toArray();
    alllistitem.forEach(function (element) {
      var b = {
        fid: element.ID,
        fullname: element.custom.MyFriendName,
        nickname: element.custom.MyFriendNickname,
        dob: element.custom.MyFriendDob,
        phoneno: element.custom.MyFriendPhoneNo,
      };
      // var dommy=ProductListMgr.removeProductList(element.ID)
      allfriendlist.push(b);
    });
  } catch (error) {
    
  }
 
  return allfriendlist;
}

function isFriendExist(phoneno) {
  var allfriendlist = [];
  var a = ProductListMgr.getProductLists(customer, 100).toArray();
  var alllistitem=a[0].items.toArray();
  alllistitem.forEach(function (element) {
    if (phoneno==element.custom.MyFriendPhoneNo) {
    var b = {
      fid: element.ID,
      fullname: element.custom.MyFriendName,
      nickname: element.custom.MyFriendNickname,
      dob: element.custom.MyFriendDob,
      phoneno: element.custom.MyFriendPhoneNo,
    };
    // var dommy=ProductListMgr.removeProductList(element.ID)
    allfriendlist.push(b);
  }
  });
  if (allfriendlist.length!=0) {
    return false;
  }
  return true;
}

function getFriendById(id) {
  var friend = [];
  var a = ProductListMgr.getProductLists(customer, 100).toArray();
  var Item=a[0].getItem(id);
    var b = {
      fid: Item.ID,
      fullname: Item.custom.MyFriendName,
      nickname: Item.custom.MyFriendNickname,
      dob: Item.custom.MyFriendDob,
      phoneno: Item.custom.MyFriendPhoneNo,
    };
    friend.push(b);
  
  return friend ;
}

function getFriendById2(id) {
  var friend = [];
  var a = ProductListMgr.getProductList(id);
  if (a) {
    var b = {
      fid: a.ID,
      id: a.custom.FriendId,
      fullname: a.custom.name,
      nickname: a.custom.nickname,
      dob: a.custom.dateOfBirth,
      phoneno: a.custom.phoneno,
    };
    friend.push(b);
  }
  return friend;
}

function deleteFriendById(id) {
  var a = ProductListMgr.getProductLists(customer, 100);
  Transaction.wrap(function () {
    var Item = a[0].getItem(id);
    a[0].removeItem(Item);
  })
    return true;
}

server.get("ShowFriendList", function (req, res, next) {
  if (customer.isAuthenticated()) {
    res.redirect(URLUtils.url("MyFriendList-List"));
  } else {
    res.render("FriendList/MyfriendlistAuth", {
      breadcrumbs: [
        {
          htmlValue: Resource.msg("global.home", "common", null),
          url: URLUtils.home().toString(),
        },
        {
          htmlValue: Resource.msg("page.title.myaccount", "account", null),
          url: URLUtils.url("Account-Show").toString(),
        },
        {
          htmlValue: "My Friend List",
          url: URLUtils.url("MyFriendList-List").toString(),
        },
      ],
    });
  }
  next();
});

server.get("List", consentTracking.consent, function (req, res, next) {
  var actionUrls = {
    deleteActionUrl: URLUtils.url("MyFriendList-DeleteFriendList").toString(),
    listActionUrl: URLUtils.url("MyFriendList-List").toString(),
  };
  if (!customer.isAuthenticated()) {
    res.render("FriendList/MyfriendlistAuth", {
      breadcrumbs: [
        {
          htmlValue: Resource.msg("global.home", "common", null),
          url: URLUtils.home().toString(),
        },
        {
          htmlValue: Resource.msg("page.title.myaccount", "account", null),
          url: URLUtils.url("Account-Show").toString(),
        },
        {
          htmlValue: "My Friend List",
          url: URLUtils.url("MyFriendList-List").toString(),
        },
      ],
    });
  } else {
    res.render("FriendList/Myfriendlist", {
      AllFriendList: getFriendList(),
      actionUrls: actionUrls,
      breadcrumbs: [
        {
          htmlValue: Resource.msg("global.home", "common", null),
          url: URLUtils.home().toString(),
        },
        {
          htmlValue: Resource.msg("page.title.myaccount", "account", null),
          url: URLUtils.url("Account-Show").toString(),
        },
        {
          htmlValue: "My Friend List",
          url: URLUtils.url("MyFriendList-List").toString(),
        },
      ],
    });
  }
  next();
});

server.get(
  "AddFriendList",
  csrfProtection.generateToken,
  consentTracking.consent,
  userLoggedIn.validateLoggedIn,
  function (req, res, next) {
    var FriendListForm = server.forms.getForm("loginform");
    FriendListForm.clear();
    var msg = req.querystring.msg;
    res.render("FriendList/addEditFriendList", {
      FriendListForm: FriendListForm,
      msg:msg,
      breadcrumbs: [
        {
          htmlValue: Resource.msg("global.home", "common", null),
          url: URLUtils.home().toString(),
        },
        {
          htmlValue: Resource.msg("page.title.myaccount", "account", null),
          url: URLUtils.url("Account-Show").toString(),
        },
        {
          htmlValue: "My Friend List",
          url: URLUtils.url("MyFriendList-List").toString(),
        },
      ],
    });
    next();
  }
);

server.get(
  "EditFriendList",
  csrfProtection.generateToken,
  userLoggedIn.validateLoggedIn,
  consentTracking.consent,
  function (req, res, next) {
    var CustomerMgr = require("dw/customer/CustomerMgr");
    var AddressModel = require("*/cartridge/models/address");
    var FriendListForm = server.forms.getForm("loginform");
    var FriendId = req.querystring.id;
    var a = getFriendById(FriendId);
    FriendListForm.clear();
    FriendListForm.dob.value = a[0].dob;
    FriendListForm.firstname.value = a[0].fullname.split(" ")[0];
    FriendListForm.lastname.value = a[0].fullname.split(" ")[1];
    FriendListForm.phone.value = a[0].phoneno;
    FriendListForm.nickName.value = a[0].nickname;

    // FriendListForm.copyFrom(a[0]);
    res.render("FriendList/addEditFriendList", {
      FriendListForm: FriendListForm,
      FriendId: FriendId,
      breadcrumbs: [
        {
          htmlValue: Resource.msg("global.home", "common", null),
          url: URLUtils.home().toString(),
        },
        {
          htmlValue: Resource.msg("page.title.myaccount", "account", null),
          url: URLUtils.url("Account-Show").toString(),
        },
        {
          htmlValue: "My Friend List",
          url: URLUtils.url("MyFriendList-List").toString(),
        },
      ],
    });
    next();
    return;
  }
);

server.post(
  "SaveFriendList",
  csrfProtection.validateAjaxRequest,
  function (req, res, next) {
    var CustomerMgr = require("dw/customer/CustomerMgr");
    var Transaction = require("dw/system/Transaction");
    var formErrors = require("*/cartridge/scripts/formErrors");
    var accountHelpers = require("*/cartridge/scripts/helpers/accountHelpers");
    var addressHelpers = require("*/cartridge/scripts/helpers/addressHelpers");
    var Transaction = require("dw/system/Transaction");
    var ProductList = require("dw/customer/ProductList");
    var ProductMgr = require('dw/catalog/ProductMgr');
    var FriendListForm = server.forms.getForm("loginform");
    var FriendListFormObj = FriendListForm.toObject();
    FriendListFormObj.FriendListForm = FriendListForm;
    var product=ProductMgr.getProduct('25519349M');
    
    var FriendId = req.querystring.id;

    if (FriendListForm.valid) {
      var createfriendlist = null;
      Transaction.wrap(function () {
        var friendlist = ProductListMgr.getProductLists(customer, 100).toArray();
       if (friendlist.length > 0) {
        if (FriendId != "") {
        var friendlistItem=friendlist[0].getItem(FriendId);
        friendlistItem.custom.MyFriendName =
          FriendListFormObj.firstname + " " + FriendListFormObj.lastname;
          friendlistItem.custom.MyFriendPhoneNo = FriendListFormObj.phone;
          friendlistItem.custom.MyFriendNickname = FriendListFormObj.nickName;
          friendlistItem.custom.MyFriendDob = FriendListFormObj.dob;
        }else{
          // if (isFriendExist(FriendListFormObj.phone)) {
          var friendlistItem=friendlist[0].createProductItem(product);
          friendlistItem.custom.MyFriendName =
            FriendListFormObj.firstname + " " + FriendListFormObj.lastname;
            friendlistItem.custom.MyFriendPhoneNo = FriendListFormObj.phone;
            friendlistItem.custom.MyFriendNickname = FriendListFormObj.nickName;
            friendlistItem.custom.MyFriendDob = FriendListFormObj.dob;
        // }
        // else{
        //  res.redirect(URLUtils.url("MyFriendList-AddFriendList",'msg',"Phone No should be unique"));
        //  return next();
        // }
      }
       }
       else{
        createfriendlist = ProductListMgr.createProductList(customer, 100);
        var friendlist = ProductListMgr.getProductLists(customer, 100);
        var friendlistItem=friendlist[0].createProductItem(product);
        friendlistItem.custom.MyFriendName = 
            FriendListFormObj.firstname + " " + FriendListFormObj.lastname;
          friendlistItem.custom.MyFriendPhoneNo = FriendListFormObj.phone;
          friendlistItem.custom.MyFriendNickname = FriendListFormObj.nickName;
          friendlistItem.custom.MyFriendDob = FriendListFormObj.dob;
       }
      });
      res.redirect(URLUtils.url("MyFriendList-List"));
    } else {
      res.json({
        success: false,
      });
    }

    return next();
  }
);

server.get(
  "DeleteFriendList",
  userLoggedIn.validateLoggedInAjax,
  function (req, res, next) {
    var FriendId = req.querystring.id;
    // var frienddata = getFriendById2(FriendId);
    var result = deleteFriendById(FriendId);
    res.json({
      result: result,
      success: true,
    });
    res.redirect(URLUtils.url("MyFriendList-List"));
    return next();
  }
);

server.get(
  "SetDefault",
  userLoggedIn.validateLoggedIn,
  function (req, res, next) {
    var CustomerMgr = require("dw/customer/CustomerMgr");
    var Transaction = require("dw/system/Transaction");
    var accountHelpers = require("*/cartridge/scripts/helpers/accountHelpers");

    var addressId = req.querystring.addressId;
    var customer = CustomerMgr.getCustomerByCustomerNumber(
      req.currentCustomer.profile.customerNo
    );
    var addressBook = customer.getProfile().getAddressBook();
    var address = addressBook.getAddress(addressId);
    this.on("route:BeforeComplete", function () {
      // eslint-disable-line no-shadow
      Transaction.wrap(function () {
        addressBook.setPreferredAddress(address);
      });

      // Send account edited email
      accountHelpers.sendAccountEditedEmail(customer.profile);

      res.redirect(URLUtils.url("Address-List"));
    });
    next();
  }
);

server.get("Header", server.middleware.include, function (req, res, next) {
  if (!req.currentCustomer.profile) {
    res.render("account/header-anon", {});
  } else {
    res.render("account/header-logged", {
      name: req.currentCustomer.profile.firstName,
    });
  }
  next();
});

module.exports = server.exports();
