define(function (require, exports, module) {
	require("../libs/font-awesome/css/font-awesome.min.css");
	require("../css/github-markdown.css");
	require("../css/default.css");

	var $ = require('../libs/jquery');
	var Toolbar = require('./toolbar');
	var Editor = require('./editor');
	var Parser = require('./parser');

	var Mditor = module.exports = function (editor, options) {
		var self = this;
		self.ui = {};
		self.options = options || options;
		self.ui.editor = $(editor);
		self._create();
		self._initComponent();
		self._bindEvents();
	};

	Mditor.prototype._initComponent = function () {
		var self = this;
		self.editor = new Editor(self);
		self.toolBar = new Toolbar(self);
		self.parser = new Parser(self);
		return self;
	};

	Mditor.prototype._create = function () {
		var self = this;
		var ui = self.ui;
		ui.editor.addClass('editor');
		ui.editor.wrap('<div class="mditor"></div>');
		ui.wraper = ui.editor.parent();
		ui.toolbar = $('<div class="toolbar"><i class="fa fa-arrows-alt"></i></div>');
		ui.editor.before(ui.toolbar);
		ui.editor.text('').val('');
		self._createHeightCalc();
		return self;
	};

	Mditor.prototype._calcAutoHeight = function () {
		var self = this;
		var ui = self.ui;
		ui.heightCalc.outerWidth(ui.editor.outerWidth());
		ui.heightCalc.html(ui.editor.val().split('\n').join('</br>') + '<br/>');
		ui.editor.outerHeight(ui.heightCalc.outerHeight());
		return self;
	};

	Mditor.prototype._createHeightCalc = function () {
		var self = this;
		var ui = self.ui;
		ui.heightCalc = $('<div class="editor"></br></div>');
		ui.wraper.append(ui.heightCalc);
		ui.heightCalc.wrap('<div class="height-calc"></div>');
		self._calcAutoHeight();
		return self;
	};

	Mditor.prototype._bindEvents = function () {
		var self = this;
		self.on('input', self._calcAutoHeight.bind(self));
		$(window).on('resize', self._calcAutoHeight.bind(self));
		return self;
	};

	Mditor.prototype.getValue = function () {
		var self = this;
		return self.ui.editor.val();
	};

	Mditor.prototype.getHTML = function () {
		var self = this;
		return '<div class="markdown-body">' + self.parser.parse(self.ui.editor.val()) + '</div>';
	};

	Mditor.prototype.on = function (name, handler) {
		var self = this;
		self.editor.on(name, handler.bind(self));
		return self;
	};
}); 