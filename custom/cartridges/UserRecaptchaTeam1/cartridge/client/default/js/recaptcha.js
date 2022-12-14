$(document).ready(function(){
    $(document).on('change', '#recaptcha-validation',  function (e){
        if ($(this).is(':checked')) {
            e.preventDefault();
            grecaptcha.ready(function() {
            var siteKey = document.getElementById("registration-form-sitekey").value;
            grecaptcha.execute(siteKey, { action: 'click' }).then( function (token){
            document.getElementById('registration-form-recaptcha').value = token;
        });
      });
    }
    else{
        document.getElementById('registration-form-recaptcha').value = "";
    }
    });
});