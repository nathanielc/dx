import { Model, tableSchema } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

import { EventType } from './event';

export type ClassType = {
    name: string,
}
export default class Class extends Model {
    static table = 'classes';

    fromJSON(data: ClassType) {
        this.name = data.name;
    }
    toJSON(): ClassType {
        return {
            name: this.name,
        };
    }
    reduce(event: EventType) {
        if ('name' in event.data) {
            this.name = event.data.name;
        }
    }

    @field('name') name;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}
export const ClassSchema = tableSchema({
    name: Class.table,
    columns: [
        { name: 'name', type: 'string' },

        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ],
});
