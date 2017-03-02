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
  }

});

module.exports = Viewer;