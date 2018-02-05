const pdf = require('html-pdf');
const Promise = require('bluebird');
const fs = require('../common/fs');
const path = require('path');
const stp = require('stp');
const UMLParser = require('../uml');
const yaml = require('../common/yaml');

const Parser = require('mditor').Parser;
Parser.highlights['uml'] = new UMLParser();

const parser = Promise.promisifyAll(new Parser());

exports.toHTML = async function (opts) {
  if (!opts) return;
  opts.title = opts.title || 'Untitled';
  opts.style = opts.style || '';
  opts.content = opts.content || '';
  let styleFile = require.resolve('mditor/dist/css/mditor.min.css');
  opts.style += (await fs.readFile(styleFile)).toString();
  opts.style += (await fs.readFile(`${__dirname}/html.css`)).toString();
  if (opts.border) {
    opts.style += (await fs.readFile(`${__dirname}/border.css`)).toString();
  }
  opts.content = await parser.parseAsync(opts.content);
  let tmpl = (await fs.readFile(`${__dirname}/tmpl.html`)).toString();
  let fn = stp(tmpl);
  return fn(opts);
};

exports.toPDF = async function (opts) {
  let html = await this.toHTML(opts);
  return new Promise((resolve, reject) => {
    pdf.create(html, {
      format: 'A4',
      border: '1cm',
      type: 'pdf'
    }).toBuffer(function (err, buffer) {
      if (err) return reject(err);
      resolve(buffer);
    });
  });
};

exports.toImage = async function (opts) {
  opts.style = 'body{padding:15px;background-color: #fff;}';
  let html = await this.toHTML(opts);
  return new Promise((resolve, reject) => {
    pdf.create(html, {
      border: '1cm',
      width: '900px',
      type: opts.type || 'png'
    }).toBuffer(function (err, buffer) {
      if (err) return reject(err);
      resolve(buffer);
    });
  });
};

exports.toSlide = async function (opts) {
  if (!opts) return;
  opts.title = opts.title || 'Untitled';
  opts.content = opts.content || '';
  let parts = opts.content.split(/`{1,3}slide([\s\S]*?)`{1,3}/).slice(1);
  opts.items = [];
  for (let i = 0; i < parts.length; i += 2) {
    let meta = yaml(parts[i]) || {};
    let body = await parser.parseAsync(parts[i + 1]);
    opts.items.push(`<script 
    bgcolor="${meta.bgcolor||''}" 
    align="${meta.align||''}" 
    style="${meta.style||''}" 
    effect="${meta.effect||''}"
    type="text/slide">
    ${body||';-D ...'}
    </script>`);
  }
  let tmpl = (await fs.readFile(`${__dirname}/slide.html`)).toString();
  let fn = stp(tmpl);
  return fn(opts);
};