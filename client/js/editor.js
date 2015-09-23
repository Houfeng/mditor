define(function (require, exports, module) {
	
	/**
	 * 定义编辑器类型 
	 **/
	var Editor = module.exports = function (mditor) {
		var self = this;
		self.innerEditor = mditor.ui.editor;
		self._bindEvents();
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

});