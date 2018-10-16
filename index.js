const loaderUtils = require('loader-utils');
const ejs = require('ejs');
const path = require('path');
const beautifyHtml = require('js-beautify').html;

module.exports = function(content) {
  this.cacheable && this.cacheable();

  const userOptions = loaderUtils.getOptions(this) || {};
  const defaultOptions = {};
  const options = Object.assign(defaultOptions, userOptions);

  options.client = false;
  options.filename = path.relative(process.cwd(), this.resourcePath);

  let match;
  let dependency;
  let dependencies = [];
  const regex = /\s*include(\s|\(['"])(.*?)(\s|['"]).*/gim;

  while ((match = regex.exec(content))) {
    dependency = path.join(path.dirname(this.resourcePath), `${match[2]}.ejs`);
    dependencies.push(dependency);
  }

  dependencies.forEach(path => {
    this.addDependency(path);
  });

  let template = ejs.render(content, options);

  if (options.beautify) {
    template = beautifyHtml(template, options.beautifyOptions || {});
  }

  template = ejs.compile(template, {
    client: true
  });

  return 'module.exports = ' + template;
};
