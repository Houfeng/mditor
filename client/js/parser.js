define(function (require, exports, module) {
	var marked = require('../libs/marked');

	var Parser = module.exports = function (mditor) {
		var self = this;
		self.mditor = mditor;
		self.editor = mditor.editor;
	};

	Parser.prototype.parse = function (mdText) {
		return marked(mdText);
	};

});