import {Event, ID} from './event';

export type Spell = {
    id: ID,
    name: string,
    school: string,
}
const defaultSpell : Spell = {id:'', name:'', school: ''}

// FromEvents creates a new spell by reducing the events.
// The list of events must contain at least one event and all events 
// must be for the same model ID.
export const fromEvents = (events: Event[]) => {
    let spell : Spell = defaultSpell;
    return events.reduce(reduce, spell);
}

const reduce = (spell: Spell, event: Event) => {
    if (spell.id == "") {
        spell.id = event.modelID;
    }
    if (spell.id != event.modelID) {
        throw "inconsistent modelIDs in event list";
    }
    if ('name' in event.data) {
        spell.name = event.data.name;
    }
    if ('school' in event.data) {
        spell.school = event.data.school;
    }
    return spell;
}

