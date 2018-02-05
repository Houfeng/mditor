const app = require('electron').app;
const Promise = require('bluebird');
const fs = require('../common/fs');
const Parser = require('mditor').Parser;
const yaml = require('../common/yaml');

const DATA_PATH = app.getPath('userData');
const PREFERENCE_FILE = `${DATA_PATH}/preference.md`;

async function createFile() {
  let buffer = await fs.readFile(`${__dirname}/tmpl.md`)
  return fs.writeFile(PREFERENCE_FILE, buffer);
}

async function isExists() {
  return await fs.exists(PREFERENCE_FILE)
}

async function getFile() {
  if (!await isExists()) await createFile();
  return PREFERENCE_FILE;
}

async function load() {
  if (!await isExists()) return;
  let buffer = await fs.readFile(PREFERENCE_FILE);
  if (!buffer) return;
  let content = buffer.toString();
  let editorConfigs, shortcutConfigs;
  Parser.highlights['editor'] = {
    parse: function (code) {
      editorConfigs = code;
    }
  };
  Parser.highlights['shortcut'] = {
    parse: function (code) {
      shortcutConfigs = code;
    }
  };
  let parser = new Parser();
  parser.parse(content);
  Parser.highlights['editor'] = null;
  Parser.highlights['shortcut'] = null;
  return {
    editor: yaml(editorConfigs),
    shortcut: yaml(shortcutConfigs)
  }
}

async function reset() {
  if (!await isExists()) return;
  return fs.unlink(PREFERENCE_FILE);
}

exports.getFile = getFile;
exports.load = load;
exports.reset = reset;