const app = require('electron').app;
const store = require('../common/store');

const STORE_KEY = 'recent';
const MAX_NUM = 10;

exports.add = async function (filename) {
  let list = (await store.getItem(STORE_KEY)) || [];
  let index = list.findIndex(item => item === filename);
  if (index > -1) list.splice(index, 1);
  list.unshift(filename);
  list = list.slice(0, MAX_NUM);
  await store.setItem(STORE_KEY, list);
  app.addRecentDocument(filename);
  await app.createMenu();
};

exports.getItems = async function () {
  return (await store.getItem(STORE_KEY)) || [];
};

exports.clear = async function () {
  await store.removeItem(STORE_KEY);
  app.clearRecentDocuments();
  await app.createMenu();
};