function calendarmonth(year, month) {
	var self = this;

	this.year = ko.observable(year);
	this.month = ko.observable(month);

	/* Gets day of week (1 to 7) and starts with Monday */
	function dayOfWeek(date) {
		return date.getDay() == 0 ? 7 : date.getDay();
	}

	this.dates = ko.computed(function() {
		var firstDay = new Date(self.year(), self.month(), 1);
		var lastDay = new Date(self.year(), self.month() + 1, 0);

		var days = [];

		/* Render dates from previous month */
		var daysBeforeFirstDate = dayOfWeek(firstDay) == 1 ? 7 : dayOfWeek(firstDay) - 1;
		var lastMonthDates = new Date(self.year(), self.month(), -daysBeforeFirstDate);

		for (var i = 0; i < daysBeforeFirstDate; i++) {
			lastMonthDates.setDate(lastMonthDates.getDate() + 1);
			days.push(new DateItem(lastMonthDates.getFullYear(), lastMonthDates.getMonth(), lastMonthDates.getDate()));
		}

		/* Render current month */
		for (var day = 1; day <= lastDay.getDate(); day++) {
			days.push(new DateItem(firstDay.getFullYear(), firstDay.getMonth(), day));
		}

		/* Render dates from next month */
		var daysAfterLastDate = dayOfWeek(lastDay) == 7 ? 7 : 7 - dayOfWeek(lastDay);
		var nextMonthDates = new Date(self.year(), self.month() + 1, 1);

		for (var i = 0; i < daysAfterLastDate; i++) {
			days.push(new DateItem(nextMonthDates.getFullYear(), nextMonthDates.getMonth(), nextMonthDates.getDate()));
			nextMonthDates.setDate(nextMonthDates.getDate() + 1);
		}

		return days;
	});

	this.render = function() {
		this.loadView('calendarmonth/view');
	};
}