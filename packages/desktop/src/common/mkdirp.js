const mkdirp = require('mkdirp');
const Promise = require('bluebird');

module.exports = function (path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, err => {
      if (err) return reject(err);
      resolve(path);
    });
  });
};