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

	/* Components */
	this.calendar = ko.observable(new calendar());
	this.months = ko.observableArray([new calendarmonth(2013, 3), new calendarmonth(2013, 4)]);

	/* Panels */
	this.loginpanel = ko.observable(new loginpanel());
	this.registerpanel = ko.observable(new registerpanel());

	/* State */
	this.isLoggedIn = ko.observable(false);
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