import { changes } from './handler/changes';
import { logger } from './middleware/logger';
import { Route } from './types';

export const routes: Route[] = [
  {
    method: 'post',
    path: '/changes',
    middleware: [logger],
    handler: changes,
  },
];
