/**
 * 定义工具条类型
 **/
var Toolbar = module.exports = function (mditor) {
	var self = this;
	self.mditor = mditor;
	self.holder = mditor.ui.toolbar;
	self.keymap = mditor.options.keymap || {};
	self.controlHolder = mditor.ui.control;
	self.update();
};

/**
 * 右角控制按钮
 **/
Toolbar.prototype.controlItems = {
	"togglePreview": {
		"title": "预览",
		"icon": "columns",
		"key": "shift+alt+v"
	},
	"toggleFullScreen": {
		"title": "全屏",
		"icon": "arrows-alt",
		"key": "shift+alt+f"
	}
};

/**
 * 初始化内置工具项
 **/
Toolbar.prototype.items = {
	"bold": {
		"title": "粗体",
		"handler": function (event) {
			this.editor.wrapSelectText("**", "**");
			return this;
		},
		"key": "shift+alt+b"
	},
	"italic": {
		"title": "斜体",
		"handler": function (event) {
			this.editor.wrapSelectText("*", "*");
			return this;
		},
		"key": "shift+alt+i"
	},
	"underline": {
		"title": "下划线",
		"handler": function (event) {
			this.editor.wrapSelectText("<u>", "</u>");
			return this;
		},
		"key": "shift+alt+e"
	},
	"strikethrough": {
		"title": "删除线",
		"handler": function (event) {
			this.editor.wrapSelectText("~~", "~~");
			return this;
		},
		"key": "shift+alt+d"
	},
	"header": {
		"title": "标题",
		"handler": function (event) {
			this.editor.wrapSelectText("# ");
			return this;
		},
		"key": "shift+alt+h"
	},
	"quote": {
		"icon": "quote-left",
		"title": "引用",
		"handler": function (event) {
			var selectText = this.editor.getSelectText();
			if (selectText.length < 1) {
				this.editor.wrapSelectText("> ");
				return;
			}
			var textArray = selectText.split(this.EOL);
			var buffer = [];
			textArray.forEach(function (line) {
				buffer.push("> " + line + "  ");
			});
			this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
			return this;
		},
		"key": "shift+alt+q"
	},
	"code": {
		"title": "代码",
		"handler": function (event) {
			var lang = "javascript" + this.EOL;
			var before = "```" + lang;
			var after = "```  " + this.EOL;
			var text = this.editor.getSelectText().trim();
			if (text.length > 0) {
				text += this.EOL;
			}
			this.editor.setSelectText(text);
			this.editor.wrapSelectText(before, after);
			var range = this.editor.getSelectRange();
			var start = range.start - lang.length;
			var end = range.start - this.EOL.length;
			this.editor.setSelectRange(start, end);
			return this;
		},
		"key": "shift+alt+c"
	},
	"list-ol": {
		"title": "有序列表",
		"handler": function (event) {
			var selectText = this.editor.getSelectText();
			if (selectText.length < 1) {
				this.editor.wrapSelectText("1. ");
				return this;
			}
			var textArray = selectText.split(this.EOL);
			var buffer = [];
			for (var i = 0; i < textArray.length; i++) {
				var line = textArray[i];
				buffer.push((i + 1) + ". " + line);
			}
			this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
			return this;
		},
		"key": "shift+alt+o"
	},
	"list-ul": {
		"title": "无序列表",
		"handler": function (event) {
			var selectText = this.editor.getSelectText();
			if (selectText.length < 1) {
				this.editor.wrapSelectText("- ");
				return this;
			}
			var textArray = selectText.split(this.EOL);
			var buffer = [];
			textArray.forEach(function (line) {
				buffer.push("- " + line);
			});
			this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
			return this;
		},
		"key": "shift+alt+u"
	},
	"link": {
		"title": "链接",
		"handler": function (event) {
			this.editor.wrapSelectText("[text](", ")");
			return this;
		},
		"key": "shift+alt+l"
	},
	"table": {
		"title": "表格",
		"handler": function (event) {
			var buffer = [
				"column1 | column2 | column3  ",
				"------- | ------- | -------  ",
				"column1 | column2 | column3  ",
				"column1 | column2 | column3  ",
				"column1 | column2 | column3  "
			];
			this.editor.wrapSelectText(buffer.join(this.EOL) + this.EOL);
			return this;
		},
		"key": "shift+alt+t"
	},
	"line": {
		"title": "分隔线",
		"icon": "minus",
		"handler": function (event) {
			this.editor.wrapSelectText("----" + this.EOL);
			return this;
		},
		"key": "shift+alt+n"
	},
	"image": {
		"title": "图片",
		"handler": function (event) {
			this.editor.wrapSelectText("![alt](", ")");
			return this;
		},
		"key": "shift+alt+p"
	},
	"help": {
		"title": "帮助",
		"icon": "question",
		"handler": function (event) {
			window.open("{homepage}", 'mditor');
			return this;
		},
		"key": "shift+alt+/"
	}
};

//显示的按钮列表
Toolbar.prototype.showList = [
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"header",
	"quote",
	"code",
	"list-ol",
	"list-ul",
	"link",
	"table",
	"line",
	"image",
	"help"
];

Toolbar.prototype.controlShowList = [
	"togglePreview",
	"toggleFullScreen"
];

//添加一个按钮
Toolbar.prototype.add = function (item) {
	var self = this;
	self.items[item.name] = item;
	return self;
};

//获取一个按钮
Toolbar.prototype.get = function (name) {
	var self = this;
	var item = self.items[name];
	item.el = item.el || self.holder.find('[data-cmd="' + name + '"]');
	return item;
};

//移除一个按钮
Toolbar.prototype.remove = function (name) {
	var self = this;
	self.mditor.addCommand(name);
	self.items[name] = null;
	delete self.items[name];
	return self;
};

Toolbar.prototype._render = function (items, showList, holder) {
	var self = this;
	var keymap = self.keymap;
	var buffer = [];
	showList.forEach(function (name) {
		var item = items[name];
		if (!item) return;
		item.name = name;
		if (item.handler) {
			self.mditor.addCommand(item.name, item.handler);
		}
		if (item.key) {
			item.key = (keymap[item.name] || item.key).replace('{cmd}', self.mditor.CMD);
			item.title = ((item.title || '') + ' ' + item.key).trim();
			self.mditor.key.unbind(item.key).bind(item.key, item.name);
		}
		buffer.push('<i data-cmd="' + item.name + '" class="fa fa-' + (item.icon || item.name) + '" title="' + (item.title || item.name) + '"></i>');
	});
	holder.html(buffer.join(''));
	return self;
};

/**
 * 呈现工具条
 **/
Toolbar.prototype.renderItems = function () {
	var self = this;
	self._render(self.items, self.showList, self.holder);
	return self;
};


/**
 * 呈现工具条控制按钮
 **/
Toolbar.prototype.renderControlItms = function () {
	var self = this;
	self._render(self.controlItems, self.controlShowList, self.controlHolder);
	return self;
};

/**
 * 更新 toolbar
 **/
Toolbar.prototype.update = function () {
	var self = this;
	self.renderItems();
	self.renderControlItms();
	return self;
};