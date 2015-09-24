define(function (require, exports, module) {
	
	/**
	 * 定义工具条类型
	 **/
	var Toolbar = module.exports = function (mditor) {
		var self = this;
		self.holder = mditor.ui.toolbar;
		self.cmd = mditor.cmd;
		self.initDefault();
	};
	
	/**
	 * 初始化内置工具项
	 **/
	Toolbar.prototype.initDefault = function () {
		var self = this;
		self._items = [
			{
				"name": "bold",
				"handler": function (event) {
					this.editor.wrapSelectText("**", "**");
				}
			},
			{
				"name": "italic",
				"handler": function (event) {
					this.editor.wrapSelectText("*", "*");
				}
			},
			{
				"name": "underline",
				"handler": function (event) {
					this.editor.wrapSelectText("<u>", "</u>");
				}
			},
			{
				"name": "header",
				"handler": function (event) {
					this.editor.wrapSelectText("# ", "");
				}
			},
			{
				"name": "quote-left",
				"handler": function (event) {
					this.editor.wrapSelectText("> ", "");
				}
			},
			{
				"name": "code",
				"handler": function (event) {
					this.editor.wrapSelectText("\r\n```javascript\r\n ", "\r\n```\r\n");
				}
			},
			{
				"name": "list-ol",
				"handler": function (event) {

				}
			},
			{
				"name": "list-ul",
				"handler": function (event) {

				}
			},
			{
				"name": "link",
				"handler": function (event) {
					this.editor.wrapSelectText("[text](", ")");
				}
			},
			{
				"name": "table",
				"handler": function (event) {

				}
			},
			{
				"name": "line",
				"icon": "minus",
				"handler": function (event) {
					this.editor.setSelectText("----");
				}
			},
			{
				"name": "image",
				"handler": function (event) {
					this.editor.wrapSelectText("![alt](", ")");
				}
			},
			{
				"name": "film",
				"handler": function (event) {
					this.editor.wrapSelectText("![alt](", ")");
				}
			}
		];
		self.render();
		return self;
	};

	/**
	 * 插入工具按钮方法
	 **/
	Toolbar.prototype.insert = function (index, item) {
		var self = this;
		self._items = [];
		self.render();
		return self;
	};

	/**
	 * 移除工具按钮方法
	 **/
	Toolbar.prototype.remove = function (index) {
		var self = this;
		self._items = [];
		self.render();
		return self;
	};

	/**
	 * 清楚工具按钮方法
	 **/
	Toolbar.prototype.clear = function () {
		var self = this;
		self._items = [];
		self.render();
		return self;
	};
	
	/**
	 * 呈现工具条
	 **/
	Toolbar.prototype.render = function () {
		var self = this;
		var buffer = [];
		self._items.forEach(function (item) {
			if (!item || !item.name || !item.handler) return;
			self.cmd[item.name] = item.handler;
			buffer.push('<i data-cmd="' + item.name + '" class="fa fa-' + (item.icon || item.name) + '"></i>');
		});
		self.holder.html(buffer.join(''));
		return self;
	};

});