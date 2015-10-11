/**
 * 定义工具条类型
 **/
var Toolbar = module.exports = function (mditor) {
	var self = this;
	self.mditor = mditor;
	self.holder = mditor.ui.toolbar;
	self.cmd = mditor.cmd;
	self.render();
};

/**
 * 初始化内置工具项
 **/
Toolbar.prototype.items = {
	"bold": {
		"title": "粗体",
		"handler": function (event) {
			this.editor.wrapSelectText("**", "**");
		},
		"key": "shift+ctrl+b"
	},
	"italic": {
		"title": "斜体",
		"handler": function (event) {
			this.editor.wrapSelectText("*", "*");
		},
		"key": "shift+ctrl+i"
	},
	"underline": {
		"title": "下划线",
		"handler": function (event) {
			this.editor.wrapSelectText("<u>", "</u>");
		},
		"key": "shift+ctrl+e"
	},
	"strikethrough": {
		"title": "删除线",
		"handler": function (event) {
			this.editor.wrapSelectText("~~", "~~");
		},
		"key": "shift+ctrl+d"
	},
	"header": {
		"title": "标题",
		"handler": function (event) {
			this.editor.wrapSelectText("# ");
		},
		"key": "shift+ctrl+h"
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
		},
		"key": "shift+ctrl+q"
	},
	"code": {
		"title": "代码",
		"handler": function (event) {
			var before = "```javascript" + this.EOL;
			var after = this.EOL + "```  " + this.EOL;
			this.editor.wrapSelectText(before, after);
		},
		"key": "shift+ctrl+c"
	},
	"list-ol": {
		"title": "有序列表",
		"handler": function (event) {
			var selectText = this.editor.getSelectText();
			if (selectText.length < 1) {
				this.editor.wrapSelectText("1. ");
				return;
			}
			var textArray = selectText.split(this.EOL);
			var buffer = [];
			for (var i = 0; i < textArray.length; i++) {
				var line = textArray[i];
				buffer.push((i + 1) + ". " + line);
			};
			this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
		},
		"key": "shift+ctrl+o"
	},
	"list-ul": {
		"title": "无序列表",
		"handler": function (event) {
			var selectText = this.editor.getSelectText();
			if (selectText.length < 1) {
				this.editor.wrapSelectText("*. ");
				return;
			}
			var textArray = selectText.split(this.EOL);
			var buffer = [];
			textArray.forEach(function (line) {
				buffer.push("* " + line);
			});
			this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
		},
		"key": "shift+ctrl+u"
	},
	"link": {
		"title": "链接",
		"handler": function (event) {
			this.editor.wrapSelectText("[text](", ")");
		},
		"key": "shift+ctrl+l"
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
		},
		"key": "shift+ctrl+t"
	},
	"line": {
		"title": "分隔线",
		"icon": "minus",
		"handler": function (event) {
			this.editor.wrapSelectText("----" + this.EOL);
		},
		"key": "shift+ctrl+n"
	},
	"image": {
		"title": "图片",
		"handler": function (event) {
			this.editor.wrapSelectText("![alt](", ")");
		},
		"key": "shift+ctrl+p"
	},
	"help": {
		"title": "帮助",
		"icon": "",
		"handler": function (event) {
			alert('help');
		},
		"key": "shift+ctrl+?"
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
	self.items[name] = null;
	delete self.items[name];
	return self;
};

/**
 * 呈现工具条
 **/
Toolbar.prototype.render = function () {
	var self = this;
	var buffer = [];
	self.showList.forEach(function (name) {
		var item = self.items[name];
		if (!item) return;
		item.name = name;
		self.cmd[item.name] = item.handler;
		if (item.key) {
			item.key = item.key.replace('{cmd}', self.mditor.CMD);
			item.title = ((item.title || '') + ' ' + item.key).trim();
			self.mditor.key(item.key, item.name);
		}
		buffer.push('<i data-cmd="' + item.name + '" class="fa fa-' + (item.icon || item.name) + '" title="' + (item.title || item.name) + '"></i>');
	});
	self.holder.html(buffer.join(''));
	return self;
};

/**
 * 更新 toolbar
 **/
Toolbar.prototype.update = function () {
	var self = this;
	self.render();
	return self;
};