// For unexplained reasons the docs say this import must always be first.
import 'react-native-gesture-handler';

import React, {createContext, useState, useRef} from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import {Button, SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import database from './models/database';
import Compendium from './components/compendium';
import {Events, EventsProvider} from './components/events';


function HomeScreen({ navigation }) {
  return (
    <>
    {/*<Bar/>*/}
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to dx</Text>
    </View>
    </>
  );
}

const Bar = ({navigation}) => {
    return (
        <Appbar>
            <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()}/>
        </Appbar>
    );
};

const events = new Events(database);

const App = () => {
    return (
        <PaperProvider>
        <DatabaseProvider database={database}>
        <EventsProvider events={events}>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Compendium" component={Compendium} />
                </Drawer.Navigator>
            </NavigationContainer>
        </EventsProvider>
        </DatabaseProvider>
        </PaperProvider>
    );
};

export default App;
