import { Model, tableSchema } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';
import { EventType } from './event';

export type SpellType = {
    name: string,
    school: string,
    level: number,
    is_ritual: boolean,
    casting_time: string,
    range: string,
    is_verbal: boolean,
    is_somatic: boolean,
    is_material: boolean,
    duration: string,
    description: string,
}
export default class Spell extends Model {
    static table = 'spells';
    fromJSON(data: SpellType) {
        this.name = data.name;
        this.school = data.school;
        this.level = data.level;
        this.is_ritual = data.is_ritual;
        this.casting_time = data.casting_time;
        this.range = data.range;
        this.is_verbal = data.is_verbal;
        this.is_somatic = data.is_somatic;
        this.is_material = data.is_material;
        this.duration = data.duration;
        this.description = data.description;
    }
    toJSON(): SpellType {
        return {
            name: this.name,
            school: this.school,
            level: this.level,
            is_ritual: this.is_ritual,
            casting_time: this.casting_time,
            range: this.range,
            is_verbal: this.is_verbal,
            is_somatic: this.is_somatic,
            is_material: this.is_material,
            duration: this.duration,
            description: this.description,
        };
    }
    reduce(event: EventType) {
        if ('name' in event.data) {
            this.name = event.data.name;
        }
        if ('school' in event.data) {
            this.school = event.data.school;
        }
        if ('level' in event.data) {
            this.level = event.data.level;
        }
        if ('is_ritual' in event.data) {
            this.is_ritual = event.data.is_ritual;
        }
        if ('is_ritual' in event.data) {
            this.is_ritual = event.data.is_ritual;
        }
        if ('casting_time' in event.data) {
            this.casting_time = event.data.casting_time;
        }
        if ('range' in event.data) {
            this.range = event.data.range;
        }
        if ('is_verbal' in event.data) {
            this.is_verbal = event.data.is_verbal;
        }
        if ('is_somatic' in event.data) {
            this.is_somatic = event.data.is_somatic;
        }
        if ('is_material' in event.data) {
            this.is_material = event.data.is_material;
        }
        if ('duration' in event.data) {
            this.duration = event.data.duration;
        }
        if ('description' in event.data) {
            this.description = event.data.description;
        }
    }

    @field('name') name;
    @field('school') school;
    @field('name') name;
    @field('school') school;
    @field('level') level;
    @field('is_ritual') is_ritual;
    @field('casting_time') casting_time;
    @field('range') range;
    @field('is_verbal') is_verbal;
    @field('is_somatic') is_somatic;
    @field('is_material') is_material;
    @field('duration') duration;
    @field('description') description;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}

export const SpellSchema = tableSchema({
    name: Spell.table,
    columns: [
        { name: 'name', type: 'string' },
        { name: 'school', type: 'string' },
        { name: 'level', type: 'number' },
        { name: 'is_ritual', type: 'boolean' },
        { name: 'casting_time', type: 'string' },
        { name: 'range', type: 'string' },
        { name: 'is_verbal', type: 'boolean' },
        { name: 'is_somatic', type: 'boolean' },
        { name: 'is_material', type: 'boolean' },
        { name: 'duration', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ],
});
