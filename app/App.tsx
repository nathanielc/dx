// For unexplained reasons the docs say this import must always be first.
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme } from 'react-native-appearance';

import database from './models/database';
import { PreferencesContext } from './context/preferences';

import { Home } from './components/home';
import { Compendium } from './components/compendium';
import { History } from './components/history';
import { Settings } from './components/settings';
import { Events, EventsProvider } from './context/events';
import { LightTheme, DarkTheme } from './components/theme';


const Drawer = createDrawerNavigator();

const events = new Events(database);

const App = () => {
    useEffect(() => events.start(), []);
    // Get system light/dark theme mode
    const colorScheme = useColorScheme();
    const [theme, setTheme] = React.useState<'light' | 'dark'>(colorScheme === 'dark' ? 'dark' : 'light');
    const toggleTheme = () => setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            theme,
        }),
        [toggleTheme, theme]
    );


    const themeConfig = theme === 'light' ? LightTheme : DarkTheme;


    return (
        <PreferencesContext.Provider value={preferences}>
            <PaperProvider theme={themeConfig}>
                <DatabaseProvider database={database}>
                    <EventsProvider events={events}>
                        <NavigationContainer theme={themeConfig}>
                            <Drawer.Navigator>
                                <Drawer.Screen name="Home" component={Home} />
                                <Drawer.Screen name="Compendium" component={Compendium} />
                                <Drawer.Screen name="History" component={History} />
                                <Drawer.Screen name="Settings" component={Settings} />
                            </Drawer.Navigator>
                        </NavigationContainer>
                    </EventsProvider>
                </DatabaseProvider>
            </PaperProvider>
        </PreferencesContext.Provider>
    );
};

export default App;
