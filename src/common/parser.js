const marked = require('marked');
const highlight = require('highlight.js');
const xss = require("xss");

marked.setOptions({
	highlight: function (code, lang, callback) {
		return highlight.highlightAuto(code).value;
	}
});

//在白名单中添加 span[class] 
xss.whiteList.span = ['class'];

const xssFilter = new xss.FilterXSS({
	whiteList: xss.whiteList
});

/**
 * 定义解析类型
 **/
const Parser = function (options) {
	options = options || {};
	this.options = options;
};

/**
 * 解析方法
 **/
Parser.prototype.parse = function (mdText) {
	let html = marked(mdText);
	return xssFilter.process(html);
};

module.exports = Parser;