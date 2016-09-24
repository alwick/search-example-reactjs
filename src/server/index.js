import config from 'config';
import http from 'http';
import app from './app';

let httpListenerPort = 80;

// Override default ports when running on windows or mac
if (process.platform === 'darwin' || process.platform === 'win32') {
    httpListenerPort = 8080;

    console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
    console.log('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));
}

var httpServer = http.createServer(app).listen(httpListenerPort, function () {
    console.log('app is listening at localhost:' + httpListenerPort);
});

process.on('SIGTERM', () => {
    httpServer.close(function () {
        console.log('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
});