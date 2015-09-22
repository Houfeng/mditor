define(function (require, exports, module) {
	require("../libs/font-awesome/css/font-awesome.min.css");
	require("../css/github-markdown.css");
	require("../css/default.css");

	var $ = require('../libs/jquery');
	var Toolbar = require('./toolbar');
	var Editor = require('./editor');
	var Parser = require('./parser');

	/**
	 * 定义 Mditor 类型
	 **/
	var Mditor = module.exports = function (editor, options) {
		var self = this;
		self.ui = {};
		self.options = options || options;
		self.ui.editor = $(editor);
		self._create();
		self._initComponent();
		self._bindEvents();
	};
	
	/**
	 * 创建 Mditor 相关 DOM 
	 **/
	Mditor.prototype._create = function () {
		var self = this;
		var ui = self.ui;
		ui.editor.text('').val('');
		ui.editor.addClass('editor');
		ui.editor.wrap('<div class="mditor"><div class="body"></div></div>');
		ui.body = ui.editor.parent();
		ui.wraper = ui.body.parent();
		ui.head = $('<div class="head"></div>');
		ui.body.before(ui.head);
		ui.toolbar = $('<div class="toolbar"><i class="fa fa-arrows-alt"></i></div>');
		ui.head.append(ui.toolbar);
		ui.preview = $('<div class="preview"></div>');
		ui.editor.before(ui.preview);
		self._createHeightCalc();
		return self;
	};

	/**
	 * 初始化组件
	 **/
	Mditor.prototype._initComponent = function () {
		var self = this;
		self.editor = new Editor(self);
		self.toolBar = new Toolbar(self);
		self.parser = new Parser(self);
		return self;
	};

	/**
	 * 是否启动了 preview 视图
	 **/
	Mditor.prototype.isPreview = function () {
		var self = this;
		return self.ui.wraper.hasClass("pv");
		return self;
	};

	/**
	 * 打开预览
	 **/
	Mditor.prototype.openPreview = function () {
		var self = this;
		self.ui.wraper.addClass("pv");
		self._calcAutoHeight();
		return self;
	};
	
	/**
	 * 关闭预览
	 **/
	Mditor.prototype.closePreview = function () {
		var self = this;
		self.ui.wraper.removeClass("pv");
		self._calcAutoHeight();
		return self;
	};
	
	/**
	 * 是否启动了 fullscreen 视图
	 **/
	Mditor.prototype.isFullscreen = function () {
		var self = this;
		return self.ui.wraper.hasClass("fullscreen");
	};

	/**
	 * 打开预览
	 **/
	Mditor.prototype.openFullscreen = function () {
		var self = this;
		self.__editor_height = self.ui.editor.outerHeight();
		self.ui.wraper.addClass("fullscreen");
		var _height = self.ui.wraper.outerHeight() - self.ui.head.outerHeight();
		self.setHeight(_height);
		return self;
	};
	
	/**
	 * 关闭预览
	 **/
	Mditor.prototype.closeFullscreen = function () {
		var self = this;
		self.ui.wraper.removeClass("fullscreen");
		self.setHeight(self.__editor_height);
		return self;
	};
	
	/**
	 * 设定高度
	 **/
	Mditor.prototype.setHeight = function (height) {
		var self = this;
		var css = {
			"height": height,
			"min-height": height,
			"max-height": height
		};
		self.ui.editor.css(css);
		self.ui.preview.css(css);
		return self;
	};

	/**
	 * 计算编辑框的自适应高度
	 **/
	Mditor.prototype._calcAutoHeight = function () {
		var self = this;
		var ui = self.ui;
		ui.heightCalc.outerWidth(ui.editor.outerWidth());
		ui.heightCalc.html(ui.editor.val().split('\n').join('</br>') + '<br/>');
		if (self.isPreview()) {
			var _calcHeight = ui.heightCalc.outerHeight();
			var _previewHeight = ui.preview.outerHeight();
			var _height1 = _previewHeight > _calcHeight ? _previewHeight : _calcHeight;
			ui.editor.outerHeight(_height1);
		} else {
			var _height2 = ui.heightCalc.outerHeight();
			ui.editor.outerHeight(_height2);
			ui.preview.outerHeight(_height2);
		}
		return self;
	};

	/**
	 * 创建用于计算适应高度的 div
	 **/
	Mditor.prototype._createHeightCalc = function () {
		var self = this;
		var ui = self.ui;
		ui.heightCalc = $('<div class="editor"></br></div>');
		ui.wraper.append(ui.heightCalc);
		ui.heightCalc.wrap('<div class="height-calc"></div>');
		self._calcAutoHeight();
		return self;
	};

	/**
	 * 绑定事件
	 **/
	Mditor.prototype._bindEvents = function () {
		var self = this;
		self.on('input', self._input.bind(self));
		$(window).on('resize', self._calcAutoHeight.bind(self));
		self.on('focus', self._addActiveClass.bind(self));
		self.on('blur', self._removeActiveClass.bind(self));
		return self;
	};
	
	/**
	 * 在输入内容改变时
	 **/
	Mditor.prototype._input = function () {
		var self = this;
		self.ui.preview.html(self.getHTML());
		self._calcAutoHeight();
	};

	/**
	 * 使编辑器获取焦点
	 **/
	Mditor.prototype.focus = function () {
		var self = this;
		self.ui.editor.focus().focus();
	};
	
	/**
	 * 使编辑器失去焦点
	 **/
	Mditor.prototype.blur = function () {
		var self = this;
		self.ui.editor.blur().blur();
	};

	/**
	 * 添加焦点样式
	 **/
	Mditor.prototype._addActiveClass = function () {
		var self = this;
		self.ui.body.addClass('active');
		return self;
	};
	
	/**
	 * 移除焦点样式
	 **/
	Mditor.prototype._removeActiveClass = function () {
		var self = this;
		self.ui.body.removeClass('active');
		return self;
	};

	/**
	 * 获取编辑器的值
	 **/
	Mditor.prototype.getValue = function () {
		var self = this;
		return self.ui.editor.val();
	};

	/**
	 * 获取解析后的 HTML
	 **/
	Mditor.prototype.getHTML = function () {
		var self = this;
		return '<div class="markdown-body">' + self.parser.parse(self.ui.editor.val()) + '</div>';
	};

	/**
	 * 事件绑定方法
	 **/
	Mditor.prototype.on = function (name, handler) {
		var self = this;
		self.editor.on(name, handler.bind(self));
		return self;
	};
	
	/**
	 * 事件解绑方法
	 **/
	Mditor.prototype.off = function (name, handler) {
		var self = this;
		self.editor.off(name, handler.bind(self));
		return self;
	};
}); 