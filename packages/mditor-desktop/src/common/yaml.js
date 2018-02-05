const yaml = require('js-yaml');

function parseYaml(text) {
  try {
    return yaml.safeLoad(text, 'utf8');
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = parseYaml;