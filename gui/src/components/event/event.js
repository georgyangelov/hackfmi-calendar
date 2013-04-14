function event(event) {
	var self = this;

	this.calendar = ko.observable(new calendar(2013, 3));
	this.events = ko.observableArray(Application.events());
	this.event = ko.observable(event);

	this.render = function() {
		this.loadView('event/view');
	};
}