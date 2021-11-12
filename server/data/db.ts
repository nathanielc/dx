import {EventID, Event, EventIDToString} from 'common/models/event';
import {Clock} from './clock';

let levelup = require('levelup');
let leveldown = require('leveldown');

export class DB {
    private db: any;
    private replica: string;
    private clock: Clock;

    constructor(replica: string, path: string) {
        this.replica = replica;
        this.db = levelup(leveldown(path));
        this.clock = new Clock({
            replica: this.replica,
            counter: 0,
        });
    }
    public async init(): Promise<void> {
        const lastID = await this.getLastEventID();
        this.clock = new Clock(lastID);
    }
    public async addEvents(events: Event[]): Promise<void> {
        for (let event of events) {
            event.localEventID = this.clock.next();
            event.originEventID = event.localEventID;
            await this.db.put(EventIDToString(event.localEventID), JSON.stringify(event), (err: any) => {
              if (err) return console.log('error writing to db:', err);
            });
        }
    }
    public async getEventsSince(eventID: EventID): Promise<Event[]> {
        let data :Event[] = [];
        const readable = this.db.createValueStream({gt: EventIDToString(eventID)});
        for await( const value of readable) {
            data.push(JSON.parse(value));
        }
        return data;
    }
    public async getAllEvents(): Promise<Event[]> {
        let data :Event[] = [];
        const readable = this.db.createValueStream()
        for await( const value of readable) {
            data.push(JSON.parse(value));
        }
        return data;
    }
    private async getLastEventID(): Promise<EventID> {
        const readable = this.db.createValueStream({reverse: true})
        for await( const value of readable) {
            let event = JSON.parse(value);
            return event.localEventID;
        }
        return {
            replica: this.replica,
            counter: 0,
        }
    }
}
