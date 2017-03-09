const marked = require('marked');
const highlight = require('highlight.js');

/**
 * 定义解析类型
 **/
const Parser = function (options) {
	options = options || {};
	this.options = options;
};

Parser.marked = marked;

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: false,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	highlight: function (code, lang, callback) {
		return highlight.highlightAuto(code).value;
	}
});

/**
 * 解析方法
 **/
Parser.prototype.parse = function (mdText) {
	return marked(mdText);
};

module.exports = Parser;