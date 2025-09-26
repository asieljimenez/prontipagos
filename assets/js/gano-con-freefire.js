
$(document).ready(function () {

});

function submitShippingForm(){
    if(validate_form()){
        $("#btnContactForm").attr('disabled',true);
        $(".loading").addClass('d-block');

        grecaptcha.ready(function() {
            grecaptcha.execute('6LeiKYAhAAAAAH6kHEVd4ijpsvsrWimjnSRoGm8m', {action: 'submit'}).then(function(token) {

                var data = getFormJson();
                data.token = token;
                console.log(data);
                $.ajax({
                    url:"/development/api/gano-con-freefire.php",
                    method:"POST",
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: "application/json",
                    success: function (data) {
                      switch(data.code){
                        case 0:
                            $("#div_instructions").hide();
                            $("#div_shipping_form").hide();
                            $("#div_shipping_thank_you").show();
                            $(".sent-message").addClass('d-block');
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
                      $(".error-message").text("Ocurrio un error por favor intente nuevamente");
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


function validate_form(){
    cleanForm();
    if($("#name_freefire_pronti").val().trim() === ""){
        $(".error-message").text("Nombre dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#name_freefire_pronti").focus();
        return false;
    }

    if($("#msisdn_freefire_pronti").val().trim()=== ""){
        $(".error-message").text("Número de celular dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#msisdn_freefire_pronti").focus();
        return false;
    }
    if ($.isNumeric($("#msisdn_freefire_pronti").val().trim()) == false) {
        $(".error-message").text("Número de celular solo debe tener dígitos");
        $(".error-message").addClass('d-block');
        $("#msisdn_freefire_pronti").focus();
        return false;
    }
    if($("#msisdn_freefire_pronti").val().trim().length !=10){
        $(".error-message").text("Número de celular debe tener 10 dígitos");
        $(".error-message").addClass('d-block');
        $("#msisdn_freefire_pronti").focus();
        return false;
    }

    if($("#node_id_freefire_pronti").val().trim()=== ""){
        $(".error-message").text("Referencia Prontipagos");
        $(".error-message").addClass('d-block');
        $("#node_id_freefire_pronti").focus();
        return false;
    }
    if ($.isNumeric($("#node_id_freefire_pronti").val().trim()) == false) {
        $(".error-message").text("Referencia Prontipagos solo debe tener dígitos");
        $(".error-message").addClass('d-block');
        $("#node_id_freefire_pronti").focus();
        return false;
    }

    if($("#email_freefire_pronti").val().trim()=== ""){
        $(".error-message").text("Correo electrónico");
        $(".error-message").addClass('d-block');
        $("#email_freefire_pronti").focus();
        return false;
    }
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($("#email_freefire_pronti").val().trim()) == false){
        $(".error-message").text("Correo electrónico inválido");
        $(".error-message").addClass('d-block');
        $("#email_freefire_pronti").focus();
        return false;
    }


    return true;
}

function cleanForm(){
    $(".error-message").text("");
    $(".error-message").removeClass('d-block');
}

function getFormJson(){
    return {
        "name_freefire_pronti": $("#name_freefire_pronti").val(),
        "msisdn_freefire_pronti":$("#msisdn_freefire_pronti").val(),
        "node_id_freefire_pronti": $("#node_id_freefire_pronti").val(),
        "email_freefire_pronti": $("#email_freefire_pronti").val(),
    };
}

