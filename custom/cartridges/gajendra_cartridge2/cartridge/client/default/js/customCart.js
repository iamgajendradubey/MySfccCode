$(document).on('click', 'button.add-to-cart-gajendra', function () {
    // var a=$(this).attr('data-pid');
    // alert("hello")
   var addToCartUrl = $('.add-to-cart-url-gajendra').val();
    var form = {
        pid: $(this).attr('data-pid'),
        pidsObj: {},
        quantity: 1
    };
    $.spinner().start();
    $.ajax({
        url: addToCartUrl,
        method: 'POST',
        data: form,
        success: function (data) {
            handlePostCartAdd(data);
            $('body').trigger('product:afterAddToCart', data);
            $.spinner().stop();
            miniCartReportingUrl(data.reportingURL);
        },
        error: function () {
            $.spinner().stop();
        }
    });
});
function handlePostCartAdd(response) {
    $('.minicart').trigger('count:update', response);
    var messageType = response.error ? 'alert-danger' : 'alert-success';
    // show add to cart toast
    if (response.newBonusDiscountLineItem
        && Object.keys(response.newBonusDiscountLineItem).length !== 0) {
        chooseBonusProducts(response.newBonusDiscountLineItem);
    } else {
        if ($('.add-to-cart-messages').length === 0) {
            $('body').append(
                '<div class="add-to-cart-messages"></div>'
            );
        }

        $('.add-to-cart-messages').append(
            '<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">'
            + response.message
            + '</div>'
        );

        setTimeout(function () {
            $('.add-to-basket-alert').remove();
        }, 5000);
    }
};
