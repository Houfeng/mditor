const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const os = require('os');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'prod';
console.log(`${os.EOL}NODE_ENV:`, ENV);

const cssBundlePlugin = new ExtractTextPlugin(`css/mditor${ENV == 'prod' ? '.min' : ''}.css`);

const htmlPlugin = new HtmlWebpackPlugin({
  title: pkg.name,
  filename: 'index.html',
  template: './src/assets/index.ejs',
  inject: false
});

const cleanPlugin = new CleanWebpackPlugin(['dist'], {
  verbose: false
});

const compressPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

const bannerPlugin = new webpack.BannerPlugin(`${pkg.displayName} version ${pkg.version}
Homepage: ${pkg.homepage}`);

// webpack plugins
const plugins = [
  htmlPlugin,
  cssBundlePlugin,
  bannerPlugin,
];
if (ENV === 'prod') plugins.push(compressPlugin);

// webpack loaders
const loaders = [{
  test: /\.js$/,
  loader: 'babel',
  exclude: [/node_modules/, /\.test\.js$/]
}, {
  test: /.*mokit.*\.js$/,
  loader: 'babel'
}, {
  test: /\.json$/,
  loader: 'json',
}, {
  test: /\?raw$/,
  loader: 'raw'
}, {
  test: /\.html$/,
  loader: 'raw'
}, {
  test: /\.(png|jpg|gif)\?*.*$/,
  loader: 'url?limit=8192&name=img/[hash].[ext]'
}, {
  test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
  loader: 'url?limit=8192&name=font/[hash].[ext]'
}, {
  test: /\.less$/,
  loader: cssBundlePlugin.extract('css!less', {
    publicPath: '../'
  })
}, {
  test: /\.css$/,
  loader: cssBundlePlugin.extract('css', {
    publicPath: '../'
  })
}];

// webpack configs
module.exports = {
  entry: {
    mditor: `./src/client`
  },
  output: {
    path: './dist/',
    filename: `js/[name]${ENV == 'prod' ? '.min' : ''}.js`
  },
  devtool: 'source-map',
  module: {
    loaders: loaders
  },
  plugins: plugins
};