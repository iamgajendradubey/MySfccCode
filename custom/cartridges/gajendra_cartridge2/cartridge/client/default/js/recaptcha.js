$(document).ready(function(){
    $(document).on('change', '#recaptcha-validation',  function (e){
        console.log("function running")
        if ($(this).is(':checked')) {
            e.preventDefault();
            grecaptcha.ready(function() {
                console.log("hello---");
            var siteKey = document.getElementById("registration-form-sitekey").value;
            grecaptcha.execute(siteKey, { action: 'click' }).then( function (token){
                console.log("token---"+token);

            document.getElementById('registration-form-recaptcha').value = token;
        });
      });
    }
    else{
        document.getElementById('registration-form-recaptcha').value = "";
    }
    });
});