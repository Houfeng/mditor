const mokit = require('mokit');
const Parser = require('../common/parser');

require('./index.less');

const Viewer = new mokit.Component({
  template: require('./index.html'),

  data() {
    return {
      html: ''
    };
  },

  props: {
    mditor: null,
    value: {
      get() {
        return this._value;
      },
      set(value) {
        this._value = value;
        this.parser = this.parser || new Parser(this.mditor);
        this.html = this.parser.parse(this._value);
      }
    }
  },

  onClick(event) {
    event.preventDefault();
    let tag = event.target;
    if (tag.tagName == 'A') {
      let href = tag.getAttribute('href');
      if (href) window.open(href, '_blank');
    }
  }

});

module.exports = Viewer;