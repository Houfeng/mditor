const mokit = require('mokit');
const EventEmitter = mokit.EventEmitter;

require('./index.less');

module.exports = new mokit.Component({
  template: require('./index.html'),

  props: {
    mditor: null,
    value: null
  },

  onReady() {
    this.$elementEmitter = new EventEmitter(this.$element);
  },

  /**
   * 使编辑器获取焦点
   **/
  focus() {
    this.$element.focus();
  },

  /**
   * 使编辑器失去焦点
   **/
  blur() {
    this.$element.blur();
  },

  getValue() {
    return this.$element.value;
  },

  setValue(value) {
    this.$element.value = value;
  },

  getActiveElement() {
    this.$element.focus();
    return document.activeElement;
  },

  getSelectRange() {
    var box = this.getActiveElement();
    return {
      'start': box.selectionStart,
      'end': box.selectionEnd
    };
  },

  setSelectRange(start, end) {
    var box = this.getActiveElement();
    box.setSelectionRange(start, end);
  },

  getSelectText() {
    var box = this.getActiveElement();
    var range = this.getSelectRange();
    return box.value.substring(range.start, range.end);
  },

  setSelectText(text) {
    var box = this.getActiveElement();
    var range = this.getSelectRange();
    box.setRangeText(text);
    if (range.end == range.start) {
      this.setSelectRange(range.start, range.end + text.length);
    }
    this.$elementEmitter.emit('input');
  },

  wrapSelectText(before, after) {
    before = (before !== null && before !== undefined) ? before : '';
    after = (after !== null && after !== undefined) ? after : '';
    var range = this.getSelectRange();
    var text = this.getSelectText();
    this.setSelectText(before + text + after);
    var newStart = range.start + before.length;
    var newEnd = range.end + before.length;
    this.setSelectRange(newStart, newEnd);
  },

  insertBeforeText(text) {
    this.wrapSelectText(text);
  },

  insertAfterText(text) {
    this.wrapSelectText('', text);
  },

  getBeforeText(length) {
    var range = this.getSelectRange();
    var end = range.start;
    var start = end - length;
    var value = this.getValue();
    return value.substring(start, end);
  },

  getBeforeFirstCharIndex(char) {
    var range = this.getSelectRange();
    var end = range.start;
    var start = 0;
    var value = this.getValue();
    return value.substring(start, end).lastIndexOf(char);
  },

  getBeforeWord() {
    var chars = [' ', '\t', this.mditor.EOL];
    var start = 0;
    chars.forEach(char => {
      var index = this.getBeforeFirstCharIndex(char);
      if (index + char.length > start) {
        start = index + char.length;
      }
    });
    var range = this.getSelectRange();
    var value = this.getValue();
    return value.substring(start, range.end);
  },

  getBeforeTextInLine() {
    var start = this.getBeforeFirstCharIndex(this.mditor.EOL) + this.mditor.EOL.length;
    var range = this.getSelectRange();
    var value = this.getValue();
    return value.substring(start, range.end);
  },

  selectBeforeText(length) {
    var range = this.getSelectRange();
    this.setSelectRange(range.start - length, range.end);
  },

  selectAfterText(length) {
    var range = this.getSelectRange();
    this.setSelectRange(range.start, range.end + length);
  },

  selectBeforeTextInLine() {
    var start = this.getBeforeFirstCharIndex(this.mditor.EOL) + this.mditor.EOL.length;
    var range = this.getSelectRange();
    this.setSelectRange(start, range.end);
  },

});