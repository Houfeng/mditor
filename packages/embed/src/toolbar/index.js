const mokit = require('mokit');
const items = require('./items');

require('./index.less');

const Toolbar = new mokit.Component({
  template: require('./index.html'),
  props: {
    mditor: null
  },

  data() {
    return {
      items: items.slice(0)
    };
  },

  onReady() {
    this.bindCommands();
  },

  watch: {
    items() {
      this.bindCommands();
    }
  },

  bindCommands() {
    if (!this.mditor) return;
    this.items.forEach(item => {
      this.mditor.removeCommand(item.name);
      this.mditor.addCommand(item);
    });
  },

  isActive(item) {
    return this.mditor && item.state && this.mditor[item.state];
  },

  exec(name, event) {
    event.preventDefault();
    this.mditor.execCommand(name, event);
  },

  getItem(name) {
    return this.items.find(item => item.name === name);
  },

  removeItem(name) {
    let index = this.items.findIndex(item => item.name === name);
    return this.items.splice(index, 1);
  },

  addItem(item) {
    this.items.push(item);
  },

  replaceItem(name, newItem) {
    let index = this.items.findIndex(item => item.name === name);
    let oldItem = this.items.splice(index, 1);
    this.items.splice(index, 0, newItem);
    return oldItem;
  }

});

module.exports = Toolbar;