!function(e){var t={};function i(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t){$("form.Ocapi-Category-App").submit((function(e){var t=$(this);document.getElementById("allOcapiOutputPLP").innerHTML="",e.preventDefault();t.attr("action");var i=$("#OcapiCatagory").val();console.log("gajendra..."+i),console.log("data..."+t.serialize());var o={url:"https://radiant-lowlands-82249.herokuapp.com/getProductsByCgid",method:"POST",timeout:0,headers:{"Content-Type":"application/json"},data:JSON.stringify({cgid:i,clientId:"88186553-367a-4c61-8161-992902296e76",baseUrl:"https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com",refArch:"gajendra"})};return $.ajax(o).done((function(e){console.log(e)})),!1})),$("form.Ocapi-login-form").submit((function(e){var t=$(this);e.preventDefault();var i=$("#ocapi-login-email").val(),o=t.attr("action"),n=$("#ocapi-login-Password").val(),a=$("#SelectedOcapiCatagory").val();console.log("gajendra..."+a),console.log("data..."+t.serialize());var r={url:"https://radiant-lowlands-82249.herokuapp.com/login",method:"POST",timeout:0,headers:{"Content-Type":"application/json"},data:JSON.stringify({Authorization:"eyJ6aXAiOiJOT05FIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYiLCJraWQiOiJEMWhPUDdEODN4TjBqZWlqaTI3WWFvZFRjXC9BPSJ9.eyJzZXMiOiJDak14LV9OLU9TQXFTVnFCWW9seWRsYjdfTXM5bURrbVRWWlJoWVptUkhvTmNEUHVCbS1COXRIT09NT2hIN1Rtdmw3MzhReFVJSkdSWmZuZU5iZ1Jxdz09Iiwic3ViIjoiODgxODY1NTMtMzY3YS00YzYxLTgxNjEtOTkyOTAyMjk2ZTc2IiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1ZGl0VHJhY2tpbmdJZCI6IjBlOTk1ZmY2LWYwNjEtNDVlMS1hMWFhLWVjYmY0YWViMjQyNSIsImlzcyI6Ijg4MTg2NTUzLTM2N2EtNGM2MS04MTYxLTk5MjkwMjI5NmU3NiIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6IjA3NjViMmRkLTE0YmYtNGNlMC1iYzUzLWNkOTVhZTUxMDRkMiIsImNsaWVudF9pZCI6Ijg4MTg2NTUzLTM2N2EtNGM2MS04MTYxLTk5MjkwMjI5NmU3NiIsImF1ZCI6Ijg4MTg2NTUzLTM2N2EtNGM2MS04MTYxLTk5MjkwMjI5NmU3NiIsIm5iZiI6MTY2NTM5NjA2NCwidXNyIjoiZ2FqZW5kcmEuZHViZXlAY29kZXNxdWFyZXRlY2guY29tIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInNjb3BlIjpbIm1haWwiXSwiYXV0aF90aW1lIjoxNjY1Mzk2MDY0LCJyZWFsbSI6IlwvIiwidG50IjoiYmp4Y18wMDIiLCJleHAiOjE2NjUzOTY5NjQsImlhdCI6MTY2NTM5NjA2NCwiZXhwaXJlc19pbiI6ODk5LCJqdGkiOiJhY2VmZDVlMS1hNmY0LTQ2NWYtOWRhZS0yOGVjMGUxMmM4ZjEifQ.WuqTLAsQM9vid7xCuO7HwmF3O58JfadHmBHmhD5PPLh68U2MA5rR3866ja6Yp2J7AyoauGtvkE4IoYZjbmb7VRMHYJHt1zP0dJaiE6wQM_dG78ADuQObWMACQLQgjJ3pIayofj95SB2odeBzVz3EmtO7iQlnhrFtpg0DvwyfvW0g_16t_ky_2uRlnvYtmFSpEtlX_yvvGU7fsMz72tjiQkcT-c5n2gES9e1MiIApM_DWZP1gbHUS65-k0iSCKCLc5KeTkcjqnlzyghAgEJI_uh-JAX8BQ0Z3Ml0wQ2t6sAv6vdVwOxJH0CS53jfxyg-DjYchiWxii-NupDizeIOs9w",username:i,password:n,type:"credentials",clientId:"88186553-367a-4c61-8161-992902296e76",baseUrl:"https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com",refArch:"gajendra"})};return $.ajax(r).done((function(e){$.ajax({url:o,method:"POST",data:{response:e},success:function(e){console.log(e)},error:function(e){console.log(e)}})})),!1}))}]);