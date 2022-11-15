// $(document).ready(function () {
    $(document).on('click', '#get-all-productByCgid-Ocapi',  function (e){
        $('#myOcApiResult').empty();
        console.log("heloo")
        $.ajax({
          url: "https://radiant-lowlands-82249.herokuapp.com/getProductsByCgid",
          type: 'POST',
          dataType: 'json',
          data: {
              cgid:"mens",
          clientId:"88186553-367a-4c61-8161-992902296e76",
          baseUrl:"https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com",
          refArch:"gajendra"
          },
          success: function (data) {
             console.log(data.hits);
             var a= JSON.stringify(data)
             $('#myOcApiResult').append(`<div class="col-md-4 col-sm-6">
             <div class="card col-11 shadow1" style="height: 93%;max-height:400px">
                 <a href="https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com/s/RefArch-gajendra/${p.product.name}/${p.pid}.html?lang=en_US"
                     class="text-decoration-none text-dark">
                     <img src="${p.product.getImages('medium')[0].url}" class="card-img-top"
                         style="max-height:200px;" alt="${p.product.productName}"
                         title="${p.product.getImages('medium')[0].url}">
                 </a>
                 <div class="card-body " style="margin-top: -10%;">
                     <p class="card-text">
                         <h4 style="font-size:13px;font-weight:400;text-align:left;margin:0">
                             <b>${p.product.name}</b>
                         </h4>
                         <h4 style="margin: 4px 0 8px;font-size:11px; opacity: 0.7;text-align: left; height:80px;overflow:hidden;">
                             ${p.product.longDescription}
                         </h4>
                         <iscomment> <h6 style="padding:0 2px 0 0 ;font-weight:500;font-size:13px;text-align: left;">
                             ${p.product.price.sales.formatted}<del
                                 style="padding:0 2px;opacity:.7;font-size:10px;text-decoration: line-through;">${product.price.list.formatted}</del><b
                                 style="color: #ff905a;">10%</b> </h6> </iscomment>
                     </p>
                     <div class="col-sm-12">
                         <input type="hidden" class="add-to-cart-url-gajendra"
                             value="/on/demandware.store/Sites-RefArch-gajendra-Site/en_US/Cart-AddProduct">
                         <button class="add-to-cart-gajendra btn btn-primary w-100" data-toggle="modal"
                             data-target="#chooseBonusProductModal" data-pid="${p.product.ID}">
                             <i class="fa fa-shopping-bag"></i>
                             Add to Cart
                         </button>
                     </div>
                 </div>
             </div>
         </div>`);
          },
          error: function (err) {
              console.log(err);
          }
      });
      });
      // })