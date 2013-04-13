function MainVM() {
	var self = this;

	this.calendar = ko.observable(new calendar());
}

KnockoutComponents.basePath = 'src/components/';

Application = new MainVM();
$(function($) {
	ko.applyBindings(Application);
});