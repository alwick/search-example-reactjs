const webpack = require('webpack');
const path = require('path');

require('mocha');
require('karma-webpack');
require('karma-sourcemap-loader');
require('karma-mocha-reporter');
require('karma-mocha');

const styleLoaders = ['css?minimize&sourceMap&importLoaders=5', 'postcss', 'sass?sourceMap'];
const sassStyleLoaders = ['css?minimize&sourceMap&importLoaders=5', 'postcss', 'sass?indentedSyntax=sass&sourceMap'];

module.exports = function (config) {
    config.set({
        browsers: ['jsdom'],
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            'tests.webpack.js' //just load this file
        ],
        globals: {},
        plugins: [
            //'karma-chrome-launcher',
            new webpack.DefinePlugin({
                'process.env.NODE_CONFIG_DIR': '../config',
                'NODE_CONFIG_DIR': '../config'
            }),
            'karma-jsdom-launcher',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-mocha-reporter',
        ],
        preprocessors: {
            // 'karma.mocha_env.js': ['webpack'],
            'tests.webpack.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['mocha', 'coverage'], //report results in this format
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            externals: {
                'cheerio': 'window',
                'react/addons': true, // important!!
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_CONFIG_DIR': '../config'
                })
            ],
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                    {test: /\.json$/, loader: 'json-loader'},
                    {
                        test: /.scss$/,
                        loader: 'style!' + styleLoaders.join('!')
                    },
                    {
                        test: /.sass$/,
                        loader: 'style!' + sassStyleLoaders.join('!')
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|svg)([\?]?.*)$/,
                        loader: 'file?name=[name].[ext]' //name fonts to enable de-dup shared header/footer fonts
                    },
                    {
                        test: /\.(jpe?g|png|gif)$/i,
                        loaders: [
                            'url?limit=100&hash=sha512&digest=hex&name=images/[hash].[ext]',
                            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                        ]
                    }
                ],
                postLoaders: [{ //delays coverage til after tests are run, fixing transpiled source coverage error
                    test: /\.js$/,
                    //include: path.resolve('src'),
                    exclude: /(__specs__|node_modules|test)/,
                    loader: 'istanbul-instrumenter'
                }],
            },
            postcss: function () {
                return [
                    require('autoprefixer')({browsers: ['last 2 versions']})
                ];
            },
            resolve: {
                extensions: ['', '.js', '.scss', '.sass', '.css'],
                root: [path.join(__dirname, '../src/client')]
            },
            node: {
                console: true,
                fs: 'empty'
            }
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
        mochaReporter: {
            colors: {
                success: 'blue',
                info: 'bgGreen',
                warning: 'cyan',
                error: 'bgRed'
            }
        },
        coverageReporter: {
            type: 'html', //produces a html document after code is run
            dir: '../reports/coverage/client', //path to created html doc
            check: {
                global: {
                    statements: 80,
                    branches: 60,
                    functions: 80,
                    lines: 80
                }
            }
        }
    });
};