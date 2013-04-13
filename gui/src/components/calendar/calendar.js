function calendar() {
	var self = this;

	this.year = ko.observable(2013);
	this.month = ko.observable(3);

	/* Placeholders before the actual dates */
	this.datesPlaceholders = ko.computed(function() {
		var num = dayOfWeek(new Date(self.year(), 0, 1)) - 1;
		var dates = [];
		var placeholder = new DateItem();
		placeholder.placeholder = true;

		for (var i = 0; i < num; i++) {
			dates.push(placeholder);
		};

		return dates;
	});

	/* Gets day of week (1 to 7) and starts with Monday */
	function dayOfWeek(date) {
		return date.getDay() == 0 ? 7 : date.getDay();
	}

	this.dates = ko.computed(function() {
		var currentDate = new Date(self.year(), 0, 1);

		var dates = [];

		/* Render current month */
		while (currentDate.getFullYear() == self.year()) {
			var date = new DateItem(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), dayOfWeek(currentDate));
			dates.push(date);
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return dates;
	});

	this.render = function() {
		this.loadView('calendar/view');
	};
}