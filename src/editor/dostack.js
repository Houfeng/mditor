const Class = require('cify').Class;
const utils = require('ntils');

const Stack = new Class({
  constructor(value) {
    this.init(value);
  },
  init(value) {
    this.undoList = [value || ''];
    this.redoList = [];
  },
  change(value) {
    if (this.last() === value) return;
    this.undoList.push(value);
  },
  last() {
    return this.undoList[this.undoList.length - 1];
  },
  undo() {
    if (this.undoList.length > 1) {
      let value = this.undoList.pop();
      if (utils.isNull(value)) return;
      this.redoList.push(value);
    }
    return this.last();
  },
  redo() {
    let value = this.redoList.pop();
    if (utils.isNull(value)) return;
    this.undoList.push(value);
    return value;
  }
});

module.exports = Stack;