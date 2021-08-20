import {EventID} from 'common/models/event';

export class Clock {
    current: EventID;

    constructor(id: EventID) {
        this.current = id;
    }

    // Next produces the next EventID from the clock.
    next() : EventID {
        this.current.counter += 1;
        return this.current;
    }
    // Check inspects the provided EventID, if the EventID is greater than the current EventID
    // for the clock, the clock is updated.
    check(id: EventID) {
        if (id.counter > this.current.counter) {
            this.current.counter = id.counter + 1;
        }
    }
}

