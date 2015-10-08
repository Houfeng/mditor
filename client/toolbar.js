/**
 * 定义工具条类型
 **/
var Toolbar = module.exports = function (mditor) {
	var self = this;
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
		}
	},
	"italic": {
		"title": "斜体",
		"handler": function (event) {
			this.editor.wrapSelectText("*", "*");
		}
	},
	"underline": {
		"title": "下划线",
		"handler": function (event) {
			this.editor.wrapSelectText("<u>", "</u>");
		}
	},
	"strikethrough": {
		"title": "删除线",
		"handler": function (event) {
			this.editor.wrapSelectText("~~", "~~");
		}
	},
	"header": {
		"title": "标题",
		"handler": function (event) {
			this.editor.wrapSelectText("# ");
		}
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
		}
	},
	"code": {
		"title": "代码",
		"handler": function (event) {
			var before = "```javascript" + this.EOL;
			var after = this.EOL + "```  " + this.EOL;
			this.editor.wrapSelectText(before, after);
		}
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
		}
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
		}
	},
	"link": {
		"title": "链接",
		"handler": function (event) {
			this.editor.wrapSelectText("[text](", ")");
		}
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
		}
	},
	"line": {
		"title": "分隔线",
		"icon": "minus",
		"handler": function (event) {
			this.editor.wrapSelectText("----" + this.EOL);
		}
	},
	"image": {
		"title": "图片",
		"handler": function (event) {
			this.editor.wrapSelectText("![alt](", ")");
		}
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
	"image"
];

/**
 * 呈现工具条
 **/
Toolbar.prototype.render = function () {
	var self = this;
	var buffer = [];
	self.showList.forEach(function (name) {
		var item = self.items[name];
		item.name = name;
		self.cmd[item.name] = item.handler;
		buffer.push('<i data-cmd="' + item.name + '" class="fa fa-' + (item.icon || item.name) + '" title="' + (item.title || item.name) + '"></i>');
	});
	self.holder.html(buffer.join(''));
	return self;
};