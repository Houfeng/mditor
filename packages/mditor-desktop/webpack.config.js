const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const os = require('os');
const path = require('path');

const ENV = process.env.NODE_ENV || 'prod';
console.log(`${os.EOL}NODE_ENV:`, ENV);

const cssBundlePlugin = new ExtractTextPlugin('css/bundle.css');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'template',
  filename: 'index.html',
  template: './src/window/index.html'
});

const cleanPlugin = new CleanWebpackPlugin(['build/dist'], {
  verbose: false
});

const compressPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

// webpack plugins
const plugins = [
  htmlPlugin,
  cssBundlePlugin,
  cleanPlugin,
];
//if (ENV === 'prod') plugins.push(compressPlugin);

// webpack loaders
const loaders = [{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: [/node_modules/, /\.test\.js$/]
}, {
  test: /.*mokit.*\.js$/,
  loader: 'babel-loader'
}, {
  test: /mditor/,
  loader: 'babel-loader'
}, {
  test: /\.json$/,
  loader: 'json-loader'
}, {
  test: /\?raw$/,
  loader: 'raw-loader'
}, {
  test: /\.html$/,
  loader: 'raw-loader'
}, {
  test: /\.(png|jpg|gif)\?*.*$/,
  loader: 'url-loader?limit=8192&name=img/[hash].[ext]'
}, {
  test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
  loader: 'url-loader?limit=8192&name=font/[hash].[ext]'
}, {
  test: /\.less$/,
  loader: cssBundlePlugin.extract({
    use: ['css-loader', 'less-loader'],
    publicPath: '../'
  })
}, {
  test: /\.css$/,
  loader: cssBundlePlugin.extract({
    use: 'css-loader',
    publicPath: '../'
  })
}];

// webpack configs
module.exports = {
  context: __dirname,
  entry: {
    bundle: `./src/window/index.js`
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: loaders
  },
  plugins: plugins
};