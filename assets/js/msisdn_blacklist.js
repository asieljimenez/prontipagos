
function submitBlacklistForm(){
    if(validate_msisdn_blacklist_form()){
        $("#btnContactForm").attr('disabled',true);
        $(".loading").addClass('d-block');

        grecaptcha.ready(function() {
            grecaptcha.execute('6LeiKYAhAAAAAH6kHEVd4ijpsvsrWimjnSRoGm8m', {action: 'submit'}).then(function(token) {

                var data = getMsisdnBlacklistFormJson();
                data.token = token;
                console.log(data);
                $.ajax({
                    url:"/development/api/msisdn_blacklist.php",
                    method:"POST",
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: "application/json",
                    success: function (data) {
                      switch(data.code){
                        case 0:
                            $("#form-msisdn").hide();
                            $("#form-msisdn-success").show();
                            $("#btnContactForm").hide();
                          break;
                        default:
                          $(".error-message").text(data.message);
                          $(".error-message").addClass('d-block');
                      }
                      $("#btnContactForm").attr('disabled',false);
                      $(".loading").removeClass('d-block');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                      console.log(errorThrown);
                      $(".error-message").text("Ocurrió un error por favor intente nuevamente");
                      $(".error-message").addClass('d-block');
                      $("#btnContactForm").attr('disabled',false);
                      $(".loading").removeClass('d-block');
                    }
                });

            })
         });

    }
    return false;
}


function validate_msisdn_blacklist_form(){
    cleanForm();
    if($("#msisdn").val().trim() === ""){
        $(".error-message").text("Número de celular dato obligatorio");
        $(".error-message").addClass('d-block');
        $(".error-message").css("background-color", "#ed3c0d");
        $("#msisdn").focus();
        return false;
    }
    if ($.isNumeric($("#msisdn").val().trim()) == false) {
        $(".error-message").text("Número de celular debe tener solamente dígitos");
        $(".error-message").addClass('d-block');
        $(".error-message").css("background-color", "#ed3c0d");
        $("#msisdn").focus();
        return false;
    }
    if($("#msisdn").val().trim().length !=10){
        $(".error-message").text("Número de celular debe tener 10 dígitos");
        $(".error-message").addClass('d-block');
        $(".error-message").css("background-color", "#ed3c0d");
        $("#msisdn").focus();
        return false;
    }
    return true;
}

function cleanForm(){
    $(".error-message").text("");
    $(".error-message").removeClass('d-block');
    $(".error-message").css("background-color", "#fff");
}

function getMsisdnBlacklistFormJson(){
    return {
        "msisdn": parseInt($("#msisdn").val())
    };
}

