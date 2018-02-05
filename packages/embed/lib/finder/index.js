/*istanbul ignore next*/'use strict';

var mokit = require('mokit');
var utils = require('ntils');

require('./index.less');

var CHECK_REGEXP = /^\/[\s\S]+\/(i|g|m)*$/;

var Finder = new mokit.Component({
  template: require('./index.html'),
  props: {
    mditor: null,
    active: false,
    findWord: '',
    replaceWord: ''
  },
  /*istanbul ignore next*/onReady: function onReady() {
    this.mditor.removeCommand('find');
    this.mditor.addCommand({
      name: 'find',
      key: '{cmd}+f',
      owner: this.mditor.$element,
      handler: this.show.bind(this, null)
    });
    this.mditor.removeCommand('cancel-find');
    this.mditor.addCommand({
      name: 'cancel-find',
      key: 'esc',
      owner: this.mditor.$element,
      handler: this.hide.bind(this)
    });
  },
  /*istanbul ignore next*/hide: function hide() {
    this.findWord = '';
    this.replaceWord = '';
    this.mditor.editor.markExp = null;
    this.active = false;
  },
  /*istanbul ignore next*/show: function show(text) {
    /*istanbul ignore next*/var _this = this;

    this.active = true;
    this.findWord = text || this.mditor.editor.getSelectText();
    if (this.active) {
      setTimeout(function () {
        /*istanbul ignore next*/_this.findBox.focus();
      }, 200);
    }
    this.mditor.editor.syncScroll();
  },

  watch: {
    /*istanbul ignore next*/findWord: function findWord() {
      /*istanbul ignore next*/var _this2 = this;

      if (!this.mditor || !this.mditor.editor) return;
      if (!this.findWord) {
        this.mditor.editor.markExp = null;
      } else {
        this.mditor.editor.markExp = this.parseRegexp(this.findWord);
      }
      setTimeout(function () {
        /*istanbul ignore next*/_this2.mditor.editor.activeMark(0);
      }, 100);
    }
  },
  /*istanbul ignore next*/parseRegexp: function parseRegexp(text, forceStr) {
    if (!forceStr && CHECK_REGEXP.test(text)) {
      try {
        return new Function( /*istanbul ignore next*/'return ' + text)();
      } catch (err) {
        return this.parseRegexp(text, true);
      }
    } else {
      return new RegExp(utils.escapeRegExp(text), 'gm');
    }
  },
  /*istanbul ignore next*/find: function find() {
    this.mditor.editor.activeMark();
  },
  /*istanbul ignore next*/replace: function replace() {
    this.mditor.value = this.mditor.value.replace(this.mditor.editor.markExp, this.replaceWord || '');
  },
  /*istanbul ignore next*/onFindEnter: function onFindEnter(event) {
    if (event.keyCode != 13) return;
    event.preventDefault();
    this.find();
  },
  /*istanbul ignore next*/onReplaceEnter: function onReplaceEnter(event) {
    if (event.keyCode != 13) return;
    event.preventDefault();
    this.replace();
  },
  /*istanbul ignore next*/onCompositionEnd: function onCompositionEnd(event) {
    event.target.blur();
    event.target.focus();
  }
});

module.exports = Finder;