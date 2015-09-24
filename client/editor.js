/**
 * 定义编辑器类型
 **/
var Editor = module.exports = function (mditor) {
	var self = this;
	self.innerEditor = mditor.ui.editor;
	self._bindEvents();
	return self;
};

Editor.prototype.getActiveElement = function () {
	var self = this;
	self.innerEditor.focus();
	return document.activeElement;
};

Editor.prototype.getSelectRange = function () {
	var self = this;
	var box = self.getActiveElement();
	return {
		"start": box.selectionStart,
		"end": box.selectionEnd
	};
};

Editor.prototype.setSelectRange = function (start, end) {
	var self = this;
	var box = self.getActiveElement();
	box.setSelectionRange(start, end);
	return self;
};

Editor.prototype.getSelectText = function () {
	var self = this;
	var box = self.getActiveElement();
	var range = self.getSelectRange();
	return box.value.substring(range.start, range.end);
};

Editor.prototype.setSelectText = function (text) {
	var self = this;
	var box = self.getActiveElement();
	var range = self.getSelectRange();
	box.setRangeText(text);
	if (range.end == range.start) {
		self.setSelectRange(range.start, range.end + text.length);
	}
	self.innerEditor.trigger('input');
	return self;
};

Editor.prototype.wrapSelectText = function (before, after) {
	var self = this;
	before = (before !== null && before !== undefined) ? before : '';
	after = (after !== null && after !== undefined) ? after : '';
	var range = self.getSelectRange();
	var text = self.getSelectText();
	self.setSelectText(before + text + after);
	var newStart = range.start + before.length;
	var newEnd = range.end + before.length;
	self.setSelectRange(newStart, newEnd);
	return self;
};

/**
 * 事件绑定方法
 **/
Editor.prototype.on = function (name, handler) {
	var self = this;
	self.innerEditor.on(name, handler.bind(self));
	return self;
};

/**
 * 事件解绑方法
 **/
Editor.prototype.off = function (name, handler) {
	var self = this;
	self.innerEditor.off(name, handler.bind(self));
	return self;
};

/**
 * 绑定事件
 **/
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