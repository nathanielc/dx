import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List, FAB } from 'react-native-paper';

import { Spells } from './spells';
import { Classes } from './classes';
import { createStack } from './stack';

const Stack = createStack();


const models: Array<{ name: string, meta: ModelScreens }> = [
    { name: 'Spells', meta: Spells },
    { name: 'Classes', meta: Classes },
];


const Index = ({ navigation }) => {
    return (
        <View>
            {models.map((item) =>
                <List.Item
                    key={item.name}
                    title={item.name}
                    onPress={() => navigation.navigate('List', {
                        model: item.name,
                    })}
                />
            )}
        </View>
    );
};

interface ModelScreens {
    List: any,
    View: any,
    Edit: any,
}

export const Compendium = () => {
    return (
        <Stack.Navigator
            initialRouteName="Index"
        >
            <Stack.Group>
                <Stack.Screen name='CompendiumIndex' options={{ title: 'Compendium' }} component={Index} />
                <Stack.Screen name='List' component={ListScreen} />
                <Stack.Screen name='View' component={ViewScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='Edit' component={EditScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const ListScreen = ({ navigation, route }) => {
    const { model } = route.params;
    const meta = models.find((item) => item.name == model).meta;
    const List = meta.List;
    React.useLayoutEffect(
        () => navigation.setOptions({ title: model }),
        [navigation, model],
    );
    return (
        <List navigation={navigation} />
    );

};
const ViewScreen = ({ navigation, route }) => {
    const { model, id, name } = route.params;
    const meta = models.find((item) => item.name == model).meta;
    const View = meta.View;
    React.useLayoutEffect(
        () => navigation.setOptions({ title: name }),
        [navigation, name],
    );
    return (
        <View navigation={navigation} id={id} />
    );
};
const EditScreen = ({ navigation, route }) => {
    const { model, id, name } = route.params;
    const meta = models.find((item) => item.name == model).meta;
    const Edit = meta.Edit;
    React.useLayoutEffect(
        () => navigation.setOptions({ title: name }),
        [navigation, name],
    );
    return (
        <Edit navigation={navigation} id={id} />
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
