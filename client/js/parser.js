define(function (require, exports, module) {
	var marked = require('../libs/marked');

	/**
	 * 定义解析类型 
	 **/
	var Parser = module.exports = function (mditor) {
		var self = this;
		self.mditor = mditor;
		self.editor = mditor.editor;
	};

	/**
	 * 解析方法
	 **/
	Parser.prototype.parse = function (mdText) {
		return marked(mdText);
	};

});