
 $('form.MapFinding-form').submit(function (e) {
            var form = $(this);
            document.getElementById('user-Map-Result').innerHTML='';
            e.preventDefault();
            var url = form.attr('action');
            form.spinner().start();
            var pcode=$('#storepostcode').val()
            var ccode=$('#countryCode').val()
           console.log("gajendra..."+pcode)
           console.log("data..."+form.serialize())
        //    var apiUrl="https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-RefArch-gajendra-Site/default/Storelocator-GetMap?countrycode=DZ&postalcode=452001"
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                data: {
                    postalcode:pcode,
                    countrycode:ccode,
                },
                success: function (data) {
                    form.spinner().stop();
                   console.log(data.response[0]);
                   console.log(data.response[0].city);
                   for (let i = 0; i < data.response.length; i++) {
                    console.log(data.response[i].longitude);
                    console.log(data.response[i].city);
                    // $('#user-Map-Result').append(`<a class="btn btn-warning" target='_blank' href="https://maps.google.com/?daddr=${data.response[i].latitude},${data.response[i].longitude}"> <img src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/000000/external-locator-shipping-delivery-and-fulfillment-smashingstocks-hand-drawn-black-smashing-stocks.png" style="height:30px;width:30px"/>${data.response[i].city}</a>
                    // ${data.response[i].latitude}
                    // ${data.response[i].longitude}
                    // <br>
                    // <br>`);
                    document.getElementById('user-Map-Result').innerHTML+=`<a class="btn btn-warning" target='_blank' href="https://maps.google.com/?daddr=${data.response[i].latitude},${data.response[i].longitude}"> <img src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/000000/external-locator-shipping-delivery-and-fulfillment-smashingstocks-hand-drawn-black-smashing-stocks.png" style="height:30px;width:30px"/>${data.response[i].city}</a>
                    ${data.response[i].latitude}
                    ${data.response[i].longitude}
                    <br>
                    <br>`;
                   }
                },
                error: function (err) {
                    console.log(data);
                    form.spinner().stop();
                }
            });
            
            return false;
        });