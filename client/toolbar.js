/**
 * 定义工具条类型
 **/
var Toolbar = module.exports = function(mditor) {
	var self = this;
	self.holder = mditor.ui.toolbar;
	self.cmd = mditor.cmd;
	self.initDefault();
};

/**
 * 初始化内置工具项
 **/
Toolbar.prototype.initDefault = function() {
	var self = this;
	self._items = [{
		"name": "bold",
		"title": "粗体",
		"handler": function(event) {
			this.editor.wrapSelectText("**", "**");
		}
	}, {
		"name": "italic",
		"title": "斜体",
		"handler": function(event) {
			this.editor.wrapSelectText("*", "*");
		}
	}, {
		"name": "underline",
		"title": "下划线",
		"handler": function(event) {
			this.editor.wrapSelectText("<u>", "</u>");
		}
	}, {
		"name": "header",
		"title": "标题",
		"handler": function(event) {
			this.editor.wrapSelectText("# ", "");
		}
	}, {
		"name": "quote-left",
		"title": "引用",
		"handler": function(event) {
			this.editor.wrapSelectText("> ", "");
		}
	}, {
		"name": "code",
		"title": "代码",
		"handler": function(event) {
			this.editor.wrapSelectText("\r\n```javascript\r\n ", "\r\n```\r\n");
		}
	}, {
		"name": "list-ol",
		"title": "有序列表",
		"handler": function(event) {

		}
	}, {
		"name": "list-ul",
		"title": "无序列表",
		"handler": function(event) {

		}
	}, {
		"name": "link",
		"title": "链接",
		"handler": function(event) {
			this.editor.wrapSelectText("[text](", ")");
		}
	}, {
		"name": "table",
		"title": "表格",
		"handler": function(event) {

		}
	}, {
		"name": "line",
		"title": "分隔线",
		"icon": "minus",
		"handler": function(event) {
			this.editor.setSelectText("----");
		}
	}, {
		"name": "image",
		"title": "图片",
		"handler": function(event) {
			this.editor.wrapSelectText("![alt](", ")");
		}
	}, {
		"name": "film",
		"title": "视频",
		"handler": function(event) {
			this.editor.wrapSelectText("![alt](", ")");
		}
	}];
	self.render();
	return self;
};

/**
 * 插入工具按钮方法
 **/
Toolbar.prototype.insert = function(index, item) {
	var self = this;
	self._items = [];
	self.render();
	return self;
};

/**
 * 移除工具按钮方法
 **/
Toolbar.prototype.remove = function(index) {
	var self = this;
	self._items = [];
	self.render();
	return self;
};

/**
 * 清楚工具按钮方法
 **/
Toolbar.prototype.clear = function() {
	var self = this;
	self._items = [];
	self.render();
	return self;
};

/**
 * 呈现工具条
 **/
Toolbar.prototype.render = function() {
	var self = this;
	var buffer = [];
	self._items.forEach(function(item) {
		if (!item || !item.name) return;
		self.cmd[item.name] = item.handler;
		buffer.push('<i data-cmd="' + item.name + '" class="fa fa-' + (item.icon || item.name) + '" title="' + (item.title || item.name) + '"></i>');
	});
	self.holder.html(buffer.join(''));
	return self;
};