import searchService from './searchService';

const appRouter = function(app) {
    app.get("/api/search", searchService.handleRequest(req, res));
};

module.exports = appRouter;