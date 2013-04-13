function loginpanel() {
	var self = this;

	this.email = ko.observable("").extend({
		validation: {
			required: true,
			regex: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
			message: "Напиши си мейла"
		}
	});
	this.password = ko.observable("").extend({
		validation: {
			required: true,
			message: "Напиши си паролата"
		}
	});
	this.RememberMe = ko.observable(false);

	this.isFormValid = ko.computed(function () {
		return this.email.isValid() && this.password.isValid();
	}, this);

	this.error = ko.observable("");

	self.submit = function () {

		amplify.request({
			resourceId: "login",
			data: {
				email: self.email(),
				password: self.password()
			},
			success: function (data) {
				self.error(null);

				Application.isLoggedIn(true);
				$('#login').modal('hide');
				Application.alerts.push({ type: "success", title: "Добре дошъл, " + data.user.first_name + "!", text: "Входа е успешен." });

				var options = {path: '/'};
				// if (self.RememberMe()) {
				// 	var expiration = new Date(data.session_key);
				// 	options.expires = Math.round((expiration.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));
				// }

				$.cookie('sessionKey', data.session_key.Key, options);
				Application.user(data.user);
				Application.session_key(data.session_key);
			},
			error: function (data) {
				if (typeof data.error !== "undefined" && typeof data.message !== "undefined") {
					self.error(data.message);
				} else {
					self.error("Something went completely wrong. Did you just divide by zero?");
				}
			}
		});

		return false;
	}

	this.render = function() {
		this.loadView('loginpanel/view');
	};
}