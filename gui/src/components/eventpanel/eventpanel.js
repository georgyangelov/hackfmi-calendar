function eventpanel() {
	var self = this;

	this.name = ko.observable("").extend({
		validation: {
			required: true,
			message: "Напиши заглавие"
		}
	});

	this.description = ko.observable("").extend({
		validation: {
			required: true,
			message: "Напиши описание"
		}
	});

	this.tags = ko.observable("");

	this.date = ko.observable("");
	this.hour = ko.observable("");


	this.isFormValid = ko.computed(function () {
		return this.name.isValid() && this.description.isValid();
	}, this);

	this.error = ko.observable("");

	self.submit = function () {
		var date = new Date(Date.parse(self.date() + " " + self.hour()));

		amplify.request({
            resourceId: "add_event",
            data: {
            	session_key: Application.session_key(),
                name: self.name(),
                description: self.description(),
                tags: self.tags(),
                date: date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
            },
            success: function (data) {
                self.error(null);

                $('#eventpanel').modal('hide');
                Application.alerts.push({ type: "success", title: "Супер!", text: "Добави ново събитие" });
            },
            error: function (data) {
            	self.error("Нещо се случи! Да не раздели на нула?");
            }
        });

		return false;
	}

	this.render = function() {
		this.loadView('eventpanel/view');
	};
}