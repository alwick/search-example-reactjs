import {Router} from 'express';
import searchService from './searchService';

const router = Router(); // eslint-disable-line

const apiRouter = {
    getApiRoutes: () => {
        router.get("/search", searchService.handleRequest);

        return router;
    }
};

module.exports = apiRouter;