const shortcuts = require('shortcut-key');

shortcuts.filter = event => {
  return !!event.target;
};

const Shortcut = module.exports = function (mditor) {
  self.mditor = mditor;
};

Shortcut.prototype.bind = function (key, cmd, allowDefault) {
  let mditor = self.mditor;
  //检查参数
  if (!key || !cmd) return;
  key = key.replace('{cmd}', mditor.CMD);
  shortcuts(key, event => {
    if (event.target != mditor.editor.$element) return;
    //禁用浏览器默认快捷键
    if (!allowDefault) {
      event.preventDefault();
    }
    if (cmd instanceof Function) {
      cmd.call(mditor, event);
    } else {
      mditor.execCommand(cmd, event);
    }
    mditor.focus();
  });
};

Shortcut.prototype.unbind = function (key) {
  shortcuts.unbind(key);
};