/*istanbul ignore next*/'use strict';

module.exports = [{
  name: 'bold',
  title: '粗体',
  key: 'shift+alt+b',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('**', '**');
  }
}, {
  name: 'italic',
  title: '斜体',
  key: 'shift+alt+i',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('*', '*');
  }
}, {
  name: 'underline',
  title: '下划线',
  key: 'shift+alt+e',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('<u>', '</u>');
  }
}, {
  name: 'strikethrough',
  title: '删除线',
  key: 'shift+alt+d',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('~~', '~~');
  }
}, {
  name: 'header',
  title: '标题',
  key: 'shift+alt+1',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('# ');
  }
}, {
  name: 'quote',
  icon: 'quote-left',
  title: '引用',
  key: 'shift+alt+q',
  /*istanbul ignore next*/handler: function handler() {
    var selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('> ');
      return;
    }
    var textArray = selectText.split(this.EOL);
    var buffer = [];
    textArray.forEach(function (line) {
      buffer.push('> ' + line + '  ');
    });
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'code',
  title: '代码',
  key: 'shift+alt+c',
  /*istanbul ignore next*/handler: function handler() {
    var lang = 'js' + this.EOL;
    var before = '```' + lang;
    var after = '```  ' + this.EOL;
    var text = this.editor.getSelectText().trim();
    if (text.length > 0) {
      text += this.EOL;
    }
    this.editor.setSelectText(text);
    this.editor.wrapSelectText(before, after);
    var range = this.editor.getSelectRange();
    var start = range.start - lang.length;
    var end = range.start - this.EOL.length;
    this.editor.setSelectRange(start, end);
  }
}, {
  name: 'list-ol',
  title: '有序列表',
  key: 'shift+alt+o',
  /*istanbul ignore next*/handler: function handler() {
    var selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('1. ');
      return;
    }
    var textArray = selectText.split(this.EOL);
    var buffer = [];
    for (var i = 0; i < textArray.length; i++) {
      var line = textArray[i];
      buffer.push(i + 1 + '. ' + line);
    }
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'list-ul',
  title: '无序列表',
  key: 'shift+alt+u',
  /*istanbul ignore next*/handler: function handler() {
    var selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('- ');
      return;
    }
    var textArray = selectText.split(this.EOL);
    var buffer = [];
    textArray.forEach(function (line) {
      buffer.push('- ' + line);
    });
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'link',
  title: '链接',
  key: 'shift+alt+l',
  /*istanbul ignore next*/handler: function handler() {
    var text = this.editor.getSelectText();
    if (!text || /^(https:|http:|ftp:|file:|mailto:|\/|\.)/i.test(text)) {
      this.editor.wrapSelectText('[link](', ')');
      if (!text) return;
      var range = this.editor.getSelectRange();
      var start = range.start - 6;
      this.editor.setSelectRange(start, start + 4);
    } else {
      this.editor.wrapSelectText('[', ']()');
      var _range = this.editor.getSelectRange();
      var index = _range.end + 2;
      this.editor.setSelectRange(index, index);
    }
  }
}, {
  name: 'table',
  title: '表格',
  key: 'shift+alt+t',
  /*istanbul ignore next*/handler: function handler() {
    var buffer = ['column1 | column2 | column3  ', '------- | ------- | -------  ', 'column1 | column2 | column3  ', 'column1 | column2 | column3  ', 'column1 | column2 | column3  '];
    this.editor.wrapSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'line',
  title: '分隔线',
  icon: 'minus',
  key: 'shift+alt+h',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('----' + this.EOL);
  }
}, {
  name: 'image',
  title: '图片',
  key: 'shift+alt+p',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('![alt](', ')');
  }
}, {
  name: 'help',
  title: '帮助',
  icon: 'question',
  key: 'shift+alt+/',
  /*istanbul ignore next*/handler: function handler() {
    window.open('http://mditor.com', '_blank');
  }
}, {
  name: 'toggleFullScreen',
  title: '全屏',
  icon: 'arrows-alt',
  key: 'shift+alt+f',
  control: true,
  state: 'fullscreen',
  owner: function /*istanbul ignore next*/owner(mditor) {
    return mditor.$element;
  },
  /*istanbul ignore next*/handler: function handler() {
    this.fullscreen = !this.fullscreen;
  }
}, {
  name: 'togglePreview',
  title: '预览',
  icon: 'desktop',
  key: 'shift+alt+v',
  control: true,
  state: 'preview',
  owner: function /*istanbul ignore next*/owner(mditor) {
    return mditor.$element;
  },
  /*istanbul ignore next*/handler: function handler() {
    this.preview = !this.preview;
    if (this.preview) {
      this._split = this.split;
      this.split = false;
    } else {
      this.split = this._split;
    }
  }
}, {
  name: 'toggleSplit',
  title: '分屏',
  icon: 'columns',
  key: 'shift+alt+s',
  control: true,
  state: 'split',
  owner: function /*istanbul ignore next*/owner(mditor) {
    return mditor.$element;
  },
  /*istanbul ignore next*/handler: function handler() {
    this.split = !this.split;
    if (this.split) {
      this.preview = false;
    }
  }
}];