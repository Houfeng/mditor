const app = require('electron').app;
const i18n = require('../i18n');

module.exports = async() => {
  let locale = i18n.locale;
  return {
    label: locale.view,
    submenu: [{
        label: locale.toggleSplit,
        accelerator: 'Shift+Alt+S',
        click() {
          app.execCommand('toggleSplit');
        }
      },
      {
        label: locale.togglePreview,
        accelerator: 'Shift+Alt+V',
        click() {
          app.execCommand('togglePreview');
        }
      }
    ]
  };
};