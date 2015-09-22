define(function (require, exports, module) {
	var Editor = module.exports = function (mditor) {
		var self = this;
		self.mditor = mditor;
		self.ui = mditor.ui;
		self._bindEvents();
	};

	Editor.prototype.on = function (name, handler) {
		var self = this;
		self.ui.editor.on(name, handler.bind(self));
		return self;
	};

	Editor.prototype._bindEvents = function (name, handler) {
		var self = this;
		self.on('keydown', function (event) {
			if (event.keyCode == 9) {
				event.preventDefault();
				var textarea = event.target;
				var indent = '\t';
				var start = textarea.selectionStart;
				var end = textarea.selectionEnd;
				var selected = window.getSelection().toString();
				selected = indent + selected.replace(/\n/g, '\n' + indent);
				textarea.value = textarea.value.substring(0, start) + selected + textarea.value.substring(end);
				textarea.setSelectionRange(start + indent.length, start + selected.length);
			}
		});
		return self;
	};

});