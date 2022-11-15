$(document).on('click', 'button.confirm-gajendra', function () {
    // var a=$(this).attr('data-pid');
    console.log($(this))
   var url = $(this).attr('data-url');
    var form = {
        id: $(this).attr('data-pid'),
    };
    console.log(url);
    console.log(form);
    $.ajax({
        url: url,
        method: 'GET',
        data: form,
        success: function (data) {
            console.log(data)
            if (data.success) {
                $('#DeleteMsgDisplay').html("Friend is deleted successfully")
            }
            window.location.reload();
        },
        error: function (err) {
            console.log(err)
        }
    });
});
// function dodelete(params) {
//     var url = $('button.confirm-gajendra').attr('data-url');
//     console.log(params)
//     $.ajax({
//         url: url,
//         method: 'GET',
//         data: {
//             id:params
//         },
//         success: function (data) {
//             console.log(data)
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     });
    
// }