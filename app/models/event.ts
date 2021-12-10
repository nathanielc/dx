import { Model, tableSchema } from '@nozbe/watermelondb';
import { field, nochange, readonly, date, json } from '@nozbe/watermelondb/decorators';

export type EventType = {
    localEventID: string,
    originEventID: string,
    method: string,
    modelType: string,
    modelID: string,
    data: any,
}
export default class Event extends Model {
    static table = 'events';

    fromJSON(data: EventType) {
        this.localEventID = data.localEventID;
        this.originEventID = data.originEventID;
        this.method = data.method;
        this.modelType = data.modelType;
        this.modelID = data.modelID;
        this.data = data.data;
    }
    toJSON(): EventType {
        return {
            localEventID: this.localEventID,
            originEventID: this.originEventID,
            method: this.method,
            modelType: this.modelType,
            modelID: this.modelID,
            data: this.data,
        };
    }
    reduce(event: EventType) {
        this.localEventID = event.localEventID;
        this.originEventID = event.originEventID;
        this.method = event.method;
        this.modelType = event.modelType;
        this.modelID = event.modelID;
        this.data = event.data;
    }

    @nochange @field('local_event_id') localEventID;
    @nochange @field('origin_event_id') originEventID;
    @nochange @field('method') method;
    @nochange @field('model_type') modelType;
    @nochange @field('model_id') modelID;
    @nochange @json('data', (data) => data) data;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}

export const EventSchema = tableSchema({
    name: Event.table,
    columns: [
        { name: 'local_event_id', type: 'string' },
        { name: 'origin_event_id', type: 'string' },
        { name: 'method', type: 'string' },
        { name: 'model_type', type: 'string' },
        { name: 'model_id', type: 'string', isIndexed: true },
        { name: 'data', type: 'string' },

        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ],
});
