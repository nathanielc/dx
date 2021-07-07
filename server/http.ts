import express = require('express');
import bodyParser from 'body-parser';

import { Request, Response, RequestHandler as Middleware } from 'express';

export type User = { username: string; password: string };

type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

type Handler = (req: Request, res: Response) => any;

export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
};

const app: express.Application = express();
const PORT: 4000;
app.use(bodyParser.urlencoded({extended: false});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/api/changes', (req, res) => {
    const changes = req.body;

});
export const runHTTP = async () => {
    app.listen(PORT, () => {
        console.log('App is listening...');
    });
}
