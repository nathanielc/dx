import React from 'react';
import nodejs from 'nodejs-mobile-react-native';

import Event, { EventType } from '../models/event';
import { IModel } from '../models/database';


// Create an EventsContext to allow edit forms to publish change events.
const EventsContext = React.createContext({ "events": "default" });
export const EventsProvider = ({ events, children }) => {
    return (
        <EventsContext.Provider value={events}>
            {children}
        </EventsContext.Provider>
    );
};
// withEventsContext is a helper to wrap a component with the events context
export const withEventsContext = (Component) => {
    class ComponentWithEvents extends React.Component {
        static displayName = `${Component.displayName || Component.name}`;
        render() {
            return (
                <EventsContext.Consumer>
                    {(events) => <Component {...this.props} events={events} ref={this.props.onRef} />}
                </EventsContext.Consumer>
            );
        }
    }
    return ComponentWithEvents;
}


// Events handles receiving events from peers and the current user.
//
// Events from peers are applied to the database.
//
// Events from the current user are applied to the database and broadcast to peers.
export class Events {
    readonly db: any;
    constructor(database: any) {
        this.db = database;
    }
    start() {
        nodejs.start("main.js", { redirectOutputToLogcat: true });
        nodejs.channel.addListener(
            "message",
            async (msg) => {
                console.log("recv msg", msg);
                const rawEvent: EventType = JSON.parse(msg);
                await this.db.action(async () => {
                    await this.db.get('events').create((event: Event) => {
                        event.reduce(rawEvent);
                        console.log(event);
                    })
                });
                this.updateDB(rawEvent);
            },
        );
    }
    async updateDB(event: EventType) {
        await this.db.action(async () => {
            switch (event.method) {
                case "create": {
                    await this.db.get(event.modelType).create((model: IModel) => {
                        model.reduce(event);
                    });
                    break;
                }
                case "update": {
                    const model: IModel = await this.db.get(event.modelType).find(event.modelID);
                    model.update(() => {
                        model.reduce(event);
                    });
                    break;
                }
                case "delete": {
                    const model: IModel = await this.db.get(event.modelType).find(event.modelID);
                    model.destroyPermanently();
                    break;
                }
            }
        });
    }
    publishEvent(msg) {
        //TODO(nathanielc): Have edit forms call this method to publish events to peers
        nodejs.channel.send(msg);
    }
}
