import { RequestHandler } from 'express'
import { Route, Handler } from './types';
import { ChangeSet } from '../models/changes';
import * as db from '../data/db';

const logger: RequestHandler = (req, res, next) => {
  console.log(req.path);
  next();
};
const addChanges: Handler = async (req, res) => {
    //TODO validate body json
    const changes : ChangeSet = req.body;
    await db.addChanges(changes);
    res.status(202).send();
};
const getChanges: Handler = async (req, res) => {
  res.status(200).send(await db.getChanges(0));
};

export const routes: Route[] = [
  {
    method: 'get',
    path: '/changes',
    middleware: [logger],
    handler: getChanges,
  },
  {
    method: 'post',
    path: '/changes',
    middleware: [logger],
    handler: addChanges,
  },
];
