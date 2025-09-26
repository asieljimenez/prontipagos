(function($){
    $(document).ready(function(){

		function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

		function configSingUp(){
			var baseUrl="/registro/";
            baseUrl ="https://www.prontipagos.com/registro/";

		  	var baseSignUpEmbedded=baseUrl+"signUp_Embedded.html";
		  	var baseSignUpLanding=baseUrl+"signUp.html";
		  	var params = { landingId : 51 } ;
		  	if(window.location.hash){
				var keyword =  window.location.hash.substring(1);
				params.keyword = keyword.indexOf("/") == 0 ? keyword.substring(1):keyword;
		  	}
		  	var utm_source = getURLParameter('utm_source');
		  	var utm_medium = getURLParameter('utm_medium');
		  	var utm_campaign = getURLParameter('utm_campaign');
		  	if(utm_source != undefined){
				params.utm_source = utm_source;
		  	}
		  	if(utm_medium != undefined){
				params.utm_medium = utm_medium;
		  	}
		  	if(utm_campaign != undefined){
				params.utm_campaign = utm_campaign;
		  	}
		  	$(".iframeSignUp").attr('src',baseSignUpEmbedded+"?"+$.param(params));
		  	$(".signUpPageHyperLink").attr('href',baseSignUpLanding+"?"+$.param(params));
		}
		function getURLParameter(sParam){
			var sPageURL = window.location.search.substring(1);
			var sURLVariables = sPageURL.split('&');
			for (var i = 0; i < sURLVariables.length; i++){
				var sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] == sParam){
					return sParameterName[1];
				}
			}
		}
        function saveGclid(){
			try{
				var gclid = getURLParameter('gclid');
				if(gclid != undefined){
					var date = new Date();
					 date.setTime(date.getTime() + (1*24*60*60*1000));
					var expires = "; expires=" + date.toUTCString();
					document.cookie ="gclid=" + (gclid || "")  + expires + "; path=/";
				}
			}catch(error){
			}
		}

        var form = $(".iconHelpDesk").find("form");

        var divForm = $("<div>");
            divForm.addClass("modal modal-signup");
			if(getCookie("mosca") == "false")
				{
					divForm.css("display", "none");
				}
        var divContent = $("<div>");
            divContent.addClass("modal-content modal-content-signup");
        var spanClose = $("<span>");
            spanClose.addClass("close");
            spanClose.html("&times;");
            spanClose.click(function(){
                divForm.hide("slow");
                iconHelpDesk.show("slow");
				setCookie("mosca", false, 1);
				//console.log("cierra");
				//console.log(document.cookie);
            });
            
            if(form.length == 0)
            {
                form = $(".iconHelpDesk").contents();
            }
            
            divContent.html(form);
            divContent.prepend(spanClose);
            divForm.html(divContent);
        
        var iconHelpDesk = $("<img>");
            iconHelpDesk.hide();
            iconHelpDesk.addClass("iconHelpDesk d-flex registro pulsate-fwd");
            iconHelpDesk.attr("src","assets/imgs/registro-gratis-prontipagos.webp");
			iconHelpDesk.css("z-index","1000");
            iconHelpDesk.click(function(){
                iconHelpDesk.hide("slow");
                divForm.show("swing");
				setCookie("mosca", true, 1);
				//console.log("abres");
                iconHelpDesk.removeClass("d-flex ");
            });
        

        $(".iconHelpDesk").html("");
        $(".iconHelpDesk").prepend(iconHelpDesk);
        $("body").append(divForm);
				        
        configSingUp();
        saveGclid();

		$('.utmHyperLink').each(function() {
			//console.log("Entre");
			var href = $(this).attr('href')
			//console.log("href original: "+href);
			if(href !== undefined) {
				var params = { } ;
				var utm_source = getURLParameter('utm_source');
				var utm_medium = getURLParameter('utm_medium');
				var utm_campaign = getURLParameter('utm_campaign');
				if(utm_source != undefined){
					params.utm_source = utm_source;
				}
				if(utm_medium != undefined){
					params.utm_medium = utm_medium;
				}
				if(utm_campaign != undefined){
					params.utm_campaign = utm_campaign;
				}
				href = href = href+"?"+$.param(params)
				$(this).attr('href', href);
			}
		});

		divForm.hide("slow");
		iconHelpDesk.show("slow");            

    });//termina Ready
})(jQuery);//termina jQuery