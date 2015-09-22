define(function (require, exports, module) {
	
	/**
	 * 定义工具条类型
	 **/
	var Toolbar = module.exports = function (mditor) {
		var self = this;
		self.mditor = mditor;
		self.editor = mditor.editor;
	};

	/**
	 * 插入工具按钮方法
	 **/
	Toolbar.prototype.insert = function (index, btnArray) {

	};

	/**
	 * 移除工具按钮方法
	 **/
	Toolbar.prototype.remove = function (nameArray) {

	};

	/**
	 * 清楚工具按钮方法
	 **/
	Toolbar.prototype.clear = function () {

	};

});