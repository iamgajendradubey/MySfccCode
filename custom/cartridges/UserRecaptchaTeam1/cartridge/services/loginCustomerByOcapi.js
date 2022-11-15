
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Theservice = require('*/cartridge/static/serviceStatic/allservicestatic');

var CustomerLogin = LocalServiceRegistry.createService('storeLocatorTeam1', {
    createRequest: function (svc, params) {
        
        svc.setRequestMethod('POST');
        var wurl = CustomerLogin.getURL();
        var temurl = "https://radiant-lowlands-82249.herokuapp.com/login";
        svc.setURL(temurl);
        var data=  JSON.stringify({
            "Authorization": "eyJ6aXAiOiJOT05FIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYiLCJraWQiOiJEMWhPUDdEODN4TjBqZWlqaTI3WWFvZFRjXC9BPSJ9.eyJzZXMiOiJDak14LV9OLU9TQXFTVnFCWW9seWRsYjdfTXM5bURrbVRWWlJoWVptUkhvTmNEUHVCbS1COXRIT09NT2hIN1Rtdmw3MzhReFVJSkdSWmZuZU5iZ1Jxdz09Iiwic3ViIjoiODgxODY1NTMtMzY3YS00YzYxLTgxNjEtOTkyOTAyMjk2ZTc2IiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1ZGl0VHJhY2tpbmdJZCI6IjBlOTk1ZmY2LWYwNjEtNDVlMS1hMWFhLWVjYmY0YWViMjQyNSIsImlzcyI6Ijg4MTg2NTUzLTM2N2EtNGM2MS04MTYxLTk5MjkwMjI5NmU3NiIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6IjA3NjViMmRkLTE0YmYtNGNlMC1iYzUzLWNkOTVhZTUxMDRkMiIsImNsaWVudF9pZCI6Ijg4MTg2NTUzLTM2N2EtNGM2MS04MTYxLTk5MjkwMjI5NmU3NiIsImF1ZCI6Ijg4MTg2NTUzLTM2N2EtNGM2MS04MTYxLTk5MjkwMjI5NmU3NiIsIm5iZiI6MTY2NTM5NjA2NCwidXNyIjoiZ2FqZW5kcmEuZHViZXlAY29kZXNxdWFyZXRlY2guY29tIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInNjb3BlIjpbIm1haWwiXSwiYXV0aF90aW1lIjoxNjY1Mzk2MDY0LCJyZWFsbSI6IlwvIiwidG50IjoiYmp4Y18wMDIiLCJleHAiOjE2NjUzOTY5NjQsImlhdCI6MTY2NTM5NjA2NCwiZXhwaXJlc19pbiI6ODk5LCJqdGkiOiJhY2VmZDVlMS1hNmY0LTQ2NWYtOWRhZS0yOGVjMGUxMmM4ZjEifQ.WuqTLAsQM9vid7xCuO7HwmF3O58JfadHmBHmhD5PPLh68U2MA5rR3866ja6Yp2J7AyoauGtvkE4IoYZjbmb7VRMHYJHt1zP0dJaiE6wQM_dG78ADuQObWMACQLQgjJ3pIayofj95SB2odeBzVz3EmtO7iQlnhrFtpg0DvwyfvW0g_16t_ky_2uRlnvYtmFSpEtlX_yvvGU7fsMz72tjiQkcT-c5n2gES9e1MiIApM_DWZP1gbHUS65-k0iSCKCLc5KeTkcjqnlzyghAgEJI_uh-JAX8BQ0Z3Ml0wQ2t6sAv6vdVwOxJH0CS53jfxyg-DjYchiWxii-NupDizeIOs9w",
            "username": "mansi@gmail.com",
            "password": "Mansi@123",
            "type": "credentials",
            "clientId": "88186553-367a-4c61-8161-992902296e76",
            "baseUrl": "https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com",
            "refArch": "gajendra"
          });
        return data;
    },
    parseResponse: function (svc, httpClient) {
        var result;
        try {
            result = JSON.parse(httpClient.text);
        } catch (e) {
            result = httpClient.text;
        }
        return result;
    }
});
module.exports = {
    CustomerLogin: CustomerLogin
}