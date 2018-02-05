const fs = require('fs');
const Promise = require('bluebird');

exports.writeFile = Promise.promisify(fs.writeFile);
exports.readFile = Promise.promisify(fs.readFile);
exports.unlink = Promise.promisify(fs.unlink);

exports.exists = async function exists(file) {
  return new Promise(resolve => {
    fs.exists(file, resolve);
  });
};