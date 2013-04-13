function registerpanel() {
    var self = this;

    this.student_id = ko.observable("").extend({
        validation: {
            required: true,
            regex: /[1-9][0-9]+/,
            message: "Въведи валиден факултетен номер"
        }
    });
    this.first_name = ko.observable("").extend({
        validation: {
            required: true,
            message: "Въведи име"
        }
    });
    this.last_name = ko.observable("").extend({
        validation: {
            required: true,
            message: "Въведи фамилия"
        }
    });

    this.grade = ko.observable("").extend({
        validation: {
            required: true,
            regex: /[1-9][0-9]+/,
            message: "Въведи курс"
        }
    });
    this.major = ko.observable("").extend({
        validation: {
            required: true
        }
    });

    this.email = ko.observable("").extend({
        validation: {
            required: true,
            regex: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "Въведи валиден мейл",
            func: function (value) {
                if (value == "")
                	return true;

                // Verify that the email is available
                amplify.request({
                    resourceId: "checkemail",
                    data: {
                        email: value
                    },
                    success: function (data) {
                        if (!data.available) {
                            self.email.invalidate("Мейлът вече е зает");
                        }
                    }
                });
            }
        }
    });
    this.password = ko.observable("").extend({
        validation: {
            required: true,
            message: "Въведи парола"
        }
    });
    this.repeat_password = ko.observable("").extend({
        validation: {
            func: function (value) {
                return value == self.password();
            },
            computed: true,
            message: "Двете пароли не съвпадат"
        }
    });

    this.isFormValid = ko.computed(function () {
        return this.first_name.isValid() && this.last_name.isValid() && this.email.isValid() && this.password.isValid() && this.repeat_password.isValid();
    }, this);

    this.error = ko.observable();

    self.register = function () {

        amplify.request({
            resourceId: "register",
            data: {
                first_name: self.first_name(),
                last_name: self.last_name(),
                email: self.email(),
                password: self.password()
            },
            success: function (data) {
                self.error(null);

                $('#register').modal('hide');
                Application.alerts.push({ type: "success", title: "Супер!", text: "Регистрирал си се успешно" });
            },
            error: function (data) {
            	self.error("Нещо се случи! Да не раздели на нула?");
            }
        });

        return false;
    }

    this.render = function() {
        this.loadView('registerpanel/view');
    };
}