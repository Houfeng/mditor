/*istanbul ignore next*/'use strict';

var mokit = require('mokit');

require('./index.less');

var Viewer = new mokit.Component({
  template: require('./index.html'),

  /*istanbul ignore next*/data: function data() {
    return {
      html: '',
      alert: '预览区域'
    };
  },


  props: {
    mditor: null,
    value: {
      /*istanbul ignore next*/get: function get() {
        return this._value;
      },
      /*istanbul ignore next*/set: function set(value) {
        /*istanbul ignore next*/var _this = this;

        this._value = value;
        var beforeEvent = { value: this._value };
        this.$emit('beforeRender', beforeEvent);
        this.mditor.parser.parse(beforeEvent.value, function (err, result) {
          var afterEvent = { value: result || err };
          /*istanbul ignore next*/_this.$emit('afterRender', afterEvent);
          /*istanbul ignore next*/_this.html = afterEvent.value;
        });
      }
    }
  },

  /*istanbul ignore next*/onClick: function onClick(event) {
    event.preventDefault();
    var tag = event.target;
    if (tag.tagName == 'A') {
      var href = tag.getAttribute('href');
      if (href) window.open(href, '_blank');
    }
  }
});

module.exports = Viewer;