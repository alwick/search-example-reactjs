import path from 'path';
import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import cacheResponseDirective from 'express-cache-response-directive';
import memwatch from 'memwatch-next';
import bodyParser from 'body-parser';
import root from './routes/root';
import api from './routes/api/index';
import IS_DEV from './utils/isDev';

const app = express();

if (IS_DEV) {
    require('piping')(); // eslint-disable-line
}

app.use(compression());
app.use('/favicon', favicon(path.join(__dirname, './components/favicon.ico')));
app.use('/static', express.static(path.join(__dirname, '../../build/static'), {
    maxAge: '365d'
}));
app.use(cacheResponseDirective());

app.use((req, res, next) => {
    res.cacheControl('no-store');
    next();
});

memwatch.on('leak', (info) => {
    console.log(info, 'Memory leak was detected');
});

// Logging incoming request
app.use((req, res, next) => {
    console.log({
        requestPath: req.url,
        httpVerb: req.method,
        params: req.params,
        headers: req.headers
    });
    // req.log.info('Request received');
    next();
});

app.use('/', root);
// app.use('/info', info);

// This needs to come before the routes to auto parse the body input into JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', api.getApiRoutes());

app.use((req, res, next) => {
    const err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 404;
    err.url = req.url;
    next(err);
});

app.use((err, req, res) => {
    log.error(err.stack);
    let errorMessage = 'Internal application error';
    const okForClient = (err.status && err.message);// explicit errors thrown by us
    if (IS_DEV || okForClient) {
        errorMessage = err.message;
        res.statusMessage = err.message;
    }
    res.status(err.status || 500).json({error: errorMessage});
});

export default app;
