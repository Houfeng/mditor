const mokit = require('mokit');

require('./index.less');

const CHECK_REGEXP = /^\/.+\/(i|g|m)*$/;

const Finder = new mokit.Component({
  template: require('./index.html'),
  props: {
    mditor: null,
    active: false,
    findWord: '',
    replaceWord: ''
  },
  onReady() {
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
  hide() {
    this.findWord = '';
    this.replaceWord = '';
    this.mditor.editor.markExp = null;
    this.active = false;
  },
  show(text) {
    this.active = true;
    this.findWord = text || this.mditor.editor.getSelectText();
    if (this.active) {
      setTimeout(() => {
        this.findBox.focus();
      }, 200);
    }
  },
  watch: {
    findWord() {
      if (!this.findWord) {
        this.mditor.editor.markExp = null;
      } else {
        this.mditor.editor.markExp = this.parseRegexp(this.findWord);
      }
      setTimeout(() => {
        this.mditor.editor.activeMark(0);
      }, 100);
    }
  },
  parseRegexp(text) {
    if (CHECK_REGEXP.test(text)) {
      return (new Function(`return ${text}`))();
    } else {
      return new RegExp(text.replace(/\\/igm, '\\\\'), 'gm');
    }
  },
  find() {
    this.mditor.editor.activeMark();
  },
  replace() {
    this.mditor.value = this.mditor.value.replace(
      new RegExp(this.findWord, 'gm'),
      this.replaceWord || ''
    );
  },
  onFindEnter(event) {
    if (event.keyCode != 13) return;
    event.preventDefault();
    this.find();
  },
  onReplaceEnter(event) {
    if (event.keyCode != 13) return;
    event.preventDefault();
    this.replace();
  }
});

module.exports = Finder;