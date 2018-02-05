const app = require('electron').app;
const yaml = require('../common/yaml');
const fs = require('../common/fs');

exports.getName = async function () {
  this.localeName = app.getLocale().toLowerCase();
  return this.localeName;
};

exports.load = async function () {
  let name = await this.getName();
  let localeFile;
  let localeFiles = [
    `${__dirname}/locales/${name}.yml`,
    `${__dirname}/locales/${name.split('-')[0]}.yml`,
    `${__dirname}/locales/en.yml`
  ];
  for (let i = 0; i < localeFiles.length; i++) {
    if (await fs.exists(localeFiles[i])) {
      localeFile = localeFiles[i];
      break;
    }
  }
  let buffer = await fs.readFile(localeFile);
  this.locale = yaml(buffer.toString());
  return this.locale;
};