KnockoutComponents = {
	basePath: '',
	defaultSuffix: '.html'
};

ko.bindingHandlers.component = {
	update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		var options = ko.utils.unwrapObservable(valueAccessor());

		if (typeof options === "object" && options !== null && typeof options.render === "function") {

			options.element = element;
			options.loadView = function(view) {
				$(element).children().remove();

				$(element).load(KnockoutComponents.basePath + view + KnockoutComponents.defaultSuffix, function () {
					//var childBindingContext = bindingContext.createChildContext(viewModel);
					//ko.utils.extend(childBindingContext, newProperties);
					ko.applyBindingsToDescendants(options, element);
				});
			};

			options.render($(element));
		}

		return { controlsDescendantBindings: true };
	}
};

ko.extenders.defaultItem = function (target, obj) {
	function updateItem(ar) {
		for (var objectKey in ar) {
			for (var propertyKey in obj) {
				if (typeof ar[objectKey][propertyKey] === "undefined") {
					target()[objectKey][propertyKey] = obj[propertyKey];
				}
			}
		}
	}

	target.subscribe(updateItem);

	return target;
};

ko.extenders.activated = function (target, options) {
	var last = false;

	function onChange(value) {
		if (value && !last) {
			if (typeof options.activated === "function")
				options.activated();
		}
		else if (!value && last) {
			if (typeof options.deactivated === "function")
				options.deactivated();
		}

		last = !!value;
	}

	target.subscribe(onChange);
};