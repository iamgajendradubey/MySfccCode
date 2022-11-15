$(document).ready(function(){
    var clickCount = 0;
    var color = false;
    var size = false;
    var price = false;
    var redirectUrl = $('#endURL').attr('data-href');
    console.log(redirectUrl);
    $('.color-val').on('click' , function(){
        var href = $(this).attr('data-href');
        var myArr = href.split('?');
        
        if(clickCount <= 0 && price == false)
        {
            redirectUrl = redirectUrl+'?'+myArr[1];
            console.log(redirectUrl);
            clickCount += 1;
            color = true;
        }
        else
        {
            var refinmentQuery = myArr[1].split('&');
            redirectUrl = redirectUrl + '&'+refinmentQuery[1].replace('1' , clickCount+1) + '&' +refinmentQuery[2].replace('1' , clickCount+1);
            // console.log(refinmentQuery);
            console.log(redirectUrl);
            console.log(refinmentQuery);
            clickCount += 1;
        }
    })

    $('.size-val').on('click' , function(){
        var href = $(this).attr('data-href');
        var myArr = href.split('?');
        if(clickCount <= 0 && price == false)
        {
            redirectUrl = redirectUrl+'?'+myArr[1];
            console.log(redirectUrl);
            clickCount += 1;
            size = true;
        }
        else
        {
            var refinmentQuery = myArr[1].split('&');
            var refinementValue = refinmentQuery[2].split('=');
            redirectUrl = redirectUrl + '&'+refinmentQuery[1].replace('1' , clickCount+1)+'&'+refinementValue[0].replace('1' , clickCount+1)+'='+refinementValue[1];
            console.log(refinmentQuery);
            console.log(redirectUrl);
            console.log(refinementValue);
            clickCount += 1;
        }
    })

    $('.price-val').on('click' , function(){
        var href = $(this).attr('data-href');
        var myArr = href.split('?');
        if(clickCount <= 0 && price == false)
        {
            redirectUrl = redirectUrl+'?'+myArr[1];
            console.log(redirectUrl);
            price = true;
        }
        else
        {
            var queryArr = myArr[1].split('&');
            redirectUrl = redirectUrl+'&'+queryArr[1]+'&'+queryArr[2];
            console.log(redirectUrl);
            console.log(queryArr);
        }

    });
    $('.category-val').on('click' , function(){
        var href = $(this).attr('data-href');
        var myArr = href.split('?');
        if(clickCount <= 0 && price == false)
        {
            redirectUrl = redirectUrl+'?'+myArr[0];
            console.log(redirectUrl);
            price = true;
        }
        else
        {
            var queryArr = myArr[1].split('&');
            redirectUrl = redirectUrl+'&'+queryArr[1]+'&'+queryArr[2];
            console.log(redirectUrl);
            console.log(queryArr);
        }

    });

    $('#searcProduct').on('click' , function(){
        
        window.location.href = redirectUrl;
    })
})