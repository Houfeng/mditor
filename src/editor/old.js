/**
 * 定义编辑器类型
 **/
var Editor = module.exports = function (mditor) {
	var self = this;
	self.mditor = mditor;
	self.innerEditor = mditor.ui.editor;
	self._handleIndent();
	self._handleULAndQuote();
	self._handleOL();
	return self;
};

Editor.prototype.getValue = function () {
	var self = this;
	return self.innerEditor.val();
};

Editor.prototype.setValue = function (value) {
	var self = this;
	self.innerEditor.val(value);
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

Editor.prototype.insertBeforeText = function (text) {
	var self = this;
	self.wrapSelectText(text);
	return self;
};

Editor.prototype.insertAfterText = function (text) {
	var self = this;
	self.wrapSelectText("", text);
	return self;
};

Editor.prototype.getBeforeText = function (length) {
	var self = this;
	var range = self.getSelectRange();
	var end = range.start;
	var start = end - length;
	var value = self.getValue();
	return value.substring(start, end);
};

Editor.prototype.getBeforeFirstCharIndex = function (char) {
	var self = this;
	var range = self.getSelectRange();
	var end = range.start;
	var start = 0;
	var value = self.getValue();
	return value.substring(start, end).lastIndexOf(char);
};

Editor.prototype.getBeforeWord = function () {
	var self = this;
	var chars = [" ", "\t", self.mditor.EOL];
	var start = 0;
	chars.forEach(function (char) {
		var index = self.getBeforeFirstCharIndex(char);
		if (index + char.length > start) {
			start = index + char.length;
		}
	});
	var range = self.getSelectRange();
	var value = self.getValue();
	return value.substring(start, range.end);
};

Editor.prototype.getBeforeTextInLine = function () {
	var self = this;
	var start = self.getBeforeFirstCharIndex(self.mditor.EOL) + self.mditor.EOL.length;
	var range = self.getSelectRange();
	var value = self.getValue();
	return value.substring(start, range.end);
};

Editor.prototype.selectBeforeText = function (length) {
	var self = this;
	var range = self.getSelectRange();
	self.setSelectRange(range.start - length, range.end);
	return self;
};

Editor.prototype.selectAfterText = function (length) {
	var self = this;
	var range = self.getSelectRange();
	self.setSelectRange(range.start, range.end + length);
	return self;
};

Editor.prototype.selectBeforeTextInLine = function () {
	var self = this;
	var start = self.getBeforeFirstCharIndex(self.mditor.EOL) + self.mditor.EOL.length;
	var range = self.getSelectRange();
	self.setSelectRange(start, range.end);
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
 * 处理 tab 缩进
 **/
Editor.prototype._handleIndent = function (name, handler) {
	var self = this;
	//增加缩进（0.1.1 有一个不同的实现版本）
	self.mditor.addCommand("addIndent", function (event) {
		var me = this;
		var selectText = me.editor.getSelectText();
		if (selectText.length < 1) {
			me.editor.insertBeforeText(me.INDENT);
			return;
		}
		var textArray = selectText.split(me.EOL);
		var buffer = [];
		var lineCount = textArray.length - 1;
		textArray.forEach(function (line, index) {
			line = line.trim() !== '' ? me.INDENT + line : line;
			if (index < lineCount || line.trim() !== '') {
				buffer.push(line);
			}
		});
		me.editor.setSelectText(buffer.join(me.EOL));
		return self;
	});
	//减少缩进
	self.mditor.addCommand("removeIndent", function (event) {
		var me = this;
		var indentRegExp = new RegExp('^' + me.INDENT);
		var selectText = me.editor.getSelectText();
		if (selectText.length < 1) {
			self.selectBeforeTextInLine();
			if (me.editor.getSelectText().length > 0) {
				event.clearSelected = true;
				me.execCommand('removeIndent', event);
			}
			return;
		}
		var textArray = selectText.split(me.EOL);
		var buffer = [];
		textArray.forEach(function (line, index) {
			if (indentRegExp.test(line)) {
				line = line.replace(me.INDENT, '');
			}
			buffer.push(line);
		});
		me.editor.setSelectText(buffer.join(me.EOL));
		if (event.clearSelected) {
			var range = me.editor.getSelectRange();
			me.editor.setSelectRange(range.end, range.end);
		}
		return self;
	});
	//在回车时根据情况保持缩进
	self.mditor.addCommand("_keepIndent", function (event) {
		var me = this;
		var text = self.getBeforeTextInLine();
		var parts = text.split(me.INDENT);
		if (parts.length < 2) {
			return self;
		}
		event.preventDefault();
		event.keyCode = 0;
		var count = 0;
		var buffer = [me.EOL];
		while (parts[count] === '' &&
			count < (parts.length - 1)) {
			count++;
			buffer.push(me.INDENT);
		}
		me.editor.insertBeforeText(buffer.join(''));
		return self;
	});
	self.mditor.key.bind('tab', 'addIndent');
	self.mditor.key.bind('shift+tab', 'removeIndent');
	self.mditor.key.bind('enter', '_keepIndent', true);
	return self;
};

Editor.prototype._handleULAndQuote = function () {
	var self = this;
	//在回车时根据情况保持缩进
	self.mditor.addCommand("_ulAndQuoteAutoComplete", function (event) {
		var me = this;
		var text = self.getBeforeTextInLine();
		var prefix = text.substr(0, 2);
		if (prefix != '- ' && prefix != '* ' && prefix != '> ') {
			return self;
		}
		event.preventDefault();
		event.keyCode = 0;
		if (text.length > prefix.length) {
			me.editor.insertBeforeText(me.EOL + prefix);
		} else {
			me.editor.selectBeforeText(prefix.length);
			me.editor.setSelectText('');
		}
		return self;
	});
	self.mditor.key.bind('enter', '_ulAndQuoteAutoComplete', true);
	return self;
};

Editor.prototype._handleOL = function () {
	var self = this;
	//在回车时根据情况保持缩进
	self.mditor.addCommand("_olAutoComplete", function (event) {
		var me = this;
		var prefixExp = /\d\.\s/;
		var text = self.getBeforeTextInLine();
		var prefix = text.substr(0, 3);
		if (!prefixExp.test(prefix)) {
			return self;
		}
		event.preventDefault();
		event.keyCode = 0;
		if (text.length > prefix.length) {
			var num = parseInt(prefix[0]) + 1;
			me.editor.insertBeforeText(me.EOL + num + '. ');
		} else {
			me.editor.selectBeforeText(prefix.length);
			me.editor.setSelectText('');
		}
		return self;
	});
	self.mditor.key.bind('enter', '_olAutoComplete', true);
	return self;
};