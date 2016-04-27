var express = require( "express" );
var serveStatic = require( "serve-static" );
var appRouter = require( "./server/api" );

const app = express();
const PORT = 8001;

app.use(serveStatic(__dirname + "/dist"));
appRouter(app);

app.listen(PORT);

console.log( "Started API Server on port: " + PORT );