const Promise = require('bluebird');

module.exports = function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    function onLoadEnd(e) {
      reader.removeEventListener('loadend', onLoadEnd, false);
      if (e.error) return reject(e.error);
      resolve(reader.result);
    }
    reader.addEventListener('loadend', onLoadEnd, false);
    try {
      reader.readAsDataURL(blob);
    } catch (err) {
      console.warn(err);
    }
  });
};