
 $('form#geoForm').submit(function (e) {
    var form = $(this);
    e.preventDefault();
    var url = form.attr('action');
    form.spinner().start();
    var address=$('#Geoaddress').val();
    
    var q=address.replace(" ","+");
    console.log('address--',q);
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {
            q:q
        },
        success: function (data) {
            form.spinner().stop();
            console.log('data--',data);
            console.log('data.response.length',data.response.length);
        //    console.log(data.response[0].city);
        document.getElementById('GeoapiResponce').innerHTML = '';
           for (let i = 0; i < data.response.length; i++) {
            // $('#user-Map-Result').append(`<a class="btn btn-warning" target='_blank' href="https://maps.google.com/?daddr=${data.response[i].latitude},${data.response[i].longitude}"> <img src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/000000/external-locator-shipping-delivery-and-fulfillment-smashingstocks-hand-drawn-black-smashing-stocks.png" style="height:30px;width:30px"/>${data.response[i].city}</a>
            // ${data.response[i].latitude}
            // ${data.response[i].longitude}
            // <br>
            // <br>`);
            document.getElementById('GeoapiResponce').innerHTML+=`<a class="btn btn-warning" target='_blank' href="https://maps.google.com/?daddr=${data.response[i].latitude},${data.response[i].longitude}"> <img src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/000000/external-locator-shipping-delivery-and-fulfillment-smashingstocks-hand-drawn-black-smashing-stocks.png" style="height:30px;width:30px"/>${data.response[i].city}</a>
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