import React from 'react';
import { List } from 'react-native-paper';
import withObservables from '@nozbe/with-observables'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import { createStack } from './stack';

const EventItem = ({ event }) => {
    const title = event.modelType + ' ' + event.modelID;
    const description = event.localEventID + ' ' + event.globalEventID;
    return (
        <List.Item
            title={title}
            description={description}
        />
    );
};
const _EventList = ({ navigation, events }) => {
    return (
        <>
            {events.map((event) =>
                <EventItem key={event.id} event={event} />
            )}
        </>
    );

};
const EventList = withDatabase(withObservables([], ({ database }) => ({
    events: database.collections.get('events').query().observe(),
}))(_EventList));

const Stack = createStack();
export const History = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Events"
        >
            <Stack.Screen name='Events' options={{ headerTitle: 'Edit History' }} component={EventList} />
        </Stack.Navigator>
    );
};
