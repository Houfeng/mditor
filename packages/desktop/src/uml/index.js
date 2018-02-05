const encodeer = require('./encodeer');
const fetch = global.fetch ? global.fetch : require('node-fetch');
const Class = require('cify').Class;

const UML_ERROR = /syntax error/i;

function createAlert(message, detail) {
  return `<div class="highlight-alert">${message}</div>${detail}`;
}

const UMLParser = new Class({

  //http://www.plantuml.com/plantuml/svg/
  //http://www.plantuml.com/plantuml/png/
  parse(code, lang, done) {
    if (!code) return done(null, '');
    let params = unescape(encodeURIComponent(code));
    let url = `http://www.plantuml.com/plantuml/svg/${encodeer.encode64(encodeer.zipDeflate(params, 9))}`;
    //发生错误时也不用 done 的第一个参数传递，
    //这样不让 mditor embed 认为是文档解析错误了
    //让 err 作为正确的结果返回，错误将显示在「图形」位置
    fetch(url).then((res, err) => {
      if (err) done(null, createAlert('发生了错误。', JSON.stringify(err)));
      res.text().then(result => {
        if (UML_ERROR.test(result)) {
          done(null, createAlert('语法错误，已显示原代码。', code));
        };
        done(null, result);
      });
    }).catch(err => {
      done(null, createAlert('暂时无法渲染 UML 图形，请检查网络设置。', code));
    });
  }

});

module.exports = UMLParser;