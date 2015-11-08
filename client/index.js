var $ = require('jquery');
var Parser = require('../lib/parser');
var Toolbar = require('./toolbar');
var Editor = require('./editor');
var Key = require('./key');

//常量
var FULL_SCREEN_CORRECT = 16;
var UPDATE_VIEWER_DELAY = 20;

//全局变量 -> 模块局部变量
var win = window;
var doc = document;
var body = doc.body;

//shim
doc.exitFullscreen = doc.exitFullscreen || doc.webkitExitFullscreen;
body.requestFullscreen = body.requestFullscreen || body.webkitRequestFullscreen;

/**
 * 定义 Mditor 类型
 **/
var Mditor = window.Mditor = module.exports = function (editor, options) {
	var self = this;
	if (!editor) {
		throw "must specify a textarea.";
	}
	options = options || {};
	self._init();
	self.ui = {};
	self.ui.editor = $(editor);
	self._create();
	self.setOptions(options);
	self._initCommands();
	self._initComponent();
	self._bindEvents();
	self._bindCommands();
};

Mditor.version = "{version}";

Mditor.prototype._init = function () {
	var self = this;
	self.platform = navigator.platform.toLowerCase();
	self.EOL = self.platform == 'win32' ? '\r\n' : '\n';
	self.CMD = self.platform.indexOf('mac') > -1 ? 'command' : 'ctrl';
	self.INDENT = '\t';
	return self;
};

/**
 * 设定选项
 **/
Mditor.prototype.setOptions = function (options) {
	var self = this;
	options = options || {};
	self.options = self.options || {};
	//处理固定高度选项
	if (options.fixedHeight !== null) {
		self.options.fixedHeight = options.fixedHeight;
		if (self.options.fixedHeight) {
			self.ui.wraper.addClass('fixed');
		} else {
			self.ui.wraper.removeClass('fixed');
		}
	}
	//处理高度选项
	if (options.height !== null) {
		self.options.height = options.height;
		self.setHeight(self.options.height);
	}
	//处理宽度选项
	if (options.width !== null) {
		self.options.width = options.width;
		self.setWidth(self.options.width);
	}
};

/**
 * 创建 Mditor 相关 DOM
 **/
Mditor.prototype._create = function () {
	var self = this;
	var ui = self.ui;
	var _value = ui.editor.val() || '';
	ui.editor.val(_value.trim());
	ui.editor.addClass('editor');
	ui.editor.wrap('<div class="mditor"><div class="body"></div></div>');
	ui.body = ui.editor.parent();
	ui.wraper = ui.body.parent();
	ui.head = $('<div class="head"></div>');
	ui.body.before(ui.head);
	ui.toolbar = $('<div class="toolbar"></div>');
	ui.head.append(ui.toolbar);
	ui.control = $('<div class="control"></div>');
	ui.head.append(ui.control);
	ui.viewer = $('<div class="viewer"></div>');
	ui.body.append(ui.viewer);
	//创建计算自适应高度的 div
	ui.heightCalc = $('<div class="editor"></br></div>');
	ui.wraper.append(ui.heightCalc);
	ui.heightCalc.wrap('<div class="calc"></div>');
	return self;
};

/**
 * 初始化组件
 **/
Mditor.prototype._initComponent = function () {
	var self = this;
	self.key = new Key(self);
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
	return self.ui.wraper.hasClass("preview");
};

/**
 * 打开预览
 **/
Mditor.prototype.openPreview = function () {
	var self = this;
	self.ui.wraper.addClass("preview");
	self._updateViewer();
	self._calcAutoHeight();
	self._calcScroll();
	return self;
};

/**
 * 关闭预览
 **/
Mditor.prototype.closePreview = function () {
	var self = this;
	self.ui.wraper.removeClass("preview");
	self._calcAutoHeight();
	return self;
};

/**
 * 切换预览模式
 **/
Mditor.prototype.togglePreview = function () {
	var self = this;
	if (self.isPreview()) {
		self.closePreview();
	} else {
		self.openPreview();
	}
	return self;
};

/**
 * 是否启动了 FullScreen 视图
 **/
Mditor.prototype.isFullScreen = function () {
	var self = this;
	return self.ui.wraper.hasClass("fullscreen");
};

/**
 * 打开预览
 **/
Mditor.prototype.openFullScreen = function (useH5) {
	var self = this;
	self.ui.wraper.addClass("fullscreen");
	//记录旧高度并设定适应全屏的高度
	self._lastStyle = self.ui.editor.attr('style');
	self._calcAutoHeight();
	if ((useH5 || self.options.useH5FullScreen) && body.requestFullscreen) {
		body.requestFullscreen();
	}
	return self;
};

/**
 * 关闭预览
 **/
Mditor.prototype.closeFullScreen = function (useH5) {
	var self = this;
	if ((useH5 || self.options.useH5FullScreen) && doc.webkitExitFullscreen) {
		doc.webkitExitFullscreen();
	}
	self.ui.wraper.removeClass("fullscreen");
	if (self._lastStyle) {
		self.ui.editor.attr('style', self._lastStyle);
		self.ui.heightCalc.attr('style', '');
		self._lastStyle = null;
	}
	//self._calcAutoHeight();
	return self;
};

/**
 * 切换全屏模式
 **/
Mditor.prototype.toggleFullScreen = function () {
	var self = this;
	if (self.isFullScreen()) {
		self.closeFullScreen();
	} else {
		self.openFullScreen();
	}
	return self;
};

/**
 * toolbar 是否隐藏
 **/
Mditor.prototype.toolBarIsHidden = function () {
	var self = this;
	return self.ui.wraper.hasClass('toolbar-hidden');
};

/**
 * 隐藏 toolbar
 **/
Mditor.prototype.hideToolBar = function () {
	var self = this;
	self.ui.wraper.addClass('toolbar-hidden');
	return self;
};

/**
 * 显示 toolbar
 **/
Mditor.prototype.showToolBar = function () {
	var self = this;
	self.ui.wraper.removeClass('toolbar-hidden');
	return self;
};

/**
 * 设定高度
 **/
Mditor.prototype.setHeight = function (height, disabledCalcAuthHeight) {
	var self = this;
	if (self.options.fixedHeight) {
		self.ui.editor.outerHeight(height);
		self.ui.heightCalc.outerHeight(height);
	} else {
		self.ui.editor.css('minHeight', height);
		self.ui.heightCalc.css('minHeight', height);
	}
	if (!disabledCalcAuthHeight) {
		self._calcAutoHeight();
	}
	return self;
};

/**
 * 获取高度
 **/
Mditor.prototype.getHeight = function () {
	var self = this;
	return self.ui.editor.outerHeight();
};

/**
 * 设定宽度
 **/
Mditor.prototype.setWidth = function (width) {
	var self = this;
	self.ui.wraper.outerWidth(width);
	return self;
};

/**
 * 获取宽度
 **/
Mditor.prototype.getWidth = function () {
	var self = this;
	return self.ui.wraper.outerWidth();
};


/**
 * 获取可以适应的最大高度
 **/
Mditor.prototype._getMaxHeight = function () {
	var self = this;
	var head = self.ui.head;
	var _height = $(window).outerHeight() - head.outerHeight() * 2 - FULL_SCREEN_CORRECT;
	return _height;
};

/**
 * 计算编辑框的自适应高度
 **/
Mditor.prototype._calcAutoHeight = function () {
	var self = this;
	var ui = self.ui;
	var isFullScreen = self.isFullScreen();
	//全屏时的计算
	if (isFullScreen) {
		var wraper = self.ui.wraper;
		var head = self.ui.head;
		var _height = wraper.outerHeight() - head.outerHeight() - FULL_SCREEN_CORRECT;
		self.setHeight(_height, true);
	}
	//如果是固定高度或全屏时则只设定 viewr 高度
	if (self.options.fixedHeight || self.isFullScreen()) {
		ui.viewer.outerHeight(self.getHeight());
		return self;
	}
	//开始高度计算
	var maxHeight = self._getMaxHeight();
	ui.heightCalc.outerWidth(ui.editor.outerWidth());
	ui.heightCalc.html(ui.editor.val().split('\n').join('</br>') + '<br/>');
	if (self.isPreview()) {
		ui.viewer.outerHeight('auto');
		ui.viewer.css('overflow', 'visible');
		var _calcHeight = ui.heightCalc.outerHeight();
		var _previewHeight = ui.viewer.outerHeight();
		var _height1 = _previewHeight > _calcHeight ? _previewHeight : _calcHeight;
		if (_height1 > maxHeight) {
			_height1 = maxHeight;
			ui.viewer.outerHeight('').css('overflow', 'auto');
		}
		ui.editor.outerHeight(_height1);
		ui.viewer.outerHeight(_height1);
	} else {
		var _height2 = ui.heightCalc.outerHeight();
		if (_height2 > maxHeight) {
			_height2 = maxHeight;
		}
		ui.editor.outerHeight(_height2);
		ui.viewer.outerHeight(_height2);
	}
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
	self.editor.on('scroll', self._calcScroll.bind(self));
	self.ui.viewer.on('click', 'a', self._onLinkClick.bind(self));
	return self;
};

Mditor.prototype._onLinkClick = function name(event) {
	var self = this;
	alert('预览时无法打开 "' + $(event.target).attr("href") + '".');
	return false;
};

Mditor.prototype._calcScroll = function () {
	var self = this;
	if (!self.isPreview()) {
		return self;
	}
	var offsetHeight = self.getHeight();
	var editorScrollHeight = self.ui.editor.prop('scrollHeight');
	var viewerScrollHeight = self.ui.viewer.prop('scrollHeight');
	var editorScrollTop = self.ui.editor.prop('scrollTop');
	var viewerScrollTop = editorScrollTop * (viewerScrollHeight - offsetHeight) / (editorScrollHeight - offsetHeight);
	self.ui.viewer.prop('scrollTop', viewerScrollTop);
	return self;
};

/**
 * 初始化命令
 **/
Mditor.prototype._initCommands = function () {
	var self = this;
	for (var name in self) {
		if (typeof (self[name]) == 'function' && name[0] != '_') {
			self.addCommand(name, self[name]);
		}
	}
	return self;
};

/**
 * 添加一个命令
 **/
Mditor.prototype.addCommand = function (name, handler) {
	var self = this;
	if (!name || !handler) return;
	self.cmd = self.cmd || {};
	self.cmd[name] = handler.bind(self);
	return self;
};

/**
 * 移除一个命令
 **/
Mditor.prototype.removeCommand = function (name) {
	var self = this;
	self.cmd = self.cmd || {};
	self.cmd[name] = null;
	delete self.cmd[name];
	return self;
};

Mditor.prototype.execCommand = function (name, event) {
	var self = this;
	event = event || {};
	event.mditor = self;
	event.toolbar = self.toolbar;
	event.editor = self.editor;
	self.cmd[name].call(self, event);
	return self;
};

/**
 * 绑定命令
 **/
Mditor.prototype._bindCommands = function () {
	var self = this;
	self.ui.head.on('click', 'i.fa', function (event) {
		var btn = $(this);
		var cmdName = btn.attr('data-cmd');
		if (cmdName && self.cmd[cmdName]) {
			self.execCommand(cmdName, event);
			self.focus();
		} else {
			throw 'command "' + cmdName + '" not found.';
		}
	});
	return self;
};

Mditor.prototype._clearUpdateViewerTimer = function () {
	var self = this;
	if (self._updateViewerTimer) {
		clearTimeout(self._updateViewerTimer);
	}
	self._updateViewerTimer = null;
};

Mditor.prototype._updateViewer = function () {
	var self = this;
	if (self._updateViewerTimer) {
		self._clearUpdateViewerTimer();
	}
	self._updateViewerTimer = setTimeout(function () {
		self.ui.viewer.html(self.getHTML());
		self._clearUpdateViewerTimer();
		//console.log('preview');
	}, UPDATE_VIEWER_DELAY);
	return self;
};

/**
 * 在输入内容改变时
 **/
Mditor.prototype._input = function () {
	var self = this;
	if (self.isPreview()) {
		self._updateViewer();
	}
	self._calcAutoHeight();
	return self;
};

/**
 * 使编辑器获取焦点
 **/
Mditor.prototype.focus = function () {
	var self = this;
	self.ui.editor.focus();
};

/**
 * 使编辑器失去焦点
 **/
Mditor.prototype.blur = function () {
	var self = this;
	self.ui.editor.blur();
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
	return self.editor.getValue();
};

/**
 * 设置编辑器的值
 **/
Mditor.prototype.setValue = function (value) {
	var self = this;
	self.editor.setValue(value);
	self._updateViewer();
	self._calcAutoHeight();
	return this;
};

/**
 * 获取解析后的 HTML
 **/
Mditor.prototype.getHTML = function () {
	var self = this;
	var value = self.parser.parse(self.ui.editor.val());
	return '<div class="markdown-body">' + value + '</div>';
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