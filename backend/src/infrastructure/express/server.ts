import express from 'express';
import { setUpApp } from './setup/setup-app';
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares';
import { setupRoutes } from './setup/setup-routes';
import { setUpAsyncErrors } from './setup/setup-async-error';
export const app = express();
setUpApp(app);
setupGlobalMiddlewares(app);
setupRoutes(app);
setUpAsyncErrors(app);

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server listening => http://127.0.0.1:${port}`);
    });
}
