import {Event, Model} from './event';
import {fromEvents} from './spell';

test('spell reduce single event', () => {
    const events : Event[] = [
        {
            localEventID: 'local',
            originEventID: 'origin',
            modelType: Model.Spell,
            modelID: 'asdf',
            data: {
                name: 'fire',
                school: 'hogwarts',
            },
        }
    ];
    let spell = fromEvents(events)
    expect(spell).toEqual({
        id: 'asdf',
        name: 'fire',
        school: 'hogwarts',
    })
});
test('spell reduce multiple events', () => {
    const events : Event[] = [
        {
            localEventID: 'local',
            originEventID: 'origin',
            modelType: Model.Spell,
            modelID: 'asdf',
            data: {
                name: 'fire',
                school: 'hogwarts',
            },
        },
        {
            localEventID: 'local',
            originEventID: 'origin',
            modelType: Model.Spell,
            modelID: 'asdf',
            data: {
                school: 'ponderosa',
            },
        }
    ];
    let spell = fromEvents(events)
    expect(spell).toEqual({
        id: 'asdf',
        name: 'fire',
        school: 'ponderosa',
    })
});
