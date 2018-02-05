const Class = require('cify').Class;
const utils = require('ntils');

const Stack = new Class({
  constructor(item) {
    this.init(item);
  },
  init(item) {
    this.undoList = [item || {
      value: null
    }];
    this.redoList = [];
  },
  push(item) {
    if (this.last() === item) return;
    this.undoList.push(item);
  },
  last() {
    return this.undoList[this.undoList.length - 1];
  },
  undo() {
    if (this.undoList.length > 1) {
      let item = this.undoList.pop();
      if (utils.isNull(item) || utils.isNull(item.value)) return;
      this.redoList.push(item);
    }
    return this.last();
  },
  redo() {
    let item = this.redoList.pop();
    if (utils.isNull(item) || utils.isNull(item.value)) return;
    this.undoList.push(item);
    return item;
  }
});

module.exports = Stack;