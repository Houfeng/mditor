module.exports = [{
  name: 'undo',
  key: '{cmd}+z',
  handler() {
    this.editor.undo();
  }
}, {
  name: 'redo',
  key: '{cmd}+shift+z',
  handler() {
    this.editor.redo();
  }
}, {
  name: 'h2',
  key: 'shift+alt+2',
  handler() {
    this.editor.wrapSelectText('## ');
  }
}, {
  name: 'h3',
  key: 'shift+alt+3',
  handler() {
    this.editor.wrapSelectText('### ');
  }
}, {
  name: 'h4',
  key: 'shift+alt+4',
  handler() {
    this.editor.wrapSelectText('#### ');
  }
}, {
  name: 'h5',
  key: 'shift+alt+5',
  handler() {
    this.editor.wrapSelectText('##### ');
  }
}];