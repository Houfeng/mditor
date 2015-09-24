var marked = require('marked');
var highlight = require('highlight.js');
var xss = require("xss");

marked.setOptions({
	highlight: function(code, lang, callback) {
		return highlight.highlightAuto(code).value;
	}
});

/**
 * 定义解析类型
 **/
var Parser = module.exports = function(mditor) {
	var self = this;
	self.mditor = mditor;
	self.editor = mditor.editor;
};

/**
 * 解析方法
 **/
Parser.prototype.parse = function(mdText) {
	return marked(xss(mdText));
};