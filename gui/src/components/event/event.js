function event() {
	var self = this;

	this.calendar = ko.observable(new calendar(2013, 3));
	this.events = ko.observableArray([new EventItem(), new EventItem()]);
	this.event = ko.observable(new EventItem());

	this.render = function() {
		this.loadView('event/view');
	};
}