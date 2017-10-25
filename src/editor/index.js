const mokit = require('mokit');
const EventEmitter = mokit.EventEmitter;
const utils = require('ntils');
const Stack = require('./stack');
const commands = require('./commands');

require('./index.less');

const ua = window.navigator.userAgent.toLowerCase();
const isIE = !!ua.match(/msie|trident\/7|edge/);
//const isWinPhone = ua.indexOf('windows phone') !== -1;
//const isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

module.exports = new mokit.Component({
  template: require('./index.html'),

  props: {
    mditor: null,
    value: null,
    markExp: null
  },

  onReady() {
    this.stack = new Stack();
    setTimeout(() => {
      this.textareaEmitter = new EventEmitter(this.textarea);
      this.stack.init({
        value: this.getValue()
      });
    }, 300);
    this._bindCommands();
  },

  _bindCommands() {
    commands.forEach(item => {
      this.mditor.removeCommand(item.name);
      this.mditor.addCommand(item);
    });
  },

  onCompositionStart() {
    this._compositionLock = true;
  },
  onCompositionEnd() {
    this._compositionLock = false;
    setTimeout(() => this.onInput(), 300);
    /**
     * 在输入中文时，输入法「候选词面板」位置会发生定位错误
     * 经过反复尝试发现了「规律」，第一次「侯选词」上屏后才会位置错误
     * 在「候选词」上屏后让输入框「失去焦点再获取焦点」可「规避」这个 Bug
     * 附上相关 issues
     * https://github.com/electron/electron/issues/8894
     * https://github.com/electron/electron/issues/4539
     */
    // this.textarea.blur();
    // this.textarea.focus();
  },
  onInput() {
    this.$emit('input');
    if (this._changedTimer) {
      clearTimeout(this._changedTimer);
      this._changedTimer = null;
    }
    if (this._compositionLock) return;
    this._changedTimer = setTimeout(() => {
      if (!this._changedTimer) return;
      this.stack.push({
        value: this.getValue(),
        range: this.getSelectRange()
      });
      this.$emit('changed');
    }, 300);
  },

  undo() {
    let last = this.stack.last();
    let item = this.stack.undo();
    if (utils.isNull(item) || utils.isNull(item.value)) return;
    let valGap = last.value.length - item.value.length;
    this.value = item.value;
    if (last.range) {
      setTimeout(() => {
        let start = last.range.start - valGap;
        let end = last.range.end - valGap;
        this.setSelectRange(start, end);
      });
    }
  },

  redo() {
    let item = this.stack.redo();
    if (utils.isNull(item) || utils.isNull(item.value)) return;
    this.value = item.value;
    if (item.range) {
      setTimeout(() => {
        this.setSelectRange(item.range.start, item.range.end);
      });
    }
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
    this.textarea.focus();
  },

  blur() {
    this.textarea.blur();
  },

  onScroll(event) {
    this.syncScroll();
    this.$emit('scroll', event);
  },

  syncScroll(disTwice) {
    this.marks.scrollTop = this.textarea.scrollTop;
    this.marks.scrollLeft = this.textarea.scrollLeft;
    if (disTwice) return;
    setTimeout(() => {
      this.syncScroll(true);
    }, 0);
  },

  applyMarks(text) {
    if (!text || !this.markExp) return;
    text = text
      .replace(/\n$/g, '\n\n')
      .replace(this.markExp, '<mark>$&</mark>');
    if (isIE) {
      // IE wraps whitespace differently in a div vs textarea, this fixes it
      text = text.replace(/ /g, ' <wbr>');
    }
    return text;
  },

  activeMark(index) {
    let marks = [].slice.call(this.marks.querySelectorAll('mark'));
    if (marks.length < 1) return;
    this.activeMarkIndex = utils.isNull(this.activeMarkIndex) ?
      -1 : this.activeMarkIndex;
    if (utils.isNull(index)) {
      this.activeMarkIndex++;
    } else {
      this.activeMarkIndex = index;
    }
    if (this.activeMarkIndex >= marks.length) {
      this.activeMarkIndex = 0;
    }
    marks.forEach(mark => {
      mark.classList.remove('active');
    });
    let activeMark = marks[this.activeMarkIndex];
    activeMark.classList.add('active');
    this.scrollToMark(activeMark);
  },

  scrollToMark(mark) {
    // mark.scrollIntoView();
    // this.textarea.scrollTop = this.marks.scrollTop;
    // this.textarea.scrollTop -= 20;
    this.textarea.scrollTop = mark.offsetTop - 20;
  },

  getValue() {
    return this.textarea.value;
  },

  setValue(value) {
    this.textarea.value = value;
  },

  getActiveElement() {
    this.textarea.focus();
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
    this.value = this.getValue();
    this.onInput();
    setTimeout(() => {
      this.blur();
      this.focus();
    }, 0);
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