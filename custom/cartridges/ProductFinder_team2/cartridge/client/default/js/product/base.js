'use strict';



var base = require('base/product/base');

function getAddToCartUrl() {
    return $('.add-to-cart-url').val();
}

function getOptions($productContainer) {
    var options = $productContainer
        .find('.product-option')
        .map(function () {
            var $elOption = $(this).find('.options-select');
            var urlValue = $elOption.val();
            var selectedValueId = $elOption.find('option[value="' + urlValue + '"]')
                .data('value-id');
                var optionid=$(this).data('option-id');
                if (optionid=='EngravingCustomisation') {
                    var a=null;
                    if (selectedValueId!='noEngraving') {
                        a=$("#userEngraveMessageOutput").val()
                    }
                    console.log(a);

                    return {
                        optionId: $(this).data('option-id'),
                        selectedValueId: selectedValueId,
                        message:a
                    };
                }
                
            return {
                optionId: $(this).data('option-id'),
                selectedValueId: selectedValueId,
               
            };
        }).toArray();

    return JSON.stringify(options);
}

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
}


function getChildProducts() {
    var childProducts = [];
    $('.bundle-item').each(function () {
        childProducts.push({
            pid: $(this).find('.product-id').text(),
            quantity: parseInt($(this).find('label.quantity').data('quantity'), 10)
        });
    });

    return childProducts.length ? JSON.stringify(childProducts) : [];
}

function addToCart() {
    $(document).on('click', 'button.add-to-cart, button.add-to-cart-global', function (e) {
        var addToCartUrl;
        var pid;
        var pidsObj;
        var setPids;
        // $('body').trigger('product:beforeAddToCart', this);

        if ($('.set-items').length && $(this).hasClass('add-to-cart-global')) {
            setPids = [];

            $('.product-detail').each(function () {
                if (!$(this).hasClass('product-set-detail')) {
                    setPids.push({
                        pid: $(this).find('.product-id').text(),
                        qty: $(this).find('.quantity-select').val(),
                        options: getOptions($(this))
                    });
                }
            });
            pidsObj = JSON.stringify(setPids);
        }

        pid = base.getPidValue($(this));

        var $productContainer = $(this).closest('.product-detail');
        if (!$productContainer.length) {
            $productContainer = $(this).closest('.quick-view-dialog').find('.product-detail');
        }

        addToCartUrl = getAddToCartUrl();

        var form = {
            pid: pid,
            pidsObj: pidsObj,
            childProducts: getChildProducts(),
            quantity: base.getQuantitySelected($(this))
        };

        var isEngraving = $('#engraving-or-not').val();

        if (!$('.bundle-item').length) {
            form.options = getOptions($productContainer);
        }

        $(this).trigger('updateAddToCartFormData', form);
        if (addToCartUrl) {
            var a=false;
            var d=document.getElementsByClassName('options-select');
            console.log(d);
            for (let i = 0; i < d.length; i++) {
                var d2=d[i].selectedOptions;
                console.log(d2);
                for (let j = 0; j < d2.length; j++) {
                    var g1=d2[j]
                    console.log(g1);
                    if(g1.getAttribute("data-value-id")=='basicEngraving'){

                        var engravingMessage = $('#userEngraveMessageOutput').val();
                        console.log(engravingMessage);
                        if (engravingMessage=='') {
                            e.preventDefault();
                            $('#invalid-feedback-engravemessage').html('<p class="text-danger">Please Enter the engraving message</p>');
                            console.log("hellllllee");
                            a=true;
                        }
                        if (engravingMessage.length>50) {
                            e.preventDefault();
                            $('#invalid-feedback-engravemessage').html('<p class="text-danger">Engraving Message should not exceed 50 size</p>');
                            console.log("hellllllee");
                            a=true;
                        }
                        
                    }
                }
                
            }

            if (a) {
            
                $('#invalid-feedback-engravemessage').html('<p class="text-danger">Please Enter the engraving message</p>');
              
            }
            else
            {
                $.ajax({
                    url: addToCartUrl,
                    method: 'POST',
                    data: form,
                    success: function (data) {
                        handlePostCartAdd(data);
                        $('body').trigger('product:afterAddToCart', data);
                        $.spinner().stop();
                        base.miniCartReportingUrl(data.reportingURL);
                    },
                    error: function () {
                        $.spinner().stop();
                    }
                });
            }
        }
    });
}

base.addToCart = addToCart;

module.exports = base;