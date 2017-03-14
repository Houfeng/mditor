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

  onChanged() {
    setTimeout(() => {
      this.$emit('changed');
    }, 0);
  },

  onPaste(event) {
    this.$emit('paste', event);
  },

  onDragover(event) {
    event.preventDefault();
    this.$emit('dragover', event);
  },

  onDrop(event) {
    event.preventDefault();
    this.$emit('drop', event);
  },

  focus() {
    this.$element.focus();
  },

  blur() {
    this.$element.blur();
  },

  onScroll(event) {
    this.$emit('scroll', event);
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
    let box = this.getActiveElement();
    return {
      'start': box.selectionStart,
      'end': box.selectionEnd
    };
  },

  setSelectRange(start, end) {
    let box = this.getActiveElement();
    box.setSelectionRange(start, end);
  },

  getSelectText() {
    let box = this.getActiveElement();
    let range = this.getSelectRange();
    return box.value.substring(range.start, range.end);
  },

  setSelectText(text) {
    let box = this.getActiveElement();
    let range = this.getSelectRange();
    box.setRangeText(text);
    if (range.end == range.start) {
      this.setSelectRange(range.start, range.end + text.length);
    }
    this.$elementEmitter.emit('input');
  },

  wrapSelectText(before, after) {
    before = (before !== null && before !== undefined) ? before : '';
    after = (after !== null && after !== undefined) ? after : '';
    let range = this.getSelectRange();
    let text = this.getSelectText();
    this.setSelectText(before + text + after);
    let newStart = range.start + before.length;
    let newEnd = range.end + before.length;
    this.setSelectRange(newStart, newEnd);
  },

  insertBeforeText(text) {
    this.wrapSelectText(text);
  },

  insertAfterText(text) {
    this.wrapSelectText('', text);
  },

  getBeforeText(length) {
    let range = this.getSelectRange();
    let end = range.start;
    let start = end - length;
    let value = this.getValue();
    return value.substring(start, end);
  },

  getBeforeFirstCharIndex(char) {
    let range = this.getSelectRange();
    let end = range.start;
    let start = 0;
    let value = this.getValue();
    return value.substring(start, end).lastIndexOf(char);
  },

  getBeforeWord() {
    let chars = [' ', '\t', this.mditor.EOL];
    let start = 0;
    chars.forEach(char => {
      let index = this.getBeforeFirstCharIndex(char);
      if (index + char.length > start) {
        start = index + char.length;
      }
    });
    let range = this.getSelectRange();
    let value = this.getValue();
    return value.substring(start, range.end);
  },

  getBeforeTextInLine() {
    let start = this.getBeforeFirstCharIndex(this.mditor.EOL) + this.mditor.EOL.length;
    let range = this.getSelectRange();
    let value = this.getValue();
    return value.substring(start, range.end);
  },

  selectBeforeText(length) {
    let range = this.getSelectRange();
    this.setSelectRange(range.start - length, range.end);
  },

  selectAfterText(length) {
    let range = this.getSelectRange();
    this.setSelectRange(range.start, range.end + length);
  },

  selectBeforeTextInLine() {
    let start = this.getBeforeFirstCharIndex(this.mditor.EOL) + this.mditor.EOL.length;
    let range = this.getSelectRange();
    this.setSelectRange(start, range.end);
  },

  addIndent() {
    let selectText = this.getSelectText();
    if (selectText.length < 1) {
      this.insertBeforeText(this.mditor.INDENT);
      return;
    }
    let textArray = selectText.split(this.mditor.EOL);
    let buffer = [];
    let lineCount = textArray.length - 1;
    textArray.forEach((line, index) => {
      line = line.trim() !== '' ? this.mditor.INDENT + line : line;
      if (index < lineCount || line.trim() !== '') {
        buffer.push(line);
      }
    });
    this.setSelectText(buffer.join(this.mditor.EOL));
  },

  removeIndent() {
    let indentRegExp = new RegExp('^' + this.mditor.INDENT);
    let selectText = this.getSelectText();
    if (selectText.length < 1) {
      this.selectBeforeTextInLine();
      if (this.getSelectText().length > 0) {
        event.clearSelected = true;
        this.removeIndent();
      }
      return;
    }
    let textArray = selectText.split(this.mditor.EOL);
    let buffer = [];
    textArray.forEach(line => {
      if (indentRegExp.test(line)) {
        line = line.replace(this.mditor.INDENT, '');
      }
      buffer.push(line);
    });
    this.setSelectText(buffer.join(this.mditor.EOL));
    if (event.clearSelected) {
      let range = this.getSelectRange();
      this.setSelectRange(range.end, range.end);
    }
  }

});