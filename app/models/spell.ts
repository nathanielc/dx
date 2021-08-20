import {Model, tableSchema} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export const table = tableSchema({
  name: 'spells',
  columns: [
    {name: 'name', type: 'string'},
    {name: 'school', type: 'string'},
    {name: 'created_at', type: 'number'},
  ],
});
export default class Spell extends Model {
  static table = 'spells';

  @field('name') name;
  @field('school') school;
  @readonly @date('created_at') createdAt;
}
