

amplify.request.decoders.errorDecoder =
    function (data, status, xhr, success, error) {
    	if (status == "success") {
    		success(data, status);
    	} else {
    		error($.parseJSON(xhr.responseText), xhr.status);
    	}
    };

amplify.request.define(
    "login", "ajax",
    {
        url: "../api/login",
        type: "POST",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);

amplify.request.define(
    "register", "ajax",
    {
        url: "../api/register",
        type: "POST",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);