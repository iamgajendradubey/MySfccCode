$(document).ready(function(){
    $(document).on('change', '#recaptcha-validation',  function (e){
        console.log('changed');
        if ($(this).is(':checked')) {
        console.log('checked');

            e.preventDefault();
            grecaptcha.ready(function() {
            var siteKey = document.getElementById("siteKey").innerText;
            console.log('siteKey--', siteKey);
            grecaptcha.execute("6LcrJkIiAAAAAM7xj7Pt3ozU1lVBPkP3KJnuKMOK", { action: 'click' }).then( function (token){
            console.log('token--', token);
            document.getElementById('registration-form-recaptcha').value = token;
            // alert(token);
                // Add your logic to submit to your backend server here.
        });
      });
    }
    else{
        document.getElementById('registration-form-recaptcha').value = "";
    }
    });
});