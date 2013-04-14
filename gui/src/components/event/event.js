function event(event) {
	var self = this;

	this.calendar = ko.observable(new calendar(2013, 3));
	this.events = ko.observableArray(Application.events());
	this.event = ko.observable(event);

	this.comments = ko.observableArray([]);

	this.loadComments = function() {
		amplify.request({
			resourceId: "get_comments",
			data: {
				eventid: self.event().id()
			},
			success: function (data) {
				self.comments(data);
			},
			error: function (data) {
				console.log(data);
			}
		});
	};

	this.loadComments();

	this.newCommentText = ko.observable("");
	this.addComment = function() {
		amplify.request({
			resourceId: "add_comment",
			data: {
				session_key: Application.session_key(),
				eventid: self.event().id(),
				content: self.newCommentText()
			},
			success: function (data) {
				self.comments(data);

				Application.alerts.push({ type: "success", title: "Коментарът е добавен!", text: "Благодарим за мнението." });

				self.loadComments();
			},
			error: function (data) {
				Application.alerts.push({ type: "error", title: "Възникна грешка!", text: "На нула не се дели." });

				console.log(data);
			}
		});
	};

	this.render = function() {
		this.loadView('event/view');
	};
}
