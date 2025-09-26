
$(document).ready(function () {
    console.log("ready");
    Rx.Observable.fromEvent($('#zip_code'), 'keyup')
        .map(function(e){ return e.target.value;})
        .debounceTime(500)
        .distinctUntilChanged()
    .subscribe(keyword => {
        zipCodeSearch(keyword);
    });
});

function submitShippingForm(){
    if(validate_shipping_form()){
        $("#btnContactForm").attr('disabled',true);
        $(".loading").addClass('d-block');

        grecaptcha.ready(function() {
            grecaptcha.execute('6LeiKYAhAAAAAH6kHEVd4ijpsvsrWimjnSRoGm8m', {action: 'submit'}).then(function(token) {

                var data = getShippingFormJson();
                data.token = token;
                console.log(data);
                $.ajax({
                    url:"/development/api/shipping_marketing_package.php",
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


function validate_shipping_form(){
    cleanForm();
    if($("#name").val().trim() === ""){
        $(".error-message").text("Nombre dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#name").focus();
        return false;
    }
    if($("#last_name").val().trim()=== ""){
        $(".error-message").text("Apellido dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#last_name").focus();
        return false;
    }
    if($("#node_id").val().trim() === ""){
        $(".error-message").text("Referencia Prontipagos dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#node_id").focus();
        return false;
    }
    if($.isNumeric($("#node_id").val().trim()) == false){
        $(".error-message").text("Referencia Prontipagos debe ser numérica");
        $(".error-message").addClass('d-block');
        $("#node_id").focus();
        return false;
    }
    if($("#store_name").val().trim() === ""){
        $(".error-message").text("Nombre de tienda dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#store_name").focus();
        return false;
    }
    if($("#email").val().trim() === ""){
        $(".error-message").text("Correo electrónico dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#email").focus();
        return false;
    }
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($("#email").val().trim()) == false){
        $(".error-message").text("Correo electrónico inválido");
        $(".error-message").addClass('d-block');
        $("#email").focus();
        return false;
    }
    if($("#msisdn").val().trim() === ""){
        $(".error-message").text("Número de celular dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#msisdn").focus();
        return false;
    }
    if ($.isNumeric($("#msisdn").val().trim()) == false) {
        $(".error-message").text("Número de celular debe tener solamente dígitos");
        $(".error-message").addClass('d-block');
        $("#msisdn").focus();
        return false;
    }
    if($("#msisdn").val().trim().length !=10){
        $(".error-message").text("Número de celular debe tener 10 dígitos");
        $(".error-message").addClass('d-block');
        $("#msisdn").focus();
        return false;
    }

    if($("#zip_code").val().trim() === ""){
        $(".error-message").text("Código postal dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#zip_code").focus();
        return false;
    }
    if($("#zip_code").val().trim().length != 5){
        $(".error-message").text("Código postal debe ser de 5 dígitos");
        $(".error-message").addClass('d-block');
        $("#zip_code").focus();
        return false;
    }
    if($("#street").val().trim() === ""){
        $(".error-message").text("Calle dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#street").focus();
        return false;
    }
    if($("#exterior_number").val().trim() === ""){
        $(".error-message").text("Número exterior dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#exterior_number").focus();
        return false;
    }
    if($("#references").val().trim() === ""){
        $(".error-message").text("Entre que calles se encuentra");
        $(".error-message").addClass('d-block');
        $("#references").focus();
        return false;
    }
    if($("#instructions").val().trim() === ""){
        $(".error-message").text("Indicaciones adicionales para hacer la entrega dato obligatorio");
        $(".error-message").addClass('d-block');
        $("#instructions").focus();
        return false;
    }

    return true;
}

function cleanForm(){
    $(".error-message").text("");
    $(".error-message").removeClass('d-block');
}

function getShippingFormJson(){
    return {
        "name": $("#name").val(),
        "last_name":$("#last_name").val(),
        "node_id": $("#node_id").val(),
        "store_name": $("#store_name").val(),
        "zip_code": $("#zip_code").val(),
        "state": $("#state").val(),
        "town": $("#town").val(),
        "neighborhood": $("#neighborhood option:selected").text().trim(),
        "neighborhoodId":$("#neighborhood").val(),
        "street":$("#street").val(),
        "exterior_number":$("#exterior_number").val(),
        "interior_number":$("#interior_number").val(),
        "references":$("#references").val(),
        "email":$("#email").val(),
        "msisdn":$("#msisdn").val(),
        "instructions":$("#instructions").val(),
    };
}

function zipCodeSearch(zipCode){  
    console.log(zipCode);
    if(zipCode.length == 5){
        $.ajax({
            url: "https://www.prontipagos.com/development/api/zip_code.php?zip_code="+zipCode,
            method: "GET",
            success:function(data){
                console.log(data);
                if(data.code == 0){
                    fillNeighborhood(data.payload);
                    if(data.payload.length == 0){
                        $(".error-message").text("C.P. inválido");
                        $(".error-message").addClass('d-block');
                        $("#zip_code").focus();
                    }
                }else{
                    fillNeighborhood([]);
                    $("#zip_code").val("");
                    $(".error-message").text("Ocurrio un error por valor, ingrese nuevamente el C.P.");
                    $(".error-message").addClass('d-block');
                    $("#zip_code").focus();
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                fillNeighborhood([]);
                $("#zip_code").val("");
                $(".error-message").text("Ocurrio un error por valor, ingrese nuevamente el C.P.");
                $(".error-message").addClass('d-block');
                $("#zip_code").focus();
            }
        });  
    }else{
        fillNeighborhood([]);
    }
}

function fillNeighborhood(zipCodeInfo){

    var selectNeighborhood = $("#neighborhood");
        selectNeighborhood
            .find('option')
            .remove()
            .end();
            
    $.each(zipCodeInfo, function(index, item) {
        selectNeighborhood.append(new Option(item.township, item.id));
    });

    $("#town").find('option').remove().end();
    $("#state").find('option').remove().end();
    
    if(zipCodeInfo.length > 0){
        $("#div_town").show();
        $("#div_state").show();
        $("#div_neighborhood").show();       
        $("#town").val(zipCodeInfo[0].townsCatalogTO.name);     
        $("#state").val(zipCodeInfo[0].townsCatalogTO.statesCatalogTO.name);  
        $("#state").attr('readonly', true);
        $("#town").attr('readonly', true)
    }else{
        $("#div_town").hide();
        $("#div_state").hide();
        $("#div_neighborhood").hide(); 
        $("#state").val("");
        $("#town").val("");
    }    
}