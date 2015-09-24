var marked = require('marked');
var highlight = require('highlight.js');
var xss = require("xss");

marked.setOptions({
	highlight: function (code, lang, callback) {
		return highlight.highlightAuto(code).value;
	}
});

var xssFilter = new xss.FilterXSS({
	escapeHtml: function (html) {
		html = html.replace(/> /g, '&gtspace;');
		html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return html.replace(/\&gtspace\;/g, '> ');
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
	mdText = xssFilter.process(mdText);
	//console.log(mdText);
	return marked(mdText);
};