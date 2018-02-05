const webdriver = require('selenium-webdriver');
const phantomjsPath = require('phantomjs-prebuilt').path;
const pkg = require('../package.json');

const capabilities = webdriver.Capabilities.phantomjs();
capabilities.set("phantomjs.binary.path", phantomjsPath);
const driver = new webdriver.Builder().
withCapabilities(capabilities).
build();

driver.manage().window().maximize();

driver._get = driver.get;
driver.get = function (path) {
  path = path || '/';
  return this._get(`http://${pkg.dev.host}:${pkg.dev.port}/#!${path}`);
};

global.driver = driver;
global.by = webdriver.By;
global.until = webdriver.until;

by.text = function (text) {
  return by.xpath('//*[text()="' + text + '"]');
};