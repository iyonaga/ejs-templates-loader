const loaderUtils = require('loader-utils');
const ejs = require('ejs');
const path = require('path');
const htmlmin = require('html-minifier');
const beautifyHtml = require('js-beautify').html;

module.exports = function(content) {
  this.cacheable && this.cacheable();

  const userOptions = loaderUtils.getOptions(this) || {};

  const defaultOptions = {};

  const options = Object.assign(defaultOptions, userOptions);

  options.client = false;
  options.filename = path.relative(process.cwd(), this.resourcePath);

  let template = ejs.render(content, options);

  if (options.minify) {
    template = htmlmin.minify(template, options.minifyOptions || {});
  }

  if (!options.minify && options.beautify) {
    template = beautifyHtml(template, options.beautifyOptions || {});
  }

  template = ejs.compile(template, {
    client: true
  });

  return 'module.exports = ' + template;
};
