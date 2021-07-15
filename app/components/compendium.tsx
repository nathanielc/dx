import React, {FC} from 'react';
import {Button, View, FlatList, Text} from 'react-native';
import Spells from './spells';
import Classes from './classes';
import {compendiumStyles} from './styles';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Divider, List } from 'react-native-paper';

const Stack = createStackNavigator();

const indexList = ['Spells', 'Classes'];

const Index = ({navigation}) => {
    return (
        <View>
                {indexList.map((item) => <>
                    <List.Item
                        key={item}
                        title={item}
                        onPress={() => navigation.navigate(item)}
                    />
                    </>
                )}
        </View>
    );
};

const Compendium: FC<{onOpenCreator: () => void}> = ({onOpenCreator, navigation}) => {
  return (
    <Stack.Navigator>
            <Stack.Screen name='Compendium' component={Index} />
            <Stack.Screen name='Spells' component={Spells} />
            <Stack.Screen name='Classes' component={Classes} />
    </Stack.Navigator>
  );
};

export default Compendium;
