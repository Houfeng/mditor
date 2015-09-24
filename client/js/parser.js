define(function (require, exports, module) {
	var marked = require('../libs/marked');
	require('../libs/highlight/styles/default.css');
	var highlight = require('../libs/highlight/highlight.pack.js');

	marked.setOptions({
		highlight: function (code, lang, callback) {
			return highlight.highlightAuto(code).value;
		}
	});

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