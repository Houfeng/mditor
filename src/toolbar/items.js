module.exports = [{
  name: 'bold',
  title: '粗体',
  key: 'shift+alt+b',
  handler: function (event) {
    this.editor.wrapSelectText('**', '**');
    return this;
  }
}, {
  name: 'italic',
  title: '斜体',
  key: 'shift+alt+i',
  handler: function (event) {
    this.editor.wrapSelectText('*', '*');
    return this;
  }
}, {
  name: 'underline',
  title: '下划线',
  key: 'shift+alt+e',
  handler: function (event) {
    this.editor.wrapSelectText('<u>', '</u>');
    return this;
  }
}, {
  name: 'strikethrough',
  title: '删除线',
  key: 'shift+alt+d',
  handler: function (event) {
    this.editor.wrapSelectText('~~', '~~');
    return this;
  }
}, {
  name: 'header',
  title: '标题',
  key: 'shift+alt+h',
  handler: function (event) {
    this.editor.wrapSelectText('# ');
    return this;
  }
}, {
  name: 'quote',
  icon: 'quote-left',
  title: '引用',
  key: 'shift+alt+q',
  handler: function (event) {
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
    return this;
  }
}, {
  name: 'code',
  title: '代码',
  key: 'shift+alt+c',
  handler: function (event) {
    var lang = 'javascript' + this.EOL;
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
    return this;
  }
}, {
  name: 'list-ol',
  title: '有序列表',
  key: 'shift+alt+o',
  handler: function (event) {
    var selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('1. ');
      return this;
    }
    var textArray = selectText.split(this.EOL);
    var buffer = [];
    for (var i = 0; i < textArray.length; i++) {
      var line = textArray[i];
      buffer.push((i + 1) + '. ' + line);
    }
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
    return this;
  }
}, {
  name: 'list-ul',
  title: '无序列表',
  key: 'shift+alt+u',
  handler: function (event) {
    var selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('- ');
      return this;
    }
    var textArray = selectText.split(this.EOL);
    var buffer = [];
    textArray.forEach(function (line) {
      buffer.push('- ' + line);
    });
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
    return this;
  }
}, {
  name: 'link',
  title: '链接',
  key: 'shift+alt+l',
  handler: function (event) {
    this.editor.wrapSelectText('[text](', ')');
    return this;
  }
}, {
  name: 'table',
  title: '表格',
  key: 'shift+alt+t',
  handler: function (event) {
    var buffer = [
      'column1 | column2 | column3  ',
      '------- | ------- | -------  ',
      'column1 | column2 | column3  ',
      'column1 | column2 | column3  ',
      'column1 | column2 | column3  '
    ];
    this.editor.wrapSelectText(buffer.join(this.EOL) + this.EOL);
    return this;
  }
}, {
  name: 'line',
  title: '分隔线',
  icon: 'minus',
  key: 'shift+alt+n',
  handler: function (event) {
    this.editor.wrapSelectText('----' + this.EOL);
    return this;
  }
}, {
  name: 'image',
  title: '图片',
  key: 'shift+alt+p',
  handler: function (event) {
    this.editor.wrapSelectText('![alt](', ')');
    return this;
  }
}, {
  name: 'help',
  title: '帮助',
  icon: 'question',
  key: 'shift+alt+/',
  handler: function (event) {
    window.open('{homepage}', 'mditor');
    return this;
  }
}, {
  name: 'toggleFullScreen',
  title: '全屏',
  icon: 'arrows-alt',
  key: 'shift+alt+f',
  align: 'right'
}, {
  name: 'togglePreview',
  title: '预览',
  icon: 'columns',
  key: 'shift+alt+v',
  align: 'right'
}];