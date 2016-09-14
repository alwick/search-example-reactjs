var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var apiServer = require( './make-api-server-config' );

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = function(options) {
  options.lint = fs.existsSync(__dirname + '/../.eslintrc') && options.lint !== false;

  var localIdentName = options.production ? '[hash:base64]' : '[path]-[local]-[hash:base64:5]';
  var cssLoaders = 'style!css?localIdentName=' + localIdentName + '!autoprefixer?browsers=last 2 versions';
  var scssLoaders = cssLoaders + '!sass';
  var sassLoaders = scssLoaders + '?indentedSyntax=sass';
  var lessLoaders = cssLoaders + '!less';

  if (options.production) {
    cssLoaders = extractForProduction(cssLoaders);
    sassLoaders = extractForProduction(sassLoaders);
    scssLoaders = extractForProduction(scssLoaders);
    lessLoaders = extractForProduction(lessLoaders);

  }
  else {
    // start server
    apiServer({PORT: 9001});
  }

  var jsLoaders = ['babel'];

  return {
    entry: options.production ? './src/client/index.jsx' : [
      'webpack-dev-server/client?http://localhost:9000',
      'webpack/hot/only-dev-server',
      './src/client/index.jsx'
    ],
    devServer: {
      hot: true,
      host: 'localhost',
      port: 9000,
      historyApiFallback: true,
      proxy: {
        '/api/*': 'http://localhost:9001',
      }
    },
    debug: !options.production,
    devtool: options.devtool,
    output: {
      path: options.production ? './dist' : './build',
      publicPath: options.production ? '' : 'http://localhost:9000/',
      filename: options.production ? 'app.[hash].js' : 'app.js'
    },
    module: {
      preLoaders: options.lint ? [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint'
        }
      ] : [],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: jsLoaders
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: options.production ? jsLoaders : ['react-hot'].concat(jsLoaders)
        },
        {
          test: /\.css$/,
          loader: cssLoaders
        },
        {
          test: /\.sass$/,
          loader: sassLoaders
        },
        {
          test: /\.scss$/,
          loader: scssLoaders
        },
        {
          test: /\.less$/,
          loader: lessLoaders
        },
        {
          test: /\.png$/,
          loader: "url?limit=100000&mimetype=image/png"
        },
        {
          test: /\.svg$/,
          loader: "url?limit=100000&mimetype=image/svg+xml"
        },
        {
          test: /\.gif$/,
          loader: "url?limit=100000&mimetype=image/gif"
        },
        {
          test: /\.jpg$/,
          loader: "file"
        },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.sass', '.scss', '.less', '.css']
    },
    plugins: options.production ? [
      // Important to keep React file size down
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin("app.[hash].css"),
      new HtmlWebpackPlugin({
        template: './conf/tmpl.html',
        production: true
      })
    ] : [
      new HtmlWebpackPlugin({
        template: './conf/tmpl.html'
      })
    ]
  };
};
