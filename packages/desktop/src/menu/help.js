const shell = require('electron').shell;
const pkg = require('../../package');
const i18n = require('../i18n');

module.exports = async() => {
  let locale = i18n.locale;
  return {
    label: locale.help,
    role: 'help',
    submenu: [{
      label: `${pkg.displayName} ${locale.homepage}`,
      click() {
        shell.openExternal(`${pkg.homepage}?locale=${i18n.localeName}`);
      }
    }, {
      label: locale.umlDoc,
      click() {
        shell.openExternal(`${pkg.homepage}/doc/uml.html?locale=${i18n.localeName}`);
      }
    }, {
      label: locale.slideDoc,
      click() {
        shell.openExternal(`${pkg.homepage}/doc/slide.html?locale=${i18n.localeName}`);
      }
    }]
  };
};