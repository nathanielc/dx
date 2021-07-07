import express = require('express');
import {routes} from './routes';

const app: express.Application = express();
const PORT = 4000;

app.use(express.json());

routes.forEach((route) => {
    const { method, path, middleware, handler } = route;
    app[method](path, ...middleware, handler);
});
export const runHTTP = async () => {
    app.listen(PORT, () => {
        console.log('API server started...');
    });
}
