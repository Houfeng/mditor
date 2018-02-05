const app = require('electron').app;
const fs = require('../common/fs');

const DATA_PATH = app.getPath('userData');

exports.setItem = async function (key, value) {
  let storeFile = `${DATA_PATH}/${key}.json`;
  try {
    await fs.writeFile(storeFile, JSON.stringify(value));
  } catch (err) {
    console.error('setItem', err);
  }
};

exports.getItem = async function (key) {
  let storeFile = `${DATA_PATH}/${key}.json`;
  try {
    let buffer = await fs.readFile(storeFile);
    return JSON.parse(buffer.toString());
  } catch (err) {
    console.error('getItem', err);
  }
};

exports.removeItem = async function (key) {
  let storeFile = `${DATA_PATH}/${key}.json`;
  try {
    await fs.unlink(storeFile);
  } catch (err) {
    console.error('removeItem', err);
  }
};