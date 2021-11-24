import React from 'react';
import { StyleSheet, View } from 'react-native';
import withObservables from '@nozbe/with-observables'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import { FAB, Text, TextInput, Button, List } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import { withEventsContext } from "./events";
import { EditModal } from "./edit";
import { Model } from 'common/models/event';
import { Spell as CSpell } from 'common/models/spell';
import { ModelListPage } from './compendium';
import { createStack } from './stack';


const _SpellItem = ({ navigation, spell }) => {
    return (
        <List.Item
            title={spell.name}
            description={spell.school}
            onPress={() => {
                navigation.navigate('View', {
                    model: 'Spells',
                    id: spell.id,
                    name: spell.name,
                });
            }}
        />
    );
};
const SpellItem = withObservables(['spell'], ({ spell }) => ({
    spell: spell.observe(),
}))(_SpellItem);

const _SpellView = ({ navigation, spell }) => {
    return (
        <View>
            <Text>Name: {spell.name}</Text>
            <Text>School: {spell.school}</Text>
            <FAB
                style={styles.fab}
                small
                icon="pencil"
                onPress={() => navigation.navigate('Edit', {
                    model: 'Spells',
                    id: spell.id,
                    name: spell.name,
                })}
            />
        </View>
    );
};
const SpellView = withDatabase(withObservables(['id'], ({ id, database }) => ({
    spell: database.get('spells').findAndObserve(id)
}))(_SpellView));


const _SpellEdit = withEventsContext(({ spell }) => {
    return (
        <View>
            <Text>Edit XXX Name: {spell.name}</Text>
            <Text>Edit School: {spell.school}</Text>
        </View>
    );
});
const SpellEdit = withDatabase(withObservables(['id'], ({ id, database }) => ({
    spell: database.get('spells').findAndObserve(id)
}))(_SpellEdit));




const SpellForm = ({ database, events, spell }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        data.id = spell.id;
        //TODO make events perform database updates and leave the forms unaware of the database
        await database.action(async () => {
            await spell.update((spell) => {
                spell.name = data.name;
                spell.school = data.school;
            });
        });
        const spellModel: CSpell = {
            id: data.id,
            name: data.name,
            school: data.school,
        };
        console.log("publishing event", spellModel)
        events.publishEvent(spellModel.id, Model.Spell, spellModel);
    };



    return (
        <View>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text>Name:</Text>
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="name"
                defaultValue={spell.name}
            />
            {errors.name && <Text>A spell name is required.</Text>}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text>School:</Text>
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="school"
                defaultValue={spell.school}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)}>Save</Button>
        </View>
    );
};


const Stack = createStack();

const _SpellList = ({ navigation, database, spells }) => {
    const onCreate = async () => {
        await database.action(async () => {
            await database.get('spells').create((spell) => {
                spell.name = 'New Spell'
                spell.school = 'Lorem ipsum...'
            })
        })
    }
    return (
        <>
            {spells.map((spell) =>
                <SpellItem key={spell.id} navigation={navigation} spell={spell} />
            )}
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={onCreate}
            />
        </>
    );

};
const SpellList = withDatabase(withObservables([], ({ database }) => ({
    spells: database.collections.get('spells').query().observe(),
}))(_SpellList));


export const Spells = {
    List: SpellList,
    View: SpellView,
    Edit: SpellEdit,
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
