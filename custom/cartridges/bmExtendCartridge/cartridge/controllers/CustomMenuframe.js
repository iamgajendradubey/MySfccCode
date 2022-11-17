'use strict'

var myIsml = require('dw/template/ISML');

function one(){
    myIsml.renderTemplate('mainDashboard');
}

module.exports.one = one;
module.exports.one.public = true;