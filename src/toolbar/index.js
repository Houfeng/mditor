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
    this.items.forEach(item => {
      this.mditor.addCommand(item);
    });
  },

  isActive(item) {
    return this.mditor && item.state && this.mditor[item.state];
  },

  exec(name, event) {
    this.mditor.execCommand(name, event);
  }

});

module.exports = Toolbar;