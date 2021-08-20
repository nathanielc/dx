import {Model, tableSchema} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export const table = tableSchema({
  name: 'classes',
  columns: [
    {name: 'name', type: 'string'},
    {name: 'created_at', type: 'number'},
  ],
});
export default class Class extends Model {
  static table = 'classes';

  @field('name') name;
  @readonly @date('created_at') createdAt;
}
