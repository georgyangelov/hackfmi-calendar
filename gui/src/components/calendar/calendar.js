function calendar(year, month) {
	var self = this;

	this.year = ko.observable(year);

	this.months = ko.computed(function() {
		var months = [];

		for (var i = 0; i < 12; i++) {
			months.push(new calendarmonth(self.year(), i));
		}

		return months;
	});

	this.render = function() {
		this.loadView('calendar/view');
	};
}