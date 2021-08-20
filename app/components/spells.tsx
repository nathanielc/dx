import React from 'react';
import { StyleSheet, View } from 'react-native';
import withObservables from '@nozbe/with-observables'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
import { Text, TextInput, Button, FAB } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import { withEventsContext} from "./events";
import { EditModal } from "./edit";
import {Model} from 'common/models/event';
import {Spell as CSpell} from 'common/models/spell';


const Spell = withEventsContext(({database, events, spell}) => {
  return (
      <View key={spell.id}>
        <Text>Name: {spell.name}</Text>
        <Text>School: {spell.school}</Text>
        <EditModal form={<SpellForm database={database} events={events} spell={spell}/>}/>
      </View>
  );
});


const SpellForm = ({database, events, spell}) => {
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
        const spellModel : CSpell = {
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


const EnhancedSpell = withObservables(['spell'], ({spell}) => ({
    spell: spell.observe(),
}))(Spell);

const Spells = ({database, spells}) => {
  return (
      <View>
        <Text>List of Spells</Text>
        {spells.map((spell) =>
            <EnhancedSpell key={spell.id} database={database} spell={spell}/>
        )}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={async () => {
            await database.action(async () => {
              console.log('here')
              const newSpell = await database.get('spells').create((spell) => {
                spell.name = 'New Spell'
                spell.school = 'Lorem ipsum...'
              })
            })
          }}
        />
      </View>
  );
};

export default withDatabase(withObservables([], ({database}) => ({
    spells: database.collections.get('spells').query().observe(),
}))(Spells));


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
  },
})

