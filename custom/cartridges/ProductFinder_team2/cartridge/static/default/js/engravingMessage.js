!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}({2:function(e,n){document.getElementById("engrave-form").addEventListener("submit",(function(e){e.preventDefault();var n=$(".userEngraveMessage").val();n.length<=50?$("#userEngraveMessageOutput").html(n):$("#userEngraveMessageOutput").html("<p>Engraving Message should not exceed 50 size</p>")})),$(".options-select").change((function(){var e=document.getElementById("engrave-form"),n=document.getElementsByClassName("new11");console.log(n);for(let o=0;o<n.length;o++)if(console.log(n[o]),n[o].selected){var t=n[o].dataset.valueId;console.log(t),"noEngraving"==t?(e.classList.add("d-none"),console.log("add")):(console.log("remove"),e.classList.remove("d-none"))}}))}});