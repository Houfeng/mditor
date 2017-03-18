const marked = require('marked');
const highlight = require('highlight.js');

/**
 * 定义解析类型
 **/
const Parser = function (options) {
	options = options || {};
	this.options = options;
};

Parser.highlights = {};
Parser.marked = marked;

//使标题解析 # 号可以无空格
marked.Lexer.rules.gfm.heading = marked.Lexer.rules.heading;
marked.Lexer.rules.tables.heading = marked.Lexer.rules.heading;

let renderer = new marked.Renderer();
marked.setOptions({
	renderer: renderer,
	gfm: true,
	tables: true,
	breaks: true, //可行尾不加两空格直接换行
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	mangle: false,
	highlight: function (code, lang, callback) {
		let hl = Parser.highlights[lang];
		if (hl) {
			return hl(code, lang, callback);
		} else {
			return highlight.highlightAuto(code).value;
		}
	}
});

/**
 * 解析方法
 **/
Parser.prototype.parse = function (mdText) {
	return marked(mdText);
};

module.exports = Parser;