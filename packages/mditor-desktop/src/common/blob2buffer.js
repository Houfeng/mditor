const Promise = require('bluebird');

module.exports = function blobToBuffer(blob) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    function onLoadEnd(e) {
      reader.removeEventListener('loadend', onLoadEnd, false);
      if (e.error) return reject(e.error);
      resolve(Buffer.from(reader.result));
    }
    reader.addEventListener('loadend', onLoadEnd, false);
    try {
      reader.readAsArrayBuffer(blob);
    } catch (err) {
      console.warn(err);
    }
  });
};