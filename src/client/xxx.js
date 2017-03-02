
/**
 * 处理 tab 缩进
 **/
Editor.prototype._handleIndent = function (name, handler) {
	let self = this;
	//增加缩进（0.1.1 有一个不同的实现版本）
	self.mditor.addCommand('addIndent', function (event) {
		let me = this;
		let selectText = me.editor.getSelectText();
		if (selectText.length < 1) {
			me.editor.insertBeforeText(me.INDENT);
			return;
		}
		let textArray = selectText.split(me.EOL);
		let buffer = [];
		let lineCount = textArray.length - 1;
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
	self.mditor.addCommand('removeIndent', function (event) {
		let me = this;
		let indentRegExp = new RegExp('^' + me.INDENT);
		let selectText = me.editor.getSelectText();
		if (selectText.length < 1) {
			self.selectBeforeTextInLine();
			if (me.editor.getSelectText().length > 0) {
				event.clearSelected = true;
				me.execCommand('removeIndent', event);
			}
			return;
		}
		let textArray = selectText.split(me.EOL);
		let buffer = [];
		textArray.forEach(function (line, index) {
			if (indentRegExp.test(line)) {
				line = line.replace(me.INDENT, '');
			}
			buffer.push(line);
		});
		me.editor.setSelectText(buffer.join(me.EOL));
		if (event.clearSelected) {
			let range = me.editor.getSelectRange();
			me.editor.setSelectRange(range.end, range.end);
		}
		return self;
	});
	//在回车时根据情况保持缩进
	self.mditor.addCommand('_keepIndent', function (event) {
		let me = this;
		let text = self.getBeforeTextInLine();
		let parts = text.split(me.INDENT);
		if (parts.length < 2) {
			return self;
		}
		event.preventDefault();
		event.keyCode = 0;
		let count = 0;
		let buffer = [me.EOL];
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
	let self = this;
	//在回车时根据情况保持缩进
	self.mditor.addCommand('_ulAndQuoteAutoComplete', function (event) {
		let me = this;
		let text = self.getBeforeTextInLine();
		let prefix = text.substr(0, 2);
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
	let self = this;
	//在回车时根据情况保持缩进
	self.mditor.addCommand('_olAutoComplete', function (event) {
		let me = this;
		let prefixExp = /\d\.\s/;
		let text = self.getBeforeTextInLine();
		let prefix = text.substr(0, 3);
		if (!prefixExp.test(prefix)) {
			return self;
		}
		event.preventDefault();
		event.keyCode = 0;
		if (text.length > prefix.length) {
			let num = parseInt(prefix[0]) + 1;
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