/*istanbul ignore next*/'use strict';

var mokit = require('mokit');
var items = require('./items');

require('./index.less');

var Toolbar = new mokit.Component({
  template: require('./index.html'),
  props: {
    mditor: null
  },

  /*istanbul ignore next*/data: function data() {
    return {
      items: items.slice(0)
    };
  },
  /*istanbul ignore next*/onReady: function onReady() {
    this.bindCommands();
  },


  watch: {
    /*istanbul ignore next*/items: function items() {
      this.bindCommands();
    }
  },

  /*istanbul ignore next*/bindCommands: function bindCommands() {
    /*istanbul ignore next*/var _this = this;

    if (!this.mditor) return;
    this.items.forEach(function (item) {
      /*istanbul ignore next*/_this.mditor.removeCommand(item.name);
      /*istanbul ignore next*/_this.mditor.addCommand(item);
    });
  },
  /*istanbul ignore next*/isActive: function isActive(item) {
    return this.mditor && item.state && this.mditor[item.state];
  },
  /*istanbul ignore next*/exec: function exec(name, event) {
    event.preventDefault();
    this.mditor.execCommand(name, event);
  },
  /*istanbul ignore next*/getItem: function getItem(name) {
    return this.items.find(function (item) /*istanbul ignore next*/{
      return item.name === name;
    });
  },
  /*istanbul ignore next*/removeItem: function removeItem(name) {
    var index = this.items.findIndex(function (item) /*istanbul ignore next*/{
      return item.name === name;
    });
    return this.items.splice(index, 1);
  },
  /*istanbul ignore next*/addItem: function addItem(item) {
    this.items.push(item);
  },
  /*istanbul ignore next*/replaceItem: function replaceItem(name, newItem) {
    var index = this.items.findIndex(function (item) /*istanbul ignore next*/{
      return item.name === name;
    });
    var oldItem = this.items.splice(index, 1);
    this.items.splice(index, 0, newItem);
    return oldItem;
  }
});

module.exports = Toolbar;