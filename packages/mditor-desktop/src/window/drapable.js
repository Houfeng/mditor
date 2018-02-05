const EventEmitter = require('mokit').EventEmitter;

module.exports = function (element) {
  let eventer = new EventEmitter(element);
  eventer.on('dragover', function (event) {
    event.preventDefault();
  });
  eventer.on('drop', function (event) {
    event.preventDefault();
    let files = [].slice.call(event.dataTransfer.files);
    if (!files || files.length < 1) return;
    let firstFile = files[0];
    if (firstFile.type.startsWith('text/')) {
      ctx.openFile(firstFile.path);
    } else {
      let imageFiles = files.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length < 1) return;
      ctx.insertImage(imageFiles.map(item => item.path));
    }
  });
};