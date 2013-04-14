

amplify.request.decoders.errorDecoder =
    function (data, status, xhr, success, error) {
    	if (status == "success") {
    		success(data, status);
    	} else {
    		error($.parseJSON(xhr.responseText), xhr.status);
    	}
    };

amplify.request.define(
    "checkEmail", "ajax",
    {
        url: "/check/{email}",
        type: "GET",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);

amplify.request.define(
    "login", "ajax",
    {
        url: "/user/login/",
        type: "POST",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);

amplify.request.define(
    "register", "ajax",
    {
        url: "/user/register/",
        type: "POST",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);

amplify.request.define(
    "get_events_month", "ajax",
    {
        url: "/events/month/{month}",
        type: "GET",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);

amplify.request.define(
    "add_event", "ajax",
    {
        url: "/events/session/{session_key}",
        type: "POST",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);

amplify.request.define(
    "get_comments", "ajax",
    {
        url: "/comments/{eventid}",
        type: "GET",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);

amplify.request.define(
    "add_comment", "ajax",
    {
        url: "/comment/{session_key}/{eventid}",
        type: "POST",
        dataType: "json",
        cache: false,
        decoder: "errorDecoder"
    }
);