import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'spells',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'school', type: 'string'},
        {name: 'created_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'classes',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'created_at', type: 'number'},
      ],
    }),
  ],
});
