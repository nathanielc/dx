import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Class extends Model {
  static table = 'classes';

  @field('name') name;
  @readonly @date('created_at') createdAt;
}
