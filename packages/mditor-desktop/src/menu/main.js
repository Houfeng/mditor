const pkg = require('../../package.json');
const app = require('electron').app;
const i18n = require('../i18n');

module.exports = async() => {
  let locale = i18n.locale;
  return {
    label: pkg.displayName,
    submenu: [{
        label: `${locale.about} ${pkg.displayName}`,
        role: 'about'
      },
      {
        label: `${locale.checkUpdate}...`,
        click() {
          app.checkUpdate(true);
        }
      },
      {
        type: 'separator'
      },
      {
        label: `${locale.preference}...`,
        click() {
          app.openPreference();
        }
      },
      {
        label: `${locale.resetPreference}...`,
        click() {
          app.resetPreference();
        }
      },
      {
        type: 'separator'
      },
      {
        label: locale.services,
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: locale.hide,
        role: 'hide'
      },
      {
        label: locale.hideOthers,
        role: 'hideothers'
      },
      {
        label: locale.unHide,
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: locale.quit,
        role: 'quit'
      }
    ]
  };
};