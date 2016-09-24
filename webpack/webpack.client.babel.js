import IS_DEV from '../src/server/utils/isDev';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StatusPlugin from './status-webpack-plugin';

const hash = IS_DEV ? '[name]' : '[name]-[chunkhash]';
const root = process.cwd();
const styleLoaders = ['css?minimize&sourceMap&importLoaders=5', 'postcss', 'sass?sourceMap'];
const sassStyleLoaders = ['css?minimize&sourceMap&importLoaders=5', 'postcss', 'sass?indentedSyntax=sass&sourceMap'];
const prefetches = ['react', 'redux'];

var plugins = [
    new webpack.SourceMapDevToolPlugin('[file].map', "\n//# sourceMappingURL=///static/[url]"),
    new AssetsPlugin({filename: 'asset-manifest.json', path: path.join(root, '/build/static')}),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(['build/static'], {'root': path.join(__dirname, '../'), 'verbose': false}),
    new webpack.optimize.CommonsChunkPlugin('vendor', hash + '.js', (module) => {
        return module.resource && module.resource.indexOf(path.join(root, 'node_modules')) === 0;
    }),
    new webpack.optimize.CommonsChunkPlugin({names: ["vendor"]}), //our webpack manifest is bundled in vendor, not splitting out until vendor bundle stable
    new webpack.DefinePlugin({
        'IS_BROWSER': true,
        'IS_DEV': IS_DEV,
        'process.env.NODE_ENV': JSON.stringify(IS_DEV ? 'development' : 'production')
    }),
    ...prefetches.map((i) => new webpack.PrefetchPlugin(i)),
    ...(IS_DEV ? [
            new webpack.HotModuleReplacementPlugin(),
            new StatusPlugin()
        ] : [
            new webpack.optimize.MinChunkSizePlugin({minChunkSize: 30000}),
            new webpack.ContextReplacementPlugin(/.*$/, /NEVER_MATCH^/), // ignore dynamic requires
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new ExtractTextPlugin(hash + '.css', {allChunks: true}),
            new webpack.optimize.UglifyJsPlugin(require('./uglifyjs.json'))
        ]
    )
];

module.exports = {
    devtool: IS_DEV ? 'cheap-module-eval-source-map' : 'source-map',
    context: path.join(root, 'src'),
    entry: {
        main: IS_DEV ? [
            'webpack-hot-middleware/client?path=http://localhost:8081/__webpack_hmr',
            './client/js/index.js',
            './client/scss/index.sass'
        ] : [
            './client/js/index.js',
            './client/scss/index.sass'
        ]
    },
    output: {
        path: path.join(root, '/build/static'),
        publicPath: IS_DEV ? 'http://localhost:8081/static/' : '/static/', // needed so fonts can be found
        filename: hash + '.js',
        chunkFilename: hash + '.js'
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: path.join(root, 'src'),
            query: {
                cacheDirectory: IS_DEV,
                babelrc: false,
                presets: [ //.babelrc is used for server
                    'react',
                    'es2015',
                    ...(IS_DEV) ? ['react-hmre'] : []
                ],
                plugins: [
                    'transform-object-assign',
                    'transform-object-rest-spread',
                    ...(IS_DEV) ? [] : [
                        'transform-react-remove-prop-types',
                        'transform-react-constant-elements',
                        'transform-react-inline-elements'
                    ]
                ]
            }},
            {
                test: /\.json$/, loader: 'json'
            },
            {
                test: /\.(jpe?g|png|gif)([\?]?.*)$/,
                include: [path.join(root, 'src/client')],
                loaders: [
                    'url?limit=100',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)([\?]?.*)$/,
                loader: 'file?name=[name].[ext]' //name fonts to enable de-dup shared header/footer fonts
            },
            {
                test: /.scss$/,
                loader: IS_DEV ? 'style!' + styleLoaders.join('!') : ExtractTextPlugin.extract('style', styleLoaders)
            },
            {
                test: /.sass$/,
                loader: IS_DEV ? 'style!' + sassStyleLoaders.join('!') : ExtractTextPlugin.extract('style', sassStyleLoaders)
            },

        ]
    },
    postcss: function () {
        return [
            require('autoprefixer')({browsers: ['last 2 versions']})
        ];
    },
    resolve: {
        extensions: ['', '.js', '.sass', '.scss', '.css'],
        root: [path.join(__dirname, '../src')]
    }
};
