'use strict';

var base = module.superModule;

module.exports = function  OrderModel(lineItemContainer, options ){
    base(lineItemContainer, options);
    // var a = this;
    this.lat = options.properties.lat;
    this.lon = options.properties.lon;

};



