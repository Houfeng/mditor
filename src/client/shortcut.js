const shortcuts = require('shortcut-key');
const utils = require('ntils');

shortcuts.filter = event => {
  return !!event.target;
};

const Shortcut = module.exports = function (mditor) {
  utils.defineFreezeProp(this, 'mditor', mditor);
};

Shortcut.prototype._inRegion = function (target, owner) {
  if (!target) return false;
  owner = owner || this.mditor.editor.$element;
  return (target === owner) || this._inRegion(target.parentNode, owner);
};

Shortcut.prototype.bind = function (key, cmd, allowDefault, owner) {
  let mditor = this.mditor;
  //检查参数
  if (!key || !cmd) return;
  key = key.replace('{cmd}', mditor.CMD);
  shortcuts(key, event => {
    if (!this._inRegion(event.target, owner)) return;
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