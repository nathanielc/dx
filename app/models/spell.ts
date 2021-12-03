import { Model, tableSchema } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

import { EventType } from './event';

export type SpellType = {
    name: string,
    school: string,
}
export default class Spell extends Model {
    static table = 'spells';
    fromJSON(data: SpellType) {
        this.name = data.name;
        this.school = data.school;
    }
    toJSON(): SpellType {
        return {
            name: this.name,
            school: this.school,
        };
    }
    reduce(event: EventType) {
        if ('name' in event.data) {
            this.name = event.data.name;
        }
        if ('school' in event.data) {
            this.school = event.data.school;
        }
    }

    @field('name') name;
    @field('school') school;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}

export const SpellSchema = tableSchema({
    name: Spell.table,
    columns: [
        { name: 'name', type: 'string' },
        { name: 'school', type: 'string' },

        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ],
});
