
//........................Engraving customization .............................//

document
.getElementById("engrave-form")
.addEventListener("submit", function (e) {
  e.preventDefault();
// $(document).on('click', 'button.addengravemessage-btn', function () {
// var a=$(this).attr('data-pid');
// alert("hello")
var msg = $('.userEngraveMessage').val();
if (msg.length<=50) {
$('#userEngraveMessageOutput').html(msg)
}else{
$('#userEngraveMessageOutput').html('<p>Engraving Message should not exceed 50 size</p>')
}
});

// $('selectedoptionEngraving').change(function(){
//   var optionid =$(this).attr('data-value-id');
//   if (optionid == 'noEngraving') {
//     document.getElementById('engrave-form').style.display= "none";
//   }
//   else{
//     document.getElementById('engrave-form').style.display= "block";
//   }
// });

$('.options-select').change(function(){
  var b= document.getElementById('engrave-form');
var singleotpion=document.getElementsByClassName('new11')
console.log(singleotpion)
for (let i = 0; i < singleotpion.length; i++) {
  console.log(singleotpion[i])
  if (singleotpion[i].selected) {
    var optionvalue=singleotpion[i].dataset.valueId
    console.log(optionvalue)
    if (optionvalue == 'noEngraving') {
      b.classList.add('d-none');
    console.log("add")
  }
  else{
    console.log("remove")

    b.classList.remove('d-none');
  }
}

}
});
// var optionid =$(this).attr('data-value-id');
  
// var a= document.getElementsByClassName('selectedoptionEngraving');
// var b= document.getElementById('engrave-form');
// console.log(a);
// console.log("divyanse")
// if (optionid == 'noEngraving') {
//     b.classList.add('d-none');
// }
// else{
//   b.classList.remove('d-none');
// }
// for (let i = 0; i < a.length; i++) {
//   console.log(a[i]);
//   // if (a[i].innerHTML=="noEngraving") {
  //   console.log("hiii")
  //   b.classList.remove('d-none');
  //   console.log("htt");
  // };
// }


  
// var new = document.getElementById("engrave-form")

// function myFunction() {
//   new.classList.remove('d-none')
//   document.getElementById("engrave-form").display.style = block;
// };