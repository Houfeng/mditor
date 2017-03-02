const keyMaster = require('keymaster');

const Shortcut = module.exports = function (mditor) {
  self.mditor = mditor;
};

Shortcut.prototype.bind = function (key, cmd, allowDefault) {
  let mditor = self.mditor;
  //检查参数
  if (!key || !cmd) return;
  //检查 key filter 设定
  if (!self._keyFilterInited) {
    keyMaster.filter = event => {
      return event.target == mditor.$element;
    };
    self._keyFilterInited = true;
  }
  //检查命令是否存在
  if (!mditor.commands[cmd]) {
    throw new Error(`Command \`${cmd}\` not found.`);
  }
  key = key.replace('{cmd}', mditor.CMD);
  keyMaster(key, event => {
    event.code = event.keyCode; //将原始 keyCode 赋值给 code
    //禁用浏览器默认快捷键
    if (!allowDefault) {
      event.preventDefault();
      event.keyCode = 0;
    }
    mditor.execCommand(cmd, event);
    mditor.focus();
  });
};

Shortcut.prototype.unbind = function (key) {
  keyMaster.unbind(key);
};