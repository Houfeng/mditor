const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const rendererVal = require('electron-renderer-value');
const path = require('path');
const url = require('url');
const menu = require('./menu');
const Promise = require('bluebird');
const fs = require('./common/fs');
const ipcMain = electron.ipcMain;
const utils = require('ntils');
const recent = require('./recent');
const convert = require('./convert');
const update = require('./update');
const shell = electron.shell;
const globalShortcut = electron.globalShortcut;
const preference = require('./preference');
const sleep = require('./common/sleep');
const i18n = require('./i18n');
const stp = require('stp');
const mkdirp = require('./common/mkdirp');
const md5 = require('md5');

const FILE_FILTERS = [{
  name: 'Markdown',
  extensions: ['md']
}];

// 保持所有对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
const windows = [];

/**
 * 创建应用主窗口
 * @returns {BrowserWindow} 应用窗口
 */
app.createWindow = function createWindow() {
  // 创建浏览器窗口。
  let window = new BrowserWindow({
    backgroundColor: '#ffffff',
    width: 960,
    height: 556,
    minWidth: 700,
    minHeight: 432,
    titleBarStyle: 'hidden-inset',
    frame: false,
    show: false
  });
  //存放全局
  windows.push(window);
  //对话框偏移量，针对打开保存等弹出窗口
  window.setSheetOffset(38);
  //不可全屏
  window.setFullScreenable(false);
  // 加载应用的 index.html。
  window.loadURL(url.format({
    pathname: path.resolve(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  window.filename = '';
  window.on('close', event => {
    let result = app.leaveConfirm(window);
    if (result == 0) {
      event.preventDefault();
      app.save(window).then(function () {
        window.destroy();
      });
    }
    if (result == 1) {
      event.preventDefault();
    }
  });
  //当 window 被关闭，这个事件会被触发。
  window.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    let index = windows.findIndex(item => item == window);
    windows.splice(index, 1);
  });
  //确定新窗口的位置
  let activeWindow = BrowserWindow.getFocusedWindow();
  if (activeWindow) {
    let position = activeWindow.getPosition();
    window.setPosition(position[0] + 30, position[1] + 30);
  }
  //返回 Promise
  return new Promise(resolve => {
    //优雅的显示窗口
    window.once('ready-to-show', () => {
      window.show();
      resolve(window);
    });
  });
};

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', async() => {
  await app.loadPreference();
  await app.loadLocale();
  app.createMenu();
  app.createWindow();
  app.bindDevShortcuts();
  await sleep(3000);
  app.checkUpdate();
});

//创建主菜单
app.createMenu = async function () {
  return Menu.setApplicationMenu(await menu.createMain());
};

//弹出内容菜单
app.popupContextMenu = async function () {
  let contextMenu = await menu.createContextMenu();
  contextMenu.popup(this.getActiveWindow());
};

//绑定开发人员快捷键
app.bindDevShortcuts = function () {
  globalShortcut.register('CommandOrControl+Shift+Alt+I', () => {
    let window = this.getActiveWindow();
    if (!window) return;
    window.webContents.toggleDevTools();
  });
  globalShortcut.register('CommandOrControl+Shift+Alt+R', () => {
    let window = this.getActiveWindow();
    if (!window) return;
    window.webContents.reloadIgnoringCache();
  });
};

app.on('will-finish-launching', () => {
  //打开文件事件
  app.on('open-file', async(event, filename) => {
    event.preventDefault();
    await sleep(600);
    app.openFileInWindow(filename, await windows[0]);
  });
});

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在这文件，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。
  if (windows.length < 1) app.createWindow();
});

//获取当前活动窗口
app.getActiveWindow = function () {
  return BrowserWindow.getFocusedWindow();
};

//获取编辑器的值
app.getEditorValue = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  return await rendererVal(window.webContents, 'ctx.mditor.value');
};

//保存当前活动编辑的内容到指定文件
app.saveFile = async function (filename, window) {
  window = window || this.getActiveWindow();
  let content = await app.getEditorValue(window);
  if (utils.isNull(content)) return;
  window.filename = filename;
  window.isChanged = false;
  await fs.writeFile(filename, content);
  recent.add(filename);
  if (filename === this.PERFERENCE_FILE) this.dispatchPreference();
};

//保存
app.save = function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  if (window.filename) {
    return app.saveFile(window.filename, window);
  } else {
    return app.saveAs(window);
  }
};

//获取当前不含路径的文件名
app.getBaseName = function (window) {
  window = window || this.getActiveWindow();
  if (!window || !window.filename) return;
  return window.filename;
};

//另存为
app.saveAs = async function (window) {
  return new Promise(resolve => {
    window = window || this.getActiveWindow();
    if (!window) return;
    window.focus();
    dialog.showSaveDialog(window, {
      defaultPath: this.getBaseName(window),
      filters: FILE_FILTERS
    }, filename => {
      if (!filename) return;
      app.saveFile(filename, window).then(resolve);
    });
    window.focus();
  });
};

//离开检查
app.leaveConfirm = function (window) {
  window = window || this.getActiveWindow();
  if (!window || !window.isChanged) return 2;
  let locale = i18n.locale;
  return dialog.showMessageBox(window, {
    type: 'question',
    buttons: [locale.save, locale.cancel, locale.donNotSave],
    defaultId: 0,
    cancelId: 2,
    message: locale.confirmSave,
    detail: stp(locale.saveAlertDetail)({
      filename: window.filename || 'Untitled'
    })
  });
};

//在内容改变时
ipcMain.on('content-changed', function (event, info) {
  let window = BrowserWindow.fromId(info.windowId);
  window.isChanged = true;
});

//打开一个文件 
app.openFile = async function (filename, window) {
  let buffer = await fs.readFile(filename);
  let content = buffer.toString();
  window = window || this.getActiveWindow();
  if (!window) return;
  let result = app.leaveConfirm(window);
  if (result == 0) await app.save(window);
  if (result == 1) return;
  window.filename = filename;
  window.isChanged = false;
  window.webContents.send('file', {
    filename,
    content
  });
  recent.add(filename);
};

//尝试打打一个文档，如果当前窗口没有内容，不关联文件，则使用，否则创新窗口
app.openFileInWindow = async function (filename, window) {
  window = window || this.getActiveWindow();
  if (!window || window.filename || await app.getEditorValue(window)) {
    window = await app.createWindow();
  }
  this.openFile(filename, window);
};

//打开
app.open = async function (window) {
  return new Promise(resolve => {
    window = window || this.getActiveWindow();
    //这是不检查 window 是否存在，因为 openFileInWindow 发现没有窗口会创建
    dialog.showOpenDialog(window, {
      filters: FILE_FILTERS
    }, filenames => {
      if (!filenames || filenames.length < 1) return;
      app.openFileInWindow(filenames[0], window).then(resolve);
    });
  });
};

//在收到打开文件请求时，用于拖拽
ipcMain.on('open-file', function (event, info) {
  let window = BrowserWindow.fromId(info.windowId);
  app.openFile(info.filename, window);
});

//在收到弹出内容菜单时
ipcMain.on('contextmenu', function (event) {
  app.popupContextMenu();
});

//在保存一个附件时
ipcMain.on('save-image', async function (event, info) {
  let window = app.getActiveWindow();
  if (!window) return;
  let savePath = app.getPath('temp');
  if (window.filename) {
    savePath = `${path.dirname(window.filename)}/images`;
  }
  await mkdirp(savePath);
  info.name = `${md5(info.content).substr(8,16)}.${info.type.split('/')[1]}`;
  let imageFile = path.normalize(`${savePath}/${info.name}`);
  await fs.writeFile(imageFile, info.content);
  window.webContents.send('image', {
    filename: imageFile
  });
});

//导出 HTML
app.toHTML = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  dialog.showSaveDialog(window, {
    defaultPath: this.getBaseName(window),
    filters: [{
      name: 'HTML',
      extensions: ['htm', 'html']
    }]
  }, async filename => {
    if (!filename) return;
    let html = await convert.toHTML({
      title: this.getBaseName(window),
      content: await this.getEditorValue(window),
      border: true
    });
    await fs.writeFile(filename, html);
  });
};

//导出演示
app.toSlide = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  dialog.showSaveDialog(window, {
    defaultPath: this.getBaseName(window),
    filters: [{
      name: 'HTML',
      extensions: ['htm', 'html']
    }]
  }, async filename => {
    if (!filename) return;
    let html = await convert.toSlide({
      title: this.getBaseName(window),
      content: await this.getEditorValue(window)
    });
    await fs.writeFile(filename, html);
  });
};

//导出 PDF
app.toPDF = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  dialog.showSaveDialog(window, {
    defaultPath: this.getBaseName(window),
    filters: [{
      name: 'PDF',
      extensions: ['pdf']
    }]
  }, async filename => {
    if (!filename) return;
    let html = await convert.toPDF({
      title: this.getBaseName(window),
      content: await this.getEditorValue(window)
    });
    await fs.writeFile(filename, html);
  });
};

//导出 png
app.toImage = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  dialog.showSaveDialog(window, {
    defaultPath: this.getBaseName(window),
    filters: [{
      name: 'PNG',
      extensions: ['png']
    }]
  }, async filename => {
    if (!filename) return;
    let html = await convert.toImage({
      title: this.getBaseName(window),
      content: await this.getEditorValue(window)
    });
    await fs.writeFile(filename, html);
  });
};

//执行一条编辑器命令
app.execCommand = async function (command, window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  window.webContents.send('command', {
    name: command
  });
};

//检查更新
app.checkUpdate = async function (force) {
  let locale = i18n.locale;
  let window = await app.getActiveWindow();
  let info = await update.check(force);
  if (!info && !force) {
    return;
  } else if (!info) {
    return dialog.showMessageBox(window, {
      type: 'question',
      buttons: [locale.close],
      message: locale.checkUpdate,
      detail: locale.currentlyTheLatestVersion
    });
  }
  let result = dialog.showMessageBox(window, {
    type: 'question',
    buttons: [locale.goDownload, locale.donNotUpdate],
    defaultId: 0,
    cancelId: 1,
    message: `${locale.discoverNewVersion} ${info.version}`,
    detail: info.detail || locale.recommendDownload
  });
  if (result == 1) return;
  shell.openExternal(info.url);
};

//广播一个事件
app.dispatch = function (event, value) {
  windows.forEach(window => {
    window.webContents.send(event, value);
  });
};

//打开偏好设置
app.openPreference = async function () {
  this.PERFERENCE_FILE = await preference.getFile();
  this.openFileInWindow(this.PERFERENCE_FILE);
};

//加载偏好设置
app.loadPreference = async function () {
  global.preference = await preference.load();
  return global.preference;
};

//广播偏好设置
app.dispatchPreference = async function () {
  let configs = await this.loadPreference();
  this.dispatch('preference', configs);
};

//加载国际化资源
app.loadLocale = async function () {
  global.locale = await i18n.load();
  return global.locale;
};

//广播国际化资源
app.dispatchLocale = async function () {
  let locale = await this.loadLocale();
  this.dispatch('locale', locale);
};

//重置偏好设置
app.resetPreference = async function () {
  await preference.reset();
  await this.loadPreference();
  windows.forEach(window => {
    //electron 有 Bug 不 setTimeout 关不完
    setTimeout(() => {
      window.close();
    }, 0);
  });
  await sleep(300);
  windows.length = 0;
  this.openPreference();
};