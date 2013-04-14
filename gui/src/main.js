function MainVM() {
	var self = this;

	/* Constants */
	this.MAJORS = [
		{id: 1, name: 'Информатика'},
		{id: 2, name: 'Компютърни науки'},
		{id: 3, name: 'Математика'},
		{id: 4, name: 'Математика и информатика'},
		{id: 5, name: 'Приложна математика'},
		{id: 6, name: 'Информационни системи'},
		{id: 7, name: 'Софтуерно инженерство'},
		{id: 8, name: 'Статистика'}
	];
	this.MONTHS = [
		'Януари',
		'Февруари',
		'Март',
		'Април',
		'Май',
		'Юни',
		'Юли',
		'Август',
		'Септември',
		'Октомври',
		'Ноември',
		'Декември'
	];

	/* State */
	this.isLoggedIn = ko.observable(false);
	this.user = ko.observable(null);
	this.session_key = ko.observable("");

	this.year = ko.observable(2013);
	this.month = ko.observable(3);

	this.event = ko.observable(null);
	this.isEventPage = ko.computed(function() {
		return self.event() != null;
	});

	/* Components */
	// this.leftCalendar = ko.observable(new calendarmonth(2013, 2));
	// this.centerCalendar = ko.observable(new calendarmonth(2013, 3));
	// this.rightCalendar = ko.observable(new calendarmonth(2013, 4));
	this.leftCalendar = ko.computed(function() {
		var prev_year = self.year();
		var prev_month = self.month() - 1;
		if (prev_month == -1) {
			prev_month = 11;
			prev_year = self.year() - 1;
		}

		return new calendarmonth(prev_year, prev_month, true);
	});
	this.centerCalendar = ko.computed(function() {
		return new calendarmonth(self.year(), self.month(), true);
	});
	this.rightCalendar = ko.computed(function() {
		var next_year = self.year();
		var next_month = self.month() + 1;
		if (next_month == 12) {
			next_month = 0;
			next_year = self.year() + 1;
		}

		return new calendarmonth(next_year, next_month, true);
	});

	this.events = ko.computed(function() {
		return self.centerCalendar().events().slice(0, 5);
	});

	/* Panels */
	this.loginpanel = ko.observable(new loginpanel());
	this.registerpanel = ko.observable(new registerpanel());
	this.eventpanel = ko.observable(new eventpanel());

	/* Stuff */
	this.alerts = ko.observableArray([]).extend({ defaultItem: { title: "", text: "", type: "info" } });

	/* Methods */
	this.next_month = function() {
		var next_month = self.month() + 1;
		if (next_month > 11) {
			next_month = 0;
			self.year(self.year() + 1);
		}

		self.month(next_month);
	}

	this.prev_month = function() {
		var prev_month = self.month() - 1;
		if (prev_month < 0) {
			prev_month = 11;
			self.year(self.year() - 1);
		}

		self.month(prev_month);
	}
}

function EventItem(data) {
	var self = this;

	this.id = ko.observable(data.id_field);

	this.name = ko.observable(data.name);
	this.date = ko.observable(new Date(Date.parse(data.date)));
	this.description = ko.observable(data.description);
	this.tags = ko.observableArray(data.tags);

	this.switchToEvent = function() {
		Application.event(new event(self));
	};
}

function convertEventItems(data) {
	return data.map(function(obj) {
		return new EventItem(obj);
	});
}

/* Date item model */
function DateItem(year, month, day, weekday, calendar) {
	var self = this;

	this.placeholder = false;

	this.year = year;
	this.month = month;
	this.day = day;
	this.weekday = weekday;

	this.events = ko.computed(function() {
		return calendar.events().filter(function(event) {
			return event.date().getFullYear() == year && event.date().getMonth() == month && event.date().getDate() == day;
		});
	});

	this.switchToEvent = function() {
		if (self.events().length > 0)
			Application.event(new event(self.events()[0]));
	};
}

KnockoutComponents.basePath = 'src/components/';

Application = new MainVM();
$(function($) {
	ko.applyBindings(Application);

	// Remove closed alerts from the Application.alerts array
	$('#alertsContainer .alert').on('closed', function () {
		Application.alerts.remove(ko.dataFor(this));
	});
});