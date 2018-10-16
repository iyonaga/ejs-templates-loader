# ejs-templates-loader
EJS loader module for webpack

## Installation

```shell
npm install --save ejs-templates-loader
```

## Usage

### webpack.config.js

```js
module: {
  rules: [
    {
      test: /\.ejs$/,
      use: {
        loader: 'ejs-templates-loader',
        options: {}
      }
    }
  ]
},

plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.ejs'
  })
]
```

### Advanced configuration example



#### webpack.config.js
```js
module: {
  rules: [
    {
      test: /\.ejs$/,
      use: {
        loader: 'ejs-templates-loader',
        options: {
          delimiter: '$'
        }
      }
    }
  ]
},

plugins: [
  new HtmlWebpackPlugin({
    title: 'title',
    filename: 'index.html',
    template: './index.ejs'
  })
]
```

#### index.ejs
```html
<！DOCTYPE html>
<html>
  <head>
    <title><％= htmlWebpackPlugin.options.title ％></title>
  </head>
  <body>
    <$- include('./_header', {foo: 'foo'}) $>
    <img src="<％= require('./img/image.jpg') ％>">
    <$- include _footer $>
  </body>
</html>
```

## Options
- `delimiter` — Character to use with angle brackets for open/close (default: `"%"`)

- `beautify` — Enable/Disable beautification (default: `false`)

- `beautifyOptions` See [js-beautify#options](https://github.com/beautify-web/js-beautify#options) (default: `{}`)
