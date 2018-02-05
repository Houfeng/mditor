const mokit = require('mokit');

require('./index.less');

const Viewer = new mokit.Component({
  template: require('./index.html'),

  data() {
    return {
      html: '',
      alert: '预览区域'
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
        let beforeEvent = { value: this._value };
        this.$emit('beforeRender', beforeEvent);
        this.mditor.parser.parse(beforeEvent.value, (err, result) => {
          let afterEvent = { value: result || err };
          this.$emit('afterRender', afterEvent);
          this.html = afterEvent.value;
        });
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