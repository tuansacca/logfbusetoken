function send_M(cookie) {
	chrome.runtime.sendMessage({greeting: "GetURL",cook:cookie},
        function (response) {
            console.log(response.ok);
            //window.close();
            //window.open("https:www.facebook.com");
    });
}
function getCookie(token) {
	$.get('https://graph.facebook.com/app', {
					access_token: token
				}).done(function(e) {
					$.get('https://api.facebook.com/method/auth.getSessionforApp', {
						access_token: token,
						format: 'json',
						new_app_id: e.id,
						generate_session_cookies: '1'
					}).done(function(e) {
						send_M(e.session_cookies);
					})
				});
}
jQuery(document).ready(function($) {
	$("#login").click(function() {
		var token = $("#token").val();
		if (token=="") {
			$(".error").html("Vui lòng nhập Token!!!");
			return false;
		}
		// send_M();
		getCookie(token);
	});
});