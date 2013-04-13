function MainVM() {
	var self = this;

	/* Constants */
	this.MAJORS = [
		'Информатика',
		'Компютърни науки',
		'Математика',
		'Математика и информатика',
		'Приложна математика',
		'Информационни системи',
		'Софтуерно инженерство',
		'Статистика'
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
	this.year = ko.observable(2013);

	/* Components */
	this.calendar = ko.observable(new calendar());
	this.months = ko.computed(function() {
		var monthArray = [];

		for (var i = 0; i < 11; i++) {
			monthArray[i] = new calendarmonth(self.year(), i);
		}

		return monthArray;
	});

	/* Panels */
	this.loginpanel = ko.observable(new loginpanel());
	this.registerpanel = ko.observable(new registerpanel());
}

/* Date item model */
function DateItem(year, month, day, weekday) {
	this.placeholder = false;

	this.year = year;
	this.month = month;
	this.day = day;
	this.weekday = weekday;
}

KnockoutComponents.basePath = 'src/components/';

Application = new MainVM();
$(function($) {
	ko.applyBindings(Application);
});