/*istanbul ignore next*/'use strict';

var mokit = require('mokit');
var Toolbar = require('../toolbar');
var Editor = require('../editor');
var Viewer = require('../viewer');
var Finder = require('../finder');
var Shortcut = require('./shortcut');
var Parser = require('../common/parser');

require('font-awesome/css/font-awesome.css');
require('github-markdown-css/github-markdown.css');
require('prismjs/themes/prism.css');
require('./index.less');

var HIDDEN_CLASS_NAME = 'mditor-hidden';

var Mditor = new mokit.Component({
  template: require('./index.html'),

  /*istanbul ignore next*/onInit: function onInit() {
    this.PLATFORM = navigator.platform.toLowerCase();
    this.EOL = this.PLATFORM == 'win32' ? '\r\n' : '\n';
    this.CMD = this.PLATFORM.indexOf('mac') > -1 ? 'command' : 'ctrl';
    this.INDENT = '  ';
    this.shortcut = new Shortcut(this);
    this.Parser = Parser;
    this.parser = new Parser(this);
  },
  /*istanbul ignore next*/onReady: function onReady() {
    /*istanbul ignore next*/var _this = this;

    this.shortcut.bind('tab', this.editor.addIndent.bind(this.editor));
    this.shortcut.bind('shift+tab', this.editor.removeIndent.bind(this.editor));
    this.shortcut.bind('enter', function (event) {
      /*istanbul ignore next*/_this._ulAndQuoteAutoComplete(event);
      /*istanbul ignore next*/_this._olAutoComplete(event);
      /*istanbul ignore next*/_this._keepIndent(event);
    }, true);
    setTimeout(function () {
      /*istanbul ignore next*/_this.$emit('ready');
    }, 0);
  },


  components: {
    Toolbar: Toolbar,
    Editor: Editor,
    Viewer: Viewer,
    Finder: Finder
  },

  props: {
    height: '400px',
    width: 'auto',
    preview: false,
    split: true,
    fullscreen: false
  },

  /*istanbul ignore next*/data: function data() {
    return {
      self: this,
      value: ''
    };
  },
  /*istanbul ignore next*/find: function find(text) {
    this.finder.show(text);
  },
  /*istanbul ignore next*/syncScroll: function syncScroll() {
    if (!this.split || this.preview) return;
    var offsetHeight = this.editor.textarea.offsetHeight;
    var editorScrollHeight = this.editor.textarea.scrollHeight;
    var viewerScrollHeight = this.viewer.$element.scrollHeight;
    var editorScrollTop = this.editor.textarea.scrollTop;
    var viewerScrollTop = editorScrollTop * (viewerScrollHeight - offsetHeight) / (editorScrollHeight - offsetHeight);
    this.viewer.$element.scrollTop = viewerScrollTop;
  },
  /*istanbul ignore next*/onChanged: function onChanged(event) {
    this.$emit('changed', event);
    this.syncScroll();
  },
  /*istanbul ignore next*/onInput: function onInput(event) {
    this.$emit('input', event);
  },
  /*istanbul ignore next*/onPaste: function onPaste(event) {
    this.$emit('paste', event);
    this.syncScroll();
  },
  /*istanbul ignore next*/onHeadDblClick: function onHeadDblClick(event) {
    if (event.target.tagName == 'I') return;
    this.$emit('head-dblclick', event);
  },
  /*istanbul ignore next*/_keepIndent: function _keepIndent(event) {
    var text = this.editor.getBeforeTextInLine();
    var parts = text.split(this.INDENT);
    if (parts.length < 2) return;
    var count = 0;
    var buffer = [this.EOL];
    while (parts[count] === '' && count < parts.length - 1) {
      count++;
      buffer.push(this.INDENT);
    }
    this.editor.insertBeforeText(buffer.join(''));
    event.preventDefault();
  },
  /*istanbul ignore next*/_ulAndQuoteAutoComplete: function _ulAndQuoteAutoComplete(event) {
    var text = this.editor.getBeforeTextInLine();
    var prefix = text.substr(0, 2);
    if (prefix != '- ' && prefix != '* ' && prefix != '> ') return;
    if (text.length > prefix.length) {
      this.editor.insertBeforeText(this.EOL + prefix);
    } else {
      this.editor.selectBeforeText(prefix.length);
      this.editor.setSelectText('');
    }
    event.preventDefault();
  },
  /*istanbul ignore next*/_olAutoComplete: function _olAutoComplete(event) {
    var exp = /^\d+\./;
    var text = this.editor.getBeforeTextInLine();
    var trimedText = text.trim();
    if (!exp.test(trimedText)) return;
    var num = trimedText.split('.')[0];
    if (trimedText.length > num.length + 1) {
      this.editor.insertBeforeText(this.EOL + (parseInt(num) + 1) + '. ');
    } else {
      this.editor.selectBeforeText(text.length);
      this.editor.setSelectText('');
    }
    event.preventDefault();
  },
  /*istanbul ignore next*/focus: function focus() {
    if (this.preview) {
      this.$element.focus();
    } else {
      this.editor.focus();
    }
  },
  /*istanbul ignore next*/blur: function blur() {
    this.editor.blur();
  },
  /*istanbul ignore next*/addCommand: function addCommand(item) {
    if (!item.name || !item.handler) return;
    this.commands = this.commands || {};
    this.commands[item.name] = item;
    if (item.key) {
      this.shortcut.bind(item.key, item.name, item.allowDefault, item.owner);
    }
  },
  /*istanbul ignore next*/removeCommand: function removeCommand(name) {
    this.commands = this.commands || {};
    var item = this.commands[name];
    if (!item) return;
    this.shortcut.unbind(item.key);
    this.commands[name] = null;
    delete this.commands[name];
  },
  /*istanbul ignore next*/execCommand: function execCommand(name, event) {
    event = event || {};
    event.mditor = this;
    event.toolbar = this.toolbar;
    event.editor = this.editor;
    this.commands[name].handler.call(this, event);
  }
});

Mditor.fromTextarea = function (textarea) {
  textarea.classList.add(HIDDEN_CLASS_NAME);
  var mditor = new Mditor();
  mditor.value = textarea.value;
  mditor.$watch('value', function () {
    textarea.value = mditor.value;
  });
  mditor.$mount(textarea);
  mditor.switchTextarea = function () {
    if (textarea.classList.contains(HIDDEN_CLASS_NAME)) {
      textarea.value = mditor.value;
      mditor.$element.classList.add(HIDDEN_CLASS_NAME);
      textarea.classList.remove(HIDDEN_CLASS_NAME);
    } else {
      mditor.value = textarea.value;
      textarea.classList.add(HIDDEN_CLASS_NAME);
      mditor.$element.classList.remove(HIDDEN_CLASS_NAME);
    }
  };
  return mditor;
};

Mditor.Parser = Parser;

module.exports = window.Mditor = Mditor;