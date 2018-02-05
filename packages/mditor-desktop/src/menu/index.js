const Menu = require('electron').Menu;
const Promise = require('bluebird');

exports.createMain = async function () {
  let template = await Promise.all([
    require('./file')(),
    require('./edit')(),
    require('./view')(),
    require('./window')(),
    require('./help')()
  ]);
  if (process.platform === 'darwin') {
    template.unshift(await require('./main')());
  }
  return Menu.buildFromTemplate(template);
};

exports.createContextMenu = async function () {
  return require('./contextmenu')();
};