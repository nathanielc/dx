import { Database, Model, appSchema } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import Spell, { SpellSchema } from './spell'
import Class, { ClassSchema } from './class'
import Event, { EventSchema, EventType } from './event'

import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export interface IModel extends Model {
    reduce(event: EventType): void
}

const migrations = schemaMigrations({
    migrations: [
        // TODO(nathanielc): Create API for each model to define its own migrations and append them here.
        //     {
        //    // ⚠️ Set this to a number one larger than the current schema version
        //    toVersion: 2,
        //    steps: [
        //      // See "Migrations API" for more details
        //      createTable({
        //        name: 'comments',
        //        columns: [
        //          { name: 'post_id', type: 'string', isIndexed: true },
        //          { name: 'body', type: 'string' },
        //        ],
        //      }),
        //    ],
        //  },
    ],
});

const schema = appSchema({
    version: 1,
    tables: [
        SpellSchema,
        ClassSchema,
        EventSchema,
    ],
});
const adapter = new SQLiteAdapter({
    schema,
    migrations,
});

const database = new Database({
    adapter,
    modelClasses: [Spell, Class, Event],
    actionsEnabled: true,
});

export default database;
