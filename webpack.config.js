const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'public'),
};

const resolve = {
  extensions: ['.js', '.jsx'],
};

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(paths.public, 'html', 'index.html'),
    favicon: path.join(paths.public, 'images', 'favicon-check-circle-o.ico'),
  }),
  new ExtractTextPlugin('css/[name].css'),
];

const rules = [
  {
    test: /\.(png|ico|svg|jpg|gif)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: 'images/[hash].[ext]',
      },
    }],
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [{
      loader: 'url-loader',
      options: {
        name: 'fonts/[hash].[ext]',
      },
    }],
  }, {
    test: /\.(eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: 'fonts/[hash].[ext]',
      },
    }],
  }, {
    test: /\.(scss|css)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader!sass-loader',
    }),
  }, {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
    },
  }, {
    test: /\.(html)$/,
    use: ['html-loader?interpolate'],
  },
];


const common = {
  entry: {
    app: path.join(paths.src, 'index.js'),
    vendor: ['jquery', 'bootstrap'],
  },
  output: {
    path: paths.dist,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/',
  },
  resolve,
  plugins,
  module: {
    rules,
  },
  context: paths.src,
  devServer: {
    compress: true,
    inline: true,
    historyApiFallback: true,
    port: 5001,
  },
};

module.exports = common;
