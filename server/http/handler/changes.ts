import { Handler } from '../types';
import { Create } from '../../models/changes';

export const changes: Handler = (req, res) => {
  res.status(200).send('Success');
  const changes : Create = req.body;
  console.log(changes);
};
