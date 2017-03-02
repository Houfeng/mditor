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