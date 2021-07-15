import React from 'react';

// Create an EventsContext to allow edit forms to publish change events.
const EventsContext = React.createContext({"events": "default"});
export class EventsProvider extends React.Component {
    render() {
        return (
            <EventsContext.Provider value={this.props.events}>
                {this.props.children}
            </EventsContext.Provider>
        );
    }
}
// withEventsContext is a helper to wrap a component with the events context
export const withEventsContext = (Component) => {
    class ComponentWithEvents extends React.Component {
        static displayName = `${Component.displayName || Component.name}`;
        render() {
            return (
                <EventsContext.Consumer>
                    { (events) => <Component {...this.props}  events={events} ref={this.props.onRef} /> }
                </EventsContext.Consumer>
            );
        }
    }
    return ComponentWithEvents;
}

// Events provides an interface for publishing and subscribing to
// change events for models.
export class Events {
    readonly ws: any;
    readonly db: any;
    constructor(database: any) {
        this.ws = new WebSocket('ws://10.0.2.2:8888/')
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({msg:"connecting from react"}));
        };
        this.ws.onmessage = (e) => {
        };
        this.db = database;
    }
    publishEvent(event: any) {
        console.log('publishEvent', event);
        this.ws.send(JSON.stringify(event))
    }
}
