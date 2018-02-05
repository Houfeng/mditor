/*istanbul ignore next*/'use strict';

module.exports = [{
  name: 'undo',
  key: '{cmd}+z',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.undo();
  }
}, {
  name: 'redo',
  key: '{cmd}+shift+z',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.redo();
  }
}, {
  name: 'h2',
  key: 'shift+alt+2',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('## ');
  }
}, {
  name: 'h3',
  key: 'shift+alt+3',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('### ');
  }
}, {
  name: 'h4',
  key: 'shift+alt+4',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('#### ');
  }
}, {
  name: 'h5',
  key: 'shift+alt+5',
  /*istanbul ignore next*/handler: function handler() {
    this.editor.wrapSelectText('##### ');
  }
}];