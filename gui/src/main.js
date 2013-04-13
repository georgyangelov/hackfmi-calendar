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

	/* Components */
	this.calendar = ko.observable(new calendar());
	this.leftCalendar = ko.observable(new calendarmonth(2013, 2));
	this.centerCalendar = ko.observable(new calendarmonth(2013, 3));
	this.rightCalendar = ko.observable(new calendarmonth(2013, 4));

	/* Panels */
	this.loginpanel = ko.observable(new loginpanel());
	this.registerpanel = ko.observable(new registerpanel());

	/* Stuff */
	this.alerts = ko.observableArray([]).extend({ defaultItem: { title: "", text: "", type: "info" } });
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

	// Remove closed alerts from the Application.alerts array
	$('#alertsContainer .alert').on('closed', function () {
		Application.alerts.remove(ko.dataFor(this));
	});
});