var keymaster = require("keymaster");

/**
 * 定义快捷键管理 “类”
 **/
var Key = module.exports = function (mditor) {
	var self = this;
	self.mditor = mditor;
};

/**
 * 绑定一个快捷键
 **/
Key.prototype.bind = function (keyName, cmdName, allowDefault) {
	var self = this;
	var mditor = self.mditor;
	//检查参数
	if (!keyName || !cmdName) {
		return;
	}
	//检查 key filter 设定
	if (!self._keyFilterInited) {
		keymaster.filter = function (event) {
			return event.target == mditor.ui.editor[0];
		};
		self._keyFilterInited = true;
	}
	//检查命令是否存在
	if (!mditor.cmd[cmdName]) {
		throw 'command "' + cmdName + '" not found.';
	}
	keyName = keyName.replace('{cmd}', mditor.CMD);
	keymaster(keyName, function (event, handler) {
		event.code = event.keyCode;//将原始 keyCode 赋值给 code
		//禁用浏览器默认快捷键
		if (!allowDefault) {
			event.preventDefault();
			event.keyCode = 0;
		}
		//--
		mditor.execCommand(cmdName, event);
		mditor.focus();
	});
	return self;
};

/**
 * 解除绑定一个快捷键
 **/
Key.prototype.unbind = function (keyName) {
	var self = this;
	keymaster.unbind(keyName);
	return self;
};