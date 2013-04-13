ko.bindingHandlers.fixedScroll = {
	update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		var options = ko.utils.unwrapObservable(valueAccessor());
console.log($(element).parent());
		$(element).parent().on('scroll', function (e) {
			console.log(e);
		});
		$(element).css('position', 'absolute');
	}
};