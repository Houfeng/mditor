module.exports = [{
  name: 'bold',
  title: '粗体',
  key: 'shift+alt+b',
  handler() {
    this.editor.wrapSelectText('**', '**');
  }
}, {
  name: 'italic',
  title: '斜体',
  key: 'shift+alt+i',
  handler() {
    this.editor.wrapSelectText('*', '*');
  }
}, {
  name: 'underline',
  title: '下划线',
  key: 'shift+alt+e',
  handler() {
    this.editor.wrapSelectText('<u>', '</u>');
  }
}, {
  name: 'strikethrough',
  title: '删除线',
  key: 'shift+alt+d',
  handler() {
    this.editor.wrapSelectText('~~', '~~');
  }
}, {
  name: 'header',
  title: '标题',
  key: 'shift+alt+1',
  handler() {
    this.editor.wrapSelectText('# ');
  }
}, {
  name: 'quote',
  icon: 'quote-left',
  title: '引用',
  key: 'shift+alt+q',
  handler() {
    let selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('> ');
      return;
    }
    let textArray = selectText.split(this.EOL);
    let buffer = [];
    textArray.forEach(function (line) {
      buffer.push('> ' + line + '  ');
    });
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'code',
  title: '代码',
  key: 'shift+alt+c',
  handler() {
    let lang = 'js' + this.EOL;
    let before = '```' + lang;
    let after = '```  ' + this.EOL;
    let text = this.editor.getSelectText().trim();
    if (text.length > 0) {
      text += this.EOL;
    }
    this.editor.setSelectText(text);
    this.editor.wrapSelectText(before, after);
    let range = this.editor.getSelectRange();
    let start = range.start - lang.length;
    let end = range.start - this.EOL.length;
    this.editor.setSelectRange(start, end);
  }
}, {
  name: 'list-ol',
  title: '有序列表',
  key: 'shift+alt+o',
  handler() {
    let selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('1. ');
      return;
    }
    let textArray = selectText.split(this.EOL);
    let buffer = [];
    for (let i = 0; i < textArray.length; i++) {
      let line = textArray[i];
      buffer.push((i + 1) + '. ' + line);
    }
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'list-ul',
  title: '无序列表',
  key: 'shift+alt+u',
  handler() {
    let selectText = this.editor.getSelectText();
    if (selectText.length < 1) {
      this.editor.wrapSelectText('- ');
      return;
    }
    let textArray = selectText.split(this.EOL);
    let buffer = [];
    textArray.forEach(function (line) {
      buffer.push('- ' + line);
    });
    this.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'link',
  title: '链接',
  key: 'shift+alt+l',
  handler() {
    let text = this.editor.getSelectText();
    if (!text || /^(https:|http:|ftp:|file:|mailto:|\/|\.)/i.test(text)) {
      this.editor.wrapSelectText('[link](', ')');
      if (!text) return;
      let range = this.editor.getSelectRange();
      let start = range.start - 6;
      this.editor.setSelectRange(start, start + 4);
    } else {
      this.editor.wrapSelectText('[', ']()');
      let range = this.editor.getSelectRange();
      let index = range.end + 2;
      this.editor.setSelectRange(index, index);
    }
  }
}, {
  name: 'table',
  title: '表格',
  key: 'shift+alt+t',
  handler() {
    let buffer = [
      'column1 | column2 | column3  ',
      '------- | ------- | -------  ',
      'column1 | column2 | column3  ',
      'column1 | column2 | column3  ',
      'column1 | column2 | column3  '
    ];
    this.editor.wrapSelectText(buffer.join(this.EOL) + this.EOL);
  }
}, {
  name: 'line',
  title: '分隔线',
  icon: 'minus',
  key: 'shift+alt+h',
  handler() {
    this.editor.wrapSelectText('----' + this.EOL);
  }
}, {
  name: 'image',
  title: '图片',
  key: 'shift+alt+p',
  handler() {
    this.editor.wrapSelectText('![alt](', ')');
  }
}, {
  name: 'baseimg',
  title: 'base64图片',
  icon: 'file-photo-o',
  key: 'shift+alt+k',
  handler() {
    var _this = this
    // 创建元素用来选择图片
    var container = document.createElement('div')
    container.id = "iDiv"
    container.style = 'display:none'
    container.innerHTML = '<input type="file" accept="image/*" id="iFile" />'
    // 将创建的元素追加到body
    document.body.appendChild(container)

    var filereader = new FileReader()
    // 获取页面上刚追加的文件选择控件
    var fileEle = document.getElementById('iFile')
    // 监听change方法
    fileEle.onchange = function (e) {
      var file = e.target.files[0]
      filereader.onload = function () {
        // 获取读取到的base64字符串
        var base64Str = this.result

        //this 指向当前 mditor 实例
        _this.editor.insertBeforeText('![](' + base64Str + ')');
        // 获取base64格式之后，把容器删除
        document.body.removeChild(container)
      }
      // 如果没有选择对应的文件，则返回。不再进行后续逻辑的处理
      if (!file) return
      filereader.readAsDataURL(file)
    }
    // 模拟点击事件
    fileEle.click()
  }
}, {
  name: 'help',
  title: '帮助',
  icon: 'question',
  key: 'shift+alt+/',
  handler() {
    window.open('http://mditor.com', '_blank');
  }
}, {
  name: 'toggleFullScreen',
  title: '全屏',
  icon: 'arrows-alt',
  key: 'shift+alt+f',
  control: true,
  state: 'fullscreen',
  owner: function (mditor) {
    return mditor.$element;
  },
  handler() {
    this.fullscreen = !this.fullscreen;
  }
}, {
  name: 'togglePreview',
  title: '预览',
  icon: 'desktop',
  key: 'shift+alt+v',
  control: true,
  state: 'preview',
  owner: function (mditor) {
    return mditor.$element;
  },
  handler() {
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
  owner: function (mditor) {
    return mditor.$element;
  },
  handler() {
    this.split = !this.split;
    if (this.split) {
      this.preview = false;
    }
  }
}];