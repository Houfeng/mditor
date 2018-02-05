/*istanbul ignore next*/'use strict';

var mokit = require('mokit');
var EventEmitter = mokit.EventEmitter;
var utils = require('ntils');
var Stack = require('./stack');
var commands = require('./commands');

require('./index.less');

var ua = window.navigator.userAgent.toLowerCase();
var isIE = !!ua.match(/msie|trident\/7|edge/);
//const isWinPhone = ua.indexOf('windows phone') !== -1;
//const isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

module.exports = new mokit.Component({
  template: require('./index.html'),

  props: {
    mditor: null,
    value: null,
    markExp: null
  },

  /*istanbul ignore next*/onReady: function onReady() {
    /*istanbul ignore next*/var _this = this;

    this.stack = new Stack();
    setTimeout(function () {
      /*istanbul ignore next*/_this.textareaEmitter = new EventEmitter( /*istanbul ignore next*/_this.textarea);
      /*istanbul ignore next*/_this.stack.init({
        value: /*istanbul ignore next*/_this.getValue()
      });
    }, 300);
    this._bindCommands();
  },
  /*istanbul ignore next*/_bindCommands: function _bindCommands() {
    /*istanbul ignore next*/var _this2 = this;

    commands.forEach(function (item) {
      /*istanbul ignore next*/_this2.mditor.removeCommand(item.name);
      /*istanbul ignore next*/_this2.mditor.addCommand(item);
    });
  },
  /*istanbul ignore next*/onCompositionStart: function onCompositionStart() {
    this._compositionLock = true;
  },
  /*istanbul ignore next*/onCompositionEnd: function onCompositionEnd() {
    /*istanbul ignore next*/var _this3 = this;

    this._compositionLock = false;
    setTimeout(function () /*istanbul ignore next*/{
      return (/*istanbul ignore next*/_this3.onInput()
      );
    }, 300);
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
  /*istanbul ignore next*/onInput: function onInput() {
    /*istanbul ignore next*/var _this4 = this;

    this.$emit('input');
    if (this._changedTimer) {
      clearTimeout(this._changedTimer);
      this._changedTimer = null;
    }
    if (this._compositionLock) return;
    this._changedTimer = setTimeout(function () {
      if (! /*istanbul ignore next*/_this4._changedTimer) return;
      /*istanbul ignore next*/_this4.stack.push({
        value: /*istanbul ignore next*/_this4.getValue(),
        range: /*istanbul ignore next*/_this4.getSelectRange()
      });
      /*istanbul ignore next*/_this4.$emit('changed');
    }, 300);
  },
  /*istanbul ignore next*/undo: function undo() {
    /*istanbul ignore next*/var _this5 = this;

    var last = this.stack.last();
    var item = this.stack.undo();
    if (utils.isNull(item) || utils.isNull(item.value)) return;
    var valGap = last.value.length - item.value.length;
    this.value = item.value;
    if (last.range) {
      setTimeout(function () {
        var start = last.range.start - valGap;
        var end = last.range.end - valGap;
        /*istanbul ignore next*/_this5.setSelectRange(start, end);
      });
    }
  },
  /*istanbul ignore next*/redo: function redo() {
    /*istanbul ignore next*/var _this6 = this;

    var item = this.stack.redo();
    if (utils.isNull(item) || utils.isNull(item.value)) return;
    this.value = item.value;
    if (item.range) {
      setTimeout(function () {
        /*istanbul ignore next*/_this6.setSelectRange(item.range.start, item.range.end);
      });
    }
  },
  /*istanbul ignore next*/onPaste: function onPaste(event) {
    this.$emit('paste', event);
  },
  /*istanbul ignore next*/onDragover: function onDragover(event) {
    event.preventDefault();
    this.$emit('dragover', event);
  },
  /*istanbul ignore next*/onDrop: function onDrop(event) {
    event.preventDefault();
    this.$emit('drop', event);
  },
  /*istanbul ignore next*/focus: function focus() {
    this.textarea.focus();
  },
  /*istanbul ignore next*/blur: function blur() {
    this.textarea.blur();
  },
  /*istanbul ignore next*/onScroll: function onScroll(event) {
    this.syncScroll();
    this.$emit('scroll', event);
  },
  /*istanbul ignore next*/syncScroll: function syncScroll(disTwice) {
    /*istanbul ignore next*/var _this7 = this;

    this.marks.scrollTop = this.textarea.scrollTop;
    this.marks.scrollLeft = this.textarea.scrollLeft;
    if (disTwice) return;
    setTimeout(function () {
      /*istanbul ignore next*/_this7.syncScroll(true);
    }, 0);
  },
  /*istanbul ignore next*/applyMarks: function applyMarks(text) {
    if (!text || !this.markExp) return;
    text = text.replace(/\n$/g, '\n\n').replace(this.markExp, '<mark>$&</mark>');
    if (isIE) {
      // IE wraps whitespace differently in a div vs textarea, this fixes it
      text = text.replace(/ /g, ' <wbr>');
    }
    return text;
  },
  /*istanbul ignore next*/activeMark: function activeMark(index) {
    var marks = [].slice.call(this.marks.querySelectorAll('mark'));
    if (marks.length < 1) return;
    this.activeMarkIndex = utils.isNull(this.activeMarkIndex) ? -1 : this.activeMarkIndex;
    if (utils.isNull(index)) {
      this.activeMarkIndex++;
    } else {
      this.activeMarkIndex = index;
    }
    if (this.activeMarkIndex >= marks.length) {
      this.activeMarkIndex = 0;
    }
    marks.forEach(function (mark) {
      mark.classList.remove('active');
    });
    var activeMark = marks[this.activeMarkIndex];
    activeMark.classList.add('active');
    this.scrollToMark(activeMark);
  },
  /*istanbul ignore next*/scrollToMark: function scrollToMark(mark) {
    // mark.scrollIntoView();
    // this.textarea.scrollTop = this.marks.scrollTop;
    // this.textarea.scrollTop -= 20;
    this.textarea.scrollTop = mark.offsetTop - 20;
  },
  /*istanbul ignore next*/getValue: function getValue() {
    return this.textarea.value;
  },
  /*istanbul ignore next*/setValue: function setValue(value) {
    this.textarea.value = value;
  },
  /*istanbul ignore next*/getActiveElement: function getActiveElement() {
    this.textarea.focus();
    return document.activeElement;
  },
  /*istanbul ignore next*/getSelectRange: function getSelectRange() {
    var box = this.getActiveElement();
    return {
      'start': box.selectionStart,
      'end': box.selectionEnd
    };
  },
  /*istanbul ignore next*/setSelectRange: function setSelectRange(start, end) {
    var box = this.getActiveElement();
    box.setSelectionRange(start, end);
  },
  /*istanbul ignore next*/getSelectText: function getSelectText() {
    var box = this.getActiveElement();
    var range = this.getSelectRange();
    return box.value.substring(range.start, range.end);
  },
  /*istanbul ignore next*/setSelectText: function setSelectText(text) {
    /*istanbul ignore next*/var _this8 = this;

    var box = this.getActiveElement();
    var range = this.getSelectRange();
    box.setRangeText(text);
    if (range.end == range.start) {
      this.setSelectRange(range.start, range.end + text.length);
    }
    this.value = this.getValue();
    this.onInput();
    setTimeout(function () {
      /*istanbul ignore next*/_this8.blur();
      /*istanbul ignore next*/_this8.focus();
    }, 0);
  },
  /*istanbul ignore next*/wrapSelectText: function wrapSelectText(before, after) {
    before = before !== null && before !== undefined ? before : '';
    after = after !== null && after !== undefined ? after : '';
    var range = this.getSelectRange();
    var text = this.getSelectText();
    this.setSelectText(before + text + after);
    var newStart = range.start + before.length;
    var newEnd = range.end + before.length;
    this.setSelectRange(newStart, newEnd);
  },
  /*istanbul ignore next*/insertBeforeText: function insertBeforeText(text) {
    this.wrapSelectText(text);
  },
  /*istanbul ignore next*/insertAfterText: function insertAfterText(text) {
    this.wrapSelectText('', text);
  },
  /*istanbul ignore next*/getBeforeText: function getBeforeText(length) {
    var range = this.getSelectRange();
    var end = range.start;
    var start = end - length;
    var value = this.getValue();
    return value.substring(start, end);
  },
  /*istanbul ignore next*/getBeforeFirstCharIndex: function getBeforeFirstCharIndex(char) {
    var range = this.getSelectRange();
    var end = range.start;
    var start = 0;
    var value = this.getValue();
    return value.substring(start, end).lastIndexOf(char);
  },
  /*istanbul ignore next*/getBeforeWord: function getBeforeWord() {
    /*istanbul ignore next*/var _this9 = this;

    var chars = [' ', '\t', this.mditor.EOL];
    var start = 0;
    chars.forEach(function (char) {
      var index = /*istanbul ignore next*/_this9.getBeforeFirstCharIndex(char);
      if (index + char.length > start) {
        start = index + char.length;
      }
    });
    var range = this.getSelectRange();
    var value = this.getValue();
    return value.substring(start, range.end);
  },
  /*istanbul ignore next*/getBeforeTextInLine: function getBeforeTextInLine() {
    var start = this.getBeforeFirstCharIndex(this.mditor.EOL) + this.mditor.EOL.length;
    var range = this.getSelectRange();
    var value = this.getValue();
    return value.substring(start, range.end);
  },
  /*istanbul ignore next*/selectBeforeText: function selectBeforeText(length) {
    var range = this.getSelectRange();
    this.setSelectRange(range.start - length, range.end);
  },
  /*istanbul ignore next*/selectAfterText: function selectAfterText(length) {
    var range = this.getSelectRange();
    this.setSelectRange(range.start, range.end + length);
  },
  /*istanbul ignore next*/selectBeforeTextInLine: function selectBeforeTextInLine() {
    var start = this.getBeforeFirstCharIndex(this.mditor.EOL) + this.mditor.EOL.length;
    var range = this.getSelectRange();
    this.setSelectRange(start, range.end);
  },
  /*istanbul ignore next*/addIndent: function addIndent() {
    /*istanbul ignore next*/var _this10 = this;

    var selectText = this.getSelectText();
    if (selectText.length < 1) {
      this.insertBeforeText(this.mditor.INDENT);
      return;
    }
    var textArray = selectText.split(this.mditor.EOL);
    var buffer = [];
    var lineCount = textArray.length - 1;
    textArray.forEach(function (line, index) {
      line = line.trim() !== '' ? /*istanbul ignore next*/_this10.mditor.INDENT + line : line;
      if (index < lineCount || line.trim() !== '') {
        buffer.push(line);
      }
    });
    this.setSelectText(buffer.join(this.mditor.EOL));
  },
  /*istanbul ignore next*/removeIndent: function removeIndent() {
    /*istanbul ignore next*/var _this11 = this;

    var indentRegExp = new RegExp('^' + this.mditor.INDENT);
    var selectText = this.getSelectText();
    if (selectText.length < 1) {
      this.selectBeforeTextInLine();
      if (this.getSelectText().length > 0) {
        event.clearSelected = true;
        this.removeIndent();
      }
      return;
    }
    var textArray = selectText.split(this.mditor.EOL);
    var buffer = [];
    textArray.forEach(function (line) {
      if (indentRegExp.test(line)) {
        line = line.replace( /*istanbul ignore next*/_this11.mditor.INDENT, '');
      }
      buffer.push(line);
    });
    this.setSelectText(buffer.join(this.mditor.EOL));
    if (event.clearSelected) {
      var range = this.getSelectRange();
      this.setSelectRange(range.end, range.end);
    }
  }
});