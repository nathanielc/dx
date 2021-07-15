import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Spell extends Model {
  static table = 'spells';

  @field('name') name;
  @field('school') school;
  @readonly @date('created_at') createdAt;
}
