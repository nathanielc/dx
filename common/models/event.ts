export enum Model {
    Spell = 1,
    Clss  = 2,
};

export type ID = string;

export type EventID = {
    replica: string,
    counter: number,
};

export const EventIDFromString = (id: string): EventID => {
    let parts = id.split('_')
    return {
        replica: parts[0],
        counter: parseInt(parts[1], 16),
    }
}

export const EventIDToString = (id: EventID): string => {
    return id.replica + '_' + id.counter.toString(16)
}

export type Event = {
    localEventID: EventID,
    originEventID: EventID,
    modelType: Model,
    modelID: ID,
    data: any,
};
