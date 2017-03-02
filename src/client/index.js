const mokit = require('mokit');
const Toolbar = require('../toolbar');
const Editor = require('../editor');
const Viewer = require('../viewer');
const Shortcut = require('./shortcut');

require('font-awesome/css/font-awesome.css');
require('github-markdown-css/github-markdown.css');
require('highlight.js/styles/default.css');
require('./index.less');

const Mditor = new mokit.Component({
  template: require('./index.html'),

  onInit() {
    this.PLATFORM = navigator.platform.toLowerCase();
    this.EOL = this.PLATFORM == 'win32' ? '\r\n' : '\n';
    this.CMD = this.PLATFORM.indexOf('mac') > -1 ? 'command' : 'ctrl';
    this.INDENT = '\t';
    this.shortcut = new Shortcut(this);
  },

  onReady() {
    this.shortcut.bind('tab', this.editor.addIndent.bind(this.editor));
    this.shortcut.bind('shift+tab', this.editor.removeIndent.bind(this.editor));
    this.shortcut.bind('enter', () => {
      this._ulAndQuoteAutoComplete();
      this._olAutoComplete();
      this._keepIndent();
    }, true);
  },

  components: {
    Toolbar,
    Editor,
    Viewer
  },

  props: {
    height: '300px',
    width: 'auto',
    preview: true,
    fullscreen: false
  },

  data() {
    return {
      self: this,
      value: ''
    };
  },

  _keepIndent() {
    let text = this.editor.getBeforeTextInLine();
    let parts = text.split(this.INDENT);
    if (parts.length < 2) return;
    let count = 0;
    let buffer = [this.EOL];
    while (parts[count] === '' &&
      count < (parts.length - 1)) {
      count++;
      buffer.push(this.INDENT);
    }
    this.editor.insertBeforeText(buffer.join(''));
    event.preventDefault();
  },

  _ulAndQuoteAutoComplete() {
    let text = this.editor.getBeforeTextInLine();
    let prefix = text.substr(0, 2);
    if (prefix != '- ' && prefix != '* ' && prefix != '> ') return;
    if (text.length > prefix.length) {
      this.editor.insertBeforeText(this.EOL + prefix);
    } else {
      this.editor.selectBeforeText(prefix.length);
      this.editor.setSelectText('');
    }
    event.preventDefault();
  },

  _olAutoComplete() {
    let exp = /^\d+\./;
    let text = this.editor.getBeforeTextInLine();
    let trimedText = text.trim();
    if (!exp.test(trimedText)) return;
    let num = trimedText.split('.')[0];
    if (trimedText.length > num.length + 1) {
      this.editor.insertBeforeText(this.EOL + (parseInt(num) + 1) + '. ');
    } else {
      this.editor.selectBeforeText(text.length);
      this.editor.setSelectText('');
    }
    event.preventDefault();
  },

  focus() {
    this.editor.focus();
  },

  blur() {
    this.editor.blur();
  },

  addCommand(item) {
    if (!item.name || !item.handler) return;
    this.commands = this.commands || {};
    this.commands[item.name] = item;
    if (item.key) {
      this.shortcut.bind(item.key, item.name);
    }
  },

  removeCommand(name) {
    this.commands = this.commands || {};
    this.commands[name] = null;
    delete this.commands[name];
  },

  execCommand(name, event) {
    event = event || {};
    event.mditor = this;
    event.toolbar = this.toolbar;
    event.editor = this.editor;
    this.commands[name].handler.call(this, event);
  }

});

module.exports = window.Mditor = Mditor;