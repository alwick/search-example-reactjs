import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.client.babel';

console.log( webpackConfig.output.publicPath );

const app = express();
const PORT = 8081;
const webpackCompiler = webpack(webpackConfig);
const serverOptions = {
    contentBase: 'http://localhost:' + PORT,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
};

app.use(webpackDevMiddleware(webpackCompiler, serverOptions));
app.use(webpackHotMiddleware(webpackCompiler));

const httpServer = app.listen(PORT, () => {
    console.log(`HMR server on http://localhost:${PORT} [${app.settings.env}]`);
});

process.on('SIGTERM', () => {
    httpServer.close(() => {
        process.exit(0);
    });
});
