var marked = require('marked');
var highlight = require('highlight.js');
var xss = require("xss");

marked.setOptions({
	highlight: function (code, lang, callback) {
		return highlight.highlightAuto(code).value;
	}
});

//在白名单中添加 span[class] 
xss.whiteList.span = ['class'];

var xssFilter = new xss.FilterXSS({
	whiteList: xss.whiteList
});

/**
 * 定义解析类型
 **/
var Parser = module.exports = function (options) {
	var self = this;
	options = options || {};
	self.options = options;
};

/**
 * 解析方法
 **/
Parser.prototype.parse = function (mdText) {
	var html = marked(mdText);
	return xssFilter.process(html);
};