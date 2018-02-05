require('./index.less');

const mokit = require('mokit');
const Mditor = require('mditor/src/client');
const drapable = require('./drapable');
const ipcRenderer = nodeRequire('electron').ipcRenderer;
const pkg = require('../../package');
const UMLParser = require('../uml');
const utils = require('ntils');
const blobToBase64 = require('../common/blob2buffer');

//初始处理
drapable(document.body);
window.open = function (url) {
  remote.shell.openExternal(url);
};

const baseElement = document.querySelector('base');

//插件或语法扩展
let languages = Mditor.Parser.Prism.languages;
let highlights = Mditor.Parser.highlights;
highlights['uml'] = new UMLParser();
languages['editor'] = languages['yaml'];
languages['shortcut'] = languages['yaml'];
languages['slide'] = languages['yaml'];

//context
const ctx = window.ctx = mokit({
  element: document.body,
  components: {
    Mditor
  },

  /**
   * 组件就续时
   * @returns {void} 无返回
   */
  onReady() {
    this.currentWindow = remote.getCurrentWindow();
    this.mditor.removeCommand('toggleFullScreen');
    this.overrideToolbar();
    this.applyPreference(remote.getGlobal('preference'));
    this.applyLocale(remote.getGlobal('locale'));
  },

  /**
   * 在右击时弹出内容菜单
   * @param {object} event 事件对象
   * @returns {void} 无返回
   */
  onContextMenu(event) {
    if (event.target != this.mditor.editor.textarea) return;
    ipcRenderer.send('contextmenu');
  },

  /**
   * 重写帮助按钮
   * @returns {void} 无返回
   */
  overrideToolbar() {
    //帮助按钮
    let helpBtn = this.mditor.toolbar.getItem('help');
    helpBtn.handler = () => {
      remote.shell.openExternal(pkg.homepage);
    };
    //图片按钮
    let imgBtn = this.mditor.toolbar.getItem('image');
    imgBtn.handler = () => {
      remote.dialog.showOpenDialog(this.currentWindow, {
        filters: [{
          name: 'Images',
          extensions: ['png', 'jpg', 'jpeg', 'gif']
        }],
        properties: ['openFile', 'multiSelections']
      }, this.insertImage.bind(this));
    };
  },

  insertImage(filenames) {
    if (!filenames) return;
    if (!utils.isArray(filenames)) {
      filenames = [filenames];
    }
    filenames = filenames.filter(item => !!item);
    if (!filenames || filenames.length < 1) return;
    let text = filenames.map(filename => {
      return `![${filename.split('/').pop()}](file://${filename})`;
    }).join(this.mditor.EOL);
    this.mditor.editor.insertBeforeText(text);
  },

  openFile(filename) {
    ipcRenderer.send('open-file', {
      filename: filename,
      windowId: this.currentWindow.id
    });
  },

  onChanged() {
    ipcRenderer.send('content-changed', {
      filename: ctx.filename,
      windowId: this.currentWindow.id
    });
  },

  async onPaste(event) {
    let items = [].slice.call(event.clipboardData.items);
    let imageItems = items.filter(item => {
      return item.type.startsWith('image/');
    }).map(item => ({
      type: item.type,
      file: item.getAsFile()
    }));
    if (imageItems.length < 1) return;
    event.preventDefault();
    await Promise.all(imageItems.map(item => {
      return blobToBase64(item.file).then(content => {
        item.content = content;
      });
    }));
    imageItems.forEach(image => {
      ipcRenderer.send('save-image', {
        type: image.type,
        content: image.content
      });
    });
  },

  toggleMaximize() {
    if (this.currentWindow.isMaximized()) {
      this.currentWindow.unmaximize();
    } else {
      this.currentWindow.maximize();
    }
  },

  applyPreference(preference) {
    if (!preference) return;
    this.applyEditorPreference(preference.editor);
    this.applyShortcutPreference(preference.shortcut);
  },

  applyEditorPreference(configs) {
    configs = configs || {};
    if (!utils.isNumber(configs.tab)) configs.tab = 2;
    if (configs.tab < 1) {
      this.mditor.INDENT = '\t';
    } else {
      this.mditor.INDENT = new Array(configs.tab).fill(' ').join('');
    }
    this.mditor.editor.textarea.style.color = configs.color || '';
    this.mditor.editor.$element.style.backgroundColor = configs.backgroundColor || '';
  },

  applyShortcutPreference(configs) {
    if (!configs) return;
    utils.each(configs, (cmd, key) => {
      if (!key || !cmd) return;
      this.mditor.shortcut.unbind(key);
      this.mditor.shortcut.bind(key, cmd);
    });
  },

  applyLocale(locale) {
    this.mditor.viewer.alert = locale.previewArea;
    this.mditor.toolbar.items.forEach(item => {
      let name = item.name.replace(/\-([a-z]{1})/ig, $1 => $1.slice(1).toUpperCase());
      item.title = locale[name];
    });
  }

}).start();

//在收到文件内容时
ipcRenderer.on('file', function (event, info) {
  document.title = info.filename;
  baseElement.href = info.filename;
  ctx.filename = info.filename;
  ctx.mditor.value = info.content;
  ctx.mditor.editor.stack.init({
    value: info.content
  });
});

//在收到执行命令时
ipcRenderer.on('command', function (event, info) {
  ctx.mditor.execCommand(info.name);
});

//在收到偏好设置时
ipcRenderer.on('preference', function (event, preference) {
  ctx.applyPreference(preference);
});

//在收到国际化设置时
ipcRenderer.on('locale', function (event, locale) {
  ctx.applyLocale(locale);
});

//在收到插入图片时
ipcRenderer.on('image', function (event, info) {
  ctx.insertImage(info.filename);
});