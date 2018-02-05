const pkg = require('../../package');
const store = require('../common/store');
const fetch = require('node-fetch');
const utils = require('ntils');
const os = require('os');
const i18n = require('../i18n');

const STORE_KEY = 'update';
const ONE_DAY_MS = 10800000; //3 个小时内只提示一次

exports.check = async function (force) {
  //如果不是强制检查，则对比上次更新时间
  if (!force) {
    let prevTime = await store.getItem(STORE_KEY);
    if (Date.now() - prevTime < ONE_DAY_MS) return;
  }
  //拉取服务器信息
  let response = await fetch(`${pkg.update.url}?locale=${i18n.localeName}`);
  let info = await response.json();
  if (info.version == pkg.version) return;
  if (utils.isArray(info.detail)) {
    info.detail = info.detail.join(os.EOL);
  }
  //记录本次更新时间
  store.setItem(STORE_KEY, Date.now());
  return info;
};