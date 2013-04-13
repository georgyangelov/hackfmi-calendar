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

	this.error = ko.observable();

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
				Application.alerts.push({ type: "success", title: "Добре дошъл, " + data.FirstName + "!", text: "Входа е успешен." });

				var options = {path: '/'};
				if (self.RememberMe()) {
					var expiration = new Date(data.SessionKey.Expires);
					options.expires = Math.round((expiration.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));
				}

				$.cookie('userId', data.Id, options);
				$.cookie('sessionKey', data.SessionKey.Key, options);
				Application.UpdateUserInfo(data.Id, data.SessionKey.Key);
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