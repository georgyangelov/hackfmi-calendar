function event() {
	this.calendar = ko.observable(new calendar(2013, 3));



	this.render = function() {
		this.loadView('event/view');
	};
}