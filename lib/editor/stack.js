/*istanbul ignore next*/'use strict';

var Class = require('cify').Class;
var utils = require('ntils');

var Stack = new Class({
  /*istanbul ignore next*/constructor: function constructor(item) {
    this.init(item);
  },
  /*istanbul ignore next*/init: function init(item) {
    this.undoList = [item || {
      value: null
    }];
    this.redoList = [];
  },
  /*istanbul ignore next*/push: function push(item) {
    if (this.last() === item) return;
    this.undoList.push(item);
  },
  /*istanbul ignore next*/last: function last() {
    return this.undoList[this.undoList.length - 1];
  },
  /*istanbul ignore next*/undo: function undo() {
    if (this.undoList.length > 1) {
      var item = this.undoList.pop();
      if (utils.isNull(item) || utils.isNull(item.value)) return;
      this.redoList.push(item);
    }
    return this.last();
  },
  /*istanbul ignore next*/redo: function redo() {
    var item = this.redoList.pop();
    if (utils.isNull(item) || utils.isNull(item.value)) return;
    this.undoList.push(item);
    return item;
  }
});

module.exports = Stack;