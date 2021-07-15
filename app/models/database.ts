import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import migrations from './migrations';

import Spell from './spell'
import Class from './class'

const adapter = new SQLiteAdapter({
  schema,
  migrations,
});

const database = new Database({
  adapter,
  modelClasses: [Spell, Class],
  actionsEnabled: true,
});

export default database;
