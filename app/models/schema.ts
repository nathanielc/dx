import {appSchema, tableSchema} from '@nozbe/watermelondb';
import {table as spells} from './spell';
import {table as classes} from './class';

export default appSchema({
  version: 1,
  tables: [
      spells,
      classes,
  ],
});
