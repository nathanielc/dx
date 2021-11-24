import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Text, TextInput, Button, List } from 'react-native-paper';
import withObservables from '@nozbe/with-observables'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'

interface _ClassItemProp {
    navigation: any,
    clss: any,
}
const _ClassItem = ({ navigation, clss }: _ClassItemProp) => {
    return (
        <List.Item
            title={clss.name}
            description={clss.school}
            onPress={() => {
                navigation.navigate('View', {
                    model: 'Classes',
                    id: clss.id,
                    name: clss.name,
                });
            }}
        />
    );
};
const ClassItem = withObservables(['clss'], ({ clss }) => ({
    clss: clss.observe(),
}))(_ClassItem);

interface _ClassesProp {
    navigation: any,
    database: any,
    classes: any,
};

const _ClassList = ({ navigation, database, classes }: _ClassesProp) => {
    console.log(classes);
    const onCreate = async () => {
        await database.action(async () => {
            await database.get('classes').create((clss) => {
                clss.name = 'My Class'
            })
        })
    }
    return (
        <>
            <View>
                {classes.map((clss) =>
                    <ClassItem key={clss.id} navigation={navigation} clss={clss} />
                )}
            </View>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={onCreate}
            />
        </>
    );
};

const ClassesList = withDatabase(withObservables([], ({ database }) => ({
    classes: database.collections.get('classes').query().observe(),
}))(_ClassList));


const ClassView = () => {
    return (
        <Text> Class View</Text>
    );
};

const ClassEdit = () => {
    return (
        <Text> Class Edit</Text>
    );
};

export const Classes = {
    List: ClassesList,
    View: ClassView,
    Edit: ClassEdit,
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
