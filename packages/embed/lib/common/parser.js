/*istanbul ignore next*/'use strict';

var marked = require('marked');
var Prism = require('prismjs');

//language
require('prismjs/components/prism-java');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-php');
require('prismjs/components/prism-python');
require('prismjs/components/prism-json');
require('prismjs/components/prism-yaml.min');
require('prismjs/components/prism-perl');
require('prismjs/components/prism-go');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-fsharp');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-stylus');
require('prismjs/components/prism-less');
require('prismjs/components/prism-sass');
require('prismjs/components/prism-handlebars');
require('prismjs/components/prism-applescript');
require('prismjs/components/prism-actionscript');
require('prismjs/components/prism-aspnet');
require('prismjs/components/prism-basic');
require('prismjs/components/prism-c');
require('prismjs/components/prism-pascal');
require('prismjs/components/prism-vim');
require('prismjs/components/prism-swift');
require('prismjs/components/prism-objectivec');
require('prismjs/components/prism-sql');
require('prismjs/components/prism-scheme');
require('prismjs/components/prism-ruby');
require('prismjs/components/prism-smarty');
require('prismjs/components/prism-smalltalk');
require('prismjs/components/prism-rust');
require('prismjs/components/prism-r');
require('prismjs/components/prism-d');
require('prismjs/components/prism-dart');
require('prismjs/components/prism-coffeescript');
require('prismjs/components/prism-batch');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-lua');
require('prismjs/components/prism-livescript');
require('prismjs/components/prism-latex');
require('prismjs/components/prism-groovy');
require('prismjs/components/prism-graphql');
require('prismjs/components/prism-nginx');
require('prismjs/components/prism-erlang');
require('prismjs/components/prism-powershell');
require('prismjs/components/prism-makefile');
require('prismjs/components/prism-markdown');

//alias
Prism.languages.js = Prism.languages.javascript;
Prism.languages['c#'] = Prism.languages.csharp;
Prism.languages['f#'] = Prism.languages.fsharp;
Prism.languages.sh = Prism.languages.bash;
Prism.languages.md = Prism.languages.markdown;
Prism.languages.py = Prism.languages.python;
Prism.languages.yml = Prism.languages.yaml;
Prism.languages.rb = Prism.languages.ruby;

var Parser = function Parser(options) {
  options = options || {};
  this.options = options;
};

Parser.highlights = {};
Parser.marked = marked;
Parser.Prism = Prism;

//使标题解析 # 号可以无空格
marked.Lexer.rules.gfm.heading = marked.Lexer.rules.heading;
marked.Lexer.rules.tables.heading = marked.Lexer.rules.heading;

var renderer = new marked.Renderer();
Parser.renderer = renderer;
marked.setOptions({
  renderer: renderer, gfm: true, tables: true, breaks: true, //可行尾不加两空格直接换行
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  mangle: false,
  highlight: function /*istanbul ignore next*/highlight(code, lang, callback) {
    if (Parser.highlights[lang]) {
      var result = Parser.highlights[lang].parse(code, lang, callback);
      if (!callback) return result;
    } else if (Prism.languages[lang]) {
      var _result = Prism.highlight(code, Prism.languages[lang]);
      if (callback) return callback(null, _result);else return _result;
    } else {
      if (callback) //eslint-disable-line
        return callback(null, code);else return code;
    }
  }
});

Parser.prototype.parse = function (mdText, callback) {
  return marked(mdText, callback);
};

module.exports = Parser;